import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const DEFAULT_CARTESIA_VERSION = '2026-08-14';
const DEFAULT_WEBSOCKET_BASE_URL = 'wss://agents.cartesia.ai';

export async function POST() {
  const apiKey = process.env.CARTESIA_API_KEY;
  const agentId = process.env.CARTESIA_AGENT_ID;
  const version = process.env.CARTESIA_VERSION || DEFAULT_CARTESIA_VERSION;
  const websocketBaseUrl = process.env.CARTESIA_WEBSOCKET_BASE_URL || DEFAULT_WEBSOCKET_BASE_URL;

  if (!apiKey || !agentId) {
    return NextResponse.json(
      { error: 'The voice assistant has not been configured yet.' },
      { status: 503 },
    );
  }

  try {
    const response = await fetch('https://api.cartesia.ai/access-token', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Cartesia-Version': version,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grants: { agent: true },
        expires_in: 300,
      }),
      cache: 'no-store',
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error('Cartesia access-token request failed', {
        status: response.status,
        version,
        body: data,
      });
      return NextResponse.json(
        {
          error: 'Could not start the voice assistant.',
          code: 'cartesia_token_failed',
          status: response.status,
        },
        { status: 502 },
      );
    }

    const accessToken = data.token || data.access_token;
    if (!accessToken) {
      console.error('Cartesia access-token response did not include a token', data);
      return NextResponse.json(
        { error: 'Could not start the voice assistant.', code: 'cartesia_token_missing' },
        { status: 502 },
      );
    }

    return NextResponse.json({
      accessToken,
      agentId,
      version,
      websocketBaseUrl,
    });
  } catch (error) {
    console.error('Cartesia session error', error);
    return NextResponse.json(
      { error: 'Could not start the voice assistant.', code: 'cartesia_session_error' },
      { status: 502 },
    );
  }
}
