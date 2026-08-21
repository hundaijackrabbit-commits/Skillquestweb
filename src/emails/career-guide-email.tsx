import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components';

type CareerGuideEmailProps = {
  firstName?: string;
  downloadUrl: string;
};

export function CareerGuideEmail({ firstName, downloadUrl }: CareerGuideEmailProps) {
  const greeting = firstName ? `Hi ${firstName},` : 'Hello,';

  return (
    <Html lang="en">
      <Head />
      <Preview>Here is the Career &amp; Life Map you requested.</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={brand}>Modern Skill Lab</Text>
          <Heading style={heading}>Your guide is ready</Heading>
          <Text style={paragraph}>{greeting}</Text>
          <Text style={paragraph}>
            You requested the Modern Skill Lab Career &amp; Life Map. Use the link below to open and save your copy.
          </Text>

          <Button href={downloadUrl} style={button}>
            Open the Career &amp; Life Map
          </Button>

          <Text style={paragraph}>
            A useful place to begin is Part 1: complete the current-state snapshot, then choose one small experiment for the next seven days.
          </Text>
          <Text style={paragraph}>
            You can return to the guide whenever you need to review your direction, compare career options, or plan your next skill.
          </Text>
          <Text style={signature}>Modern Skill Lab</Text>

          <Hr style={rule} />
          <Text style={footerText}>
            You received this email because this address was used to request the guide at modernskilllab.space. The separate weekly skill email is only enabled when you choose it.
          </Text>
          <Text style={footerText}>
            If the button does not open, use this link:{' '}
            <Link href={downloadUrl} style={link}>{downloadUrl}</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export function careerGuideEmailText({ firstName, downloadUrl }: CareerGuideEmailProps) {
  const greeting = firstName ? `Hi ${firstName},` : 'Hello,';

  return [
    greeting,
    '',
    'You requested the Modern Skill Lab Career & Life Map.',
    '',
    `Open and save your copy: ${downloadUrl}`,
    '',
    'A useful place to begin is Part 1: complete the current-state snapshot, then choose one small experiment for the next seven days.',
    '',
    'You can return to the guide whenever you need to review your direction, compare career options, or plan your next skill.',
    '',
    'Modern Skill Lab',
    '',
    'You received this email because this address was used to request the guide at modernskilllab.space. The separate weekly skill email is only enabled when you choose it.',
  ].join('\n');
}

const body = {
  backgroundColor: '#f6f7f9',
  color: '#1f2937',
  fontFamily: 'Arial, Helvetica, sans-serif',
  margin: 0,
  padding: '24px 12px',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '12px',
  margin: '0 auto',
  maxWidth: '580px',
  padding: '36px 32px 30px',
};

const brand = { color: '#374151', fontSize: '15px', fontWeight: '700', margin: '0 0 24px' };
const heading = { color: '#111827', fontSize: '28px', lineHeight: '1.2', margin: '0 0 24px' };
const paragraph = { color: '#374151', fontSize: '16px', lineHeight: '1.6', margin: '0 0 18px' };
const button = { backgroundColor: '#4f46e5', borderRadius: '8px', color: '#ffffff', display: 'block', fontSize: '15px', fontWeight: '700', margin: '26px 0', padding: '13px 18px', textAlign: 'center' as const, textDecoration: 'none' };
const signature = { color: '#111827', fontSize: '16px', fontWeight: '700', margin: '4px 0 24px' };
const rule = { borderColor: '#e5e7eb', margin: '26px 0 18px' };
const footerText = { color: '#6b7280', fontSize: '12px', lineHeight: '1.55', margin: '0 0 10px' };
const link = { color: '#4338ca', textDecoration: 'underline' };

export default CareerGuideEmail;
