'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, Mic, MicOff, PhoneOff, Sparkles, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

type VoiceState = 'idle' | 'connecting' | 'listening' | 'speaking' | 'error';
type SessionConfig = { accessToken: string; agentId: string; version: string; websocketBaseUrl: string };
type PendingNavigation = { path: string; label: string };
type NavigationNotice = { label: string; phase: 'opening' | 'opened' } | null;
type UnknownRecord = Record<string, unknown>;
type CartesiaMessage = UnknownRecord & {
  event?: string;
  type?: string;
  stream_id?: string;
  media?: { payload?: string };
  message?: string;
  tool_name?: string;
  name?: string;
  tool_args?: UnknownRecord;
  metadata?: UnknownRecord;
  arguments?: unknown;
  args?: unknown;
  data?: unknown;
  function?: unknown;
};

const SAMPLE_RATE = 44100;
const ALLOWED_PREFIXES = ['/blog/', '/careers/', '/industries/', '/learn/', '/paths/', '/skills/', '/topics/'];
const ALLOWED_ROUTES = new Set([
  '/', '/about', '/blog', '/careers', '/community', '/dashboard', '/free-career-guide',
  '/industries', '/learn', '/paths', '/privacy', '/skills', '/topics',
]);
const NAVIGATION_EVENT_TYPES = new Set([
  'custom', 'agent_send_custom', 'agent_tool_called', 'tool_call', 'client_tool_call',
  'client_function_call', 'function_call',
]);

function bytesToBase64(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}

function floatToPcm16(input: Float32Array) {
  const pcm = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const sample = Math.max(-1, Math.min(1, input[i]));
    pcm[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
  }
  return new Uint8Array(pcm.buffer);
}

function base64ToInt16(base64: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Int16Array(bytes.buffer);
}

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as UnknownRecord : {};
}

function parseRecord(value: unknown): UnknownRecord {
  if (typeof value === 'string') {
    try { return asRecord(JSON.parse(value)); } catch { return {}; }
  }
  return asRecord(value);
}

function firstString(...values: unknown[]) {
  for (const value of values) if (typeof value === 'string' && value.trim()) return value.trim();
  return undefined;
}

function firstBoolean(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      const normalized = value.toLowerCase().trim();
      if (['true', 'yes', 'confirmed', 'approved'].includes(normalized)) return true;
      if (['false', 'no', 'denied', 'declined'].includes(normalized)) return false;
    }
  }
  return undefined;
}

function normalizeInternalPath(value: unknown) {
  if (typeof value !== 'string') return null;
  let path = value.trim();
  if (!path) return null;

  try {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      const url = new URL(path);
      if (!['modernskilllab.space', 'www.modernskilllab.space'].includes(url.hostname)) return null;
      path = `${url.pathname}${url.search}${url.hash}`;
    }
  } catch { return null; }

  if (!path.startsWith('/')) path = `/${path}`;
  const pathOnly = path.split(/[?#]/)[0] || '/';
  return ALLOWED_ROUTES.has(pathOnly) || ALLOWED_PREFIXES.some((prefix) => pathOnly.startsWith(prefix)) ? path : null;
}

function extractNavigation(message: CartesiaMessage) {
  const eventType = firstString(message.type, message.event);
  const metadata = asRecord(message.metadata);
  const data = parseRecord(message.data);
  const fn = asRecord(message.function);
  const nestedNavigation = asRecord(metadata.navigation ?? data.navigation);
  const toolArgs = {
    ...parseRecord(message.arguments),
    ...parseRecord(message.args),
    ...asRecord(message.tool_args),
    ...parseRecord(fn.arguments),
  };

  const toolName = firstString(
    message.tool_name,
    message.name,
    fn.name,
    metadata.tool_name,
    metadata.name,
    metadata.function_name,
    data.tool_name,
    data.name,
  );
  const action = firstString(metadata.action, data.action, toolArgs.action);

  if (eventType && !NAVIGATION_EVENT_TYPES.has(eventType) && action !== 'navigate_page') return null;
  if (toolName !== 'navigate_page' && action !== 'navigate_page') return null;

  const rawPath = firstString(
    toolArgs.path, toolArgs.url, toolArgs.destination,
    metadata.path, metadata.url, metadata.destination,
    data.path, data.url, data.destination,
    nestedNavigation.path,
  );
  const path = normalizeInternalPath(rawPath);
  if (!path) return null;

  const label = firstString(
    toolArgs.label, metadata.label, data.label, nestedNavigation.label,
  )?.slice(0, 100) || 'that page';

  const permissionGranted = firstBoolean(
    toolArgs.permission_granted, toolArgs.confirmed, toolArgs.user_confirmed,
    metadata.permission_granted, metadata.confirmed, metadata.user_confirmed,
    data.permission_granted, data.confirmed, data.user_confirmed,
    nestedNavigation.permission_granted,
  );

  return { path, label, permissionGranted };
}

export function SkillGuideOrb() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<VoiceState>('idle');
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingNavigation, setPendingNavigation] = useState<PendingNavigation | null>(null);
  const [navigationNotice, setNavigationNotice] = useState<NavigationNotice>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamIdRef = useRef('');
  const playbackCursorRef = useRef(0);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const mutedRef = useRef(false);
  const pathnameRef = useRef(pathname);
  const noticeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { mutedRef.current = muted; }, [muted]);
  useEffect(() => { pathnameRef.current = pathname; }, [pathname]);

  const clearPlayback = useCallback(() => {
    activeSourcesRef.current.forEach((source) => { try { source.stop(); } catch {} });
    activeSourcesRef.current = [];
    playbackCursorRef.current = outputContextRef.current?.currentTime || 0;
  }, []);

  const cleanup = useCallback(() => {
    clearPlayback();
    if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
    if (processorRef.current) { processorRef.current.onaudioprocess = null; processorRef.current.disconnect(); }
    sourceRef.current?.disconnect();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    socketRef.current?.close();
    inputContextRef.current?.close().catch(() => undefined);
    outputContextRef.current?.close().catch(() => undefined);
    processorRef.current = null; sourceRef.current = null; streamRef.current = null; socketRef.current = null;
    inputContextRef.current = null; outputContextRef.current = null; streamIdRef.current = '';
  }, [clearPlayback]);

  useEffect(() => cleanup, [cleanup]);

  const playPcm = useCallback((payload: string) => {
    const pcm = base64ToInt16(payload);
    if (!pcm.length) return;
    let ctx = outputContextRef.current;
    if (!ctx) {
      ctx = new AudioContext({ sampleRate: SAMPLE_RATE });
      outputContextRef.current = ctx;
      playbackCursorRef.current = ctx.currentTime;
    }
    const data = new Float32Array(pcm.length);
    for (let i = 0; i < pcm.length; i++) data[i] = pcm[i] / 32768;
    const buffer = ctx.createBuffer(1, data.length, SAMPLE_RATE);
    buffer.copyToChannel(data, 0);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    const startAt = Math.max(ctx.currentTime + 0.02, playbackCursorRef.current);
    source.start(startAt);
    playbackCursorRef.current = startAt + buffer.duration;
    activeSourcesRef.current.push(source);
    source.onended = () => {
      activeSourcesRef.current = activeSourcesRef.current.filter((item) => item !== source);
      if (!activeSourcesRef.current.length) setState((current) => current === 'speaking' ? 'listening' : current);
    };
    setState('speaking');
  }, []);

  const startMicrophone = useCallback(async (socket: WebSocket) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true },
    });
    streamRef.current = stream;
    const ctx = new AudioContext({ sampleRate: SAMPLE_RATE });
    inputContextRef.current = ctx;
    const source = ctx.createMediaStreamSource(stream);
    sourceRef.current = source;
    const processor = ctx.createScriptProcessor(4096, 1, 1);
    processorRef.current = processor;
    const silentGain = ctx.createGain();
    silentGain.gain.value = 0;
    processor.onaudioprocess = (event) => {
      if (mutedRef.current || socket.readyState !== WebSocket.OPEN || !streamIdRef.current) return;
      const payload = bytesToBase64(floatToPcm16(event.inputBuffer.getChannelData(0)));
      socket.send(JSON.stringify({ event: 'media_input', stream_id: streamIdRef.current, media: { payload } }));
    };
    source.connect(processor);
    processor.connect(silentGain);
    silentGain.connect(ctx.destination);
  }, []);

  const navigate = useCallback((target: PendingNavigation) => {
    if (target.path.split(/[?#]/)[0] === pathnameRef.current) {
      setPendingNavigation(null);
      setNavigationNotice({ label: target.label, phase: 'opened' });
      setIsOpen(true);
      if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
      noticeTimerRef.current = setTimeout(() => setNavigationNotice(null), 2200);
      return;
    }

    setPendingNavigation(null);
    setNavigationNotice({ label: target.label, phase: 'opening' });
    setIsOpen(true);
    router.prefetch(target.path);
    router.push(target.path);
    if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = setTimeout(() => {
      setNavigationNotice({ label: target.label, phase: 'opened' });
      noticeTimerRef.current = setTimeout(() => setNavigationNotice(null), 1800);
    }, 650);
  }, [router]);

  const handleAgentAction = useCallback((message: CartesiaMessage) => {
    const action = extractNavigation(message);
    if (!action) return;

    const target = { path: action.path, label: action.label };
    router.prefetch(action.path);

    // Voice-first flow: when the Cartesia client function includes permission_granted=true,
    // the user has already said yes to the agent, so navigate without asking them a second time.
    if (action.permissionGranted === true) {
      navigate(target);
      return;
    }

    // Safe fallback for webhook/tool events that do not carry explicit permission state.
    setPendingNavigation(target);
    setNavigationNotice(null);
    setIsOpen(true);
  }, [navigate, router]);

  const endConversation = useCallback(() => {
    cleanup();
    setMuted(false);
    setError(null);
    setPendingNavigation(null);
    setNavigationNotice(null);
    setState('idle');
  }, [cleanup]);

  const startConversation = useCallback(async () => {
    if (!['idle', 'error'].includes(state)) return;
    setError(null);
    setPendingNavigation(null);
    setNavigationNotice(null);
    setState('connecting');

    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error('Microphone access is not supported in this browser.');
      const response = await fetch('/api/cartesia/session', { method: 'POST' });
      const config = await response.json() as SessionConfig & { error?: string };
      if (!response.ok) throw new Error(config.error || 'Voice assistant is unavailable right now.');

      const streamId = crypto.randomUUID();
      streamIdRef.current = streamId;
      const base = config.websocketBaseUrl.replace(/\/$/, '');
      const url = new URL(`${base}/agents/stream/${encodeURIComponent(config.agentId)}`);
      url.searchParams.set('access_token', config.accessToken);
      url.searchParams.set('cartesia_version', config.version);

      const socket = new WebSocket(url.toString());
      socketRef.current = socket;
      socket.onopen = () => socket.send(JSON.stringify({
        event: 'start',
        stream_id: streamId,
        config: { input_format: 'pcm_44100' },
        metadata: { source: 'modernskilllab.space', page_path: pathname, page_title: document.title },
      }));

      socket.onmessage = async (event) => {
        let message: CartesiaMessage;
        try { message = JSON.parse(event.data); } catch { return; }
        handleAgentAction(message);

        if (message.event === 'ack') {
          if (message.stream_id) streamIdRef.current = message.stream_id;
          try { await startMicrophone(socket); setState('listening'); }
          catch { setError('Microphone permission is required to talk to the Skill Guide.'); setState('error'); cleanup(); }
        } else if (message.event === 'media_output' && message.media?.payload) playPcm(message.media.payload);
        else if (message.event === 'clear') { clearPlayback(); setState('listening'); }
        else if (message.event === 'error') { setError(message.message || 'The voice session encountered an error.'); setState('error'); }
      };
      socket.onerror = () => { setError('Could not connect to the voice assistant.'); setState('error'); };
      socket.onclose = () => setState((current) => current === 'error' ? current : 'idle');
    } catch (caught) {
      cleanup();
      setError(caught instanceof Error ? caught.message : 'Voice assistant is unavailable right now.');
      setState('error');
    }
  }, [cleanup, clearPlayback, handleAgentAction, pathname, playPcm, startMicrophone, state]);

  const statusText = state === 'connecting' ? 'Connecting…'
    : state === 'speaking' ? 'Skill Guide is speaking'
    : state === 'listening' ? (muted ? 'Microphone muted' : 'Listening…')
    : state === 'error' ? 'Connection issue'
    : 'Ready when you are';

  return <div className="fixed bottom-5 right-4 z-[70] sm:bottom-7 sm:right-7">
    {isOpen && <div className="mb-3 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-2xl shadow-indigo-950/15 backdrop-blur-xl">
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-900 px-5 py-5 text-white">
        <div className="relative flex items-start justify-between gap-3">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200"><Sparkles className="h-3.5 w-3.5"/> Modern Skill Lab</div>
            <h2 className="text-xl font-semibold">Ask the Skill Guide</h2>
            <p className="mt-1 max-w-[16rem] text-sm leading-5 text-indigo-100/80">Talk naturally. Ask about a skill, career, lesson, or what to learn next.</p>
          </div>
          <button onClick={() => { if (!['idle','error'].includes(state)) endConversation(); setIsOpen(false); }} className="rounded-full p-2 hover:bg-white/10" aria-label="Close voice assistant"><X className="h-4 w-4"/></button>
        </div>
      </div>
      <div className="px-5 py-5">
        <div className="flex items-center gap-4">
          <div className={`relative grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan-400 via-indigo-500 to-violet-600 shadow-lg ${state === 'speaking' ? 'animate-pulse' : ''}`}><Mic className="h-6 w-6 text-white"/></div>
          <div><p className="text-sm font-semibold text-slate-900">{statusText}</p><p className="mt-1 text-xs leading-5 text-slate-500">{state === 'idle' ? 'Your microphone starts only after you press Start talking.' : 'Voice is processed by Cartesia for this conversation.'}</p></div>
        </div>

        {pendingNavigation && <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
          <p className="text-sm font-semibold text-slate-900">Go to {pendingNavigation.label}?</p>
          <p className="mt-1 text-xs leading-5 text-slate-600">The Skill Guide suggested this page. Navigation only happens if you approve it.</p>
          <div className="mt-3 flex gap-2">
            <button onClick={() => setPendingNavigation(null)} className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">Stay here</button>
            <button onClick={() => navigate(pendingNavigation)} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-700 px-3 py-2 text-sm font-semibold text-white">Take me there <ArrowRight className="h-4 w-4"/></button>
          </div>
        </div>}

        {navigationNotice && <div className="mt-4 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {navigationNotice.phase === 'opening' ? <Loader2 className="h-4 w-4 animate-spin"/> : <CheckCircle2 className="h-4 w-4"/>}
          <span>{navigationNotice.phase === 'opening' ? `Opening ${navigationNotice.label}…` : `You're on ${navigationNotice.label}.`}</span>
        </div>}

        {error && <div className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}
        <div className="mt-5 flex gap-2">
          {['idle','error'].includes(state) ? <button onClick={startConversation} className="flex-1 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white">Start talking</button> : <>
            <button onClick={() => setMuted((value) => !value)} className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">{muted ? <MicOff className="h-4 w-4"/> : <Mic className="h-4 w-4"/>}{muted ? 'Unmute' : 'Mute'}</button>
            <button onClick={endConversation} className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white"><PhoneOff className="h-4 w-4"/> End</button>
          </>}
        </div>
      </div>
    </div>}

    <div className="flex justify-end">
      <button onClick={() => setIsOpen((value) => !value)} className="group relative grid h-14 w-14 place-items-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-4 sm:h-16 sm:w-16" aria-label="Talk to the Modern Skill Lab Skill Guide" aria-expanded={isOpen}>
        <span className="absolute inset-[-8px] rounded-full bg-gradient-to-r from-cyan-400/25 via-indigo-500/30 to-violet-500/25 blur-md"/>
        <span className="relative grid h-full w-full place-items-center rounded-full border border-white/50 bg-gradient-to-br from-indigo-950 via-indigo-700 to-violet-700 shadow-xl shadow-indigo-950/25">{isOpen ? <X className="h-5 w-5 text-white"/> : <Mic className="h-5 w-5 text-white"/>}</span>
        {!isOpen && <span className="pointer-events-none absolute right-[4.2rem] hidden whitespace-nowrap rounded-full border border-slate-200 bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-700 opacity-0 shadow-md transition group-hover:opacity-100 sm:block">Ask the Skill Guide</span>}
      </button>
    </div>
  </div>;
}
