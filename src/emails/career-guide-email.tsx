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
  Section,
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
      <Preview>Your 60-page Career & Life Map is ready.</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={brandBar}>
            <Text style={brand}>MODERN SKILL LAB</Text>
          </Section>

          <Section style={content}>
            <Text style={eyebrow}>YOUR FREE INTERACTIVE WORKBOOK</Text>
            <Heading style={heading}>The Career &amp; Life Map is ready</Heading>
            <Text style={paragraph}>{greeting}</Text>
            <Text style={paragraph}>
              Thanks for taking a deliberate step toward clearer work and life decisions. Your 60-page workbook is attached to this email, and the button below gives you a backup copy whenever you need it.
            </Text>

            <Button href={downloadUrl} style={button}>
              Download the Career &amp; Life Map
            </Button>

            <Section style={callout}>
              <Text style={calloutTitle}>A good place to begin</Text>
              <Text style={calloutText}>
                Open Part 1, complete the current-state snapshot, and choose one seven-day experiment. You do not need to finish the workbook in one sitting.
              </Text>
            </Section>

            <Text style={paragraph}>
              Inside you will find decision tools, career-fit prompts, skill-gap maps, learning sprints, weekly reviews, and practical worksheets you can type into.
            </Text>
            <Text style={paragraph}>Keep building, one useful decision at a time.</Text>
            <Text style={signature}>Modern Skill Lab</Text>

            <Hr style={rule} />
            <Text style={footerText}>
              This email delivers a resource you requested. It does not add you to marketing emails unless you selected the separate newsletter option.
            </Text>
            <Text style={footerText}>
              If the button does not work, copy this link into your browser:{' '}
              <Link href={downloadUrl} style={link}>{downloadUrl}</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: '#eef2ff',
  color: '#172033',
  fontFamily: 'Arial, Helvetica, sans-serif',
  margin: 0,
  padding: '28px 12px',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #dbe3f1',
  borderRadius: '18px',
  margin: '0 auto',
  maxWidth: '620px',
  overflow: 'hidden',
};

const brandBar = { backgroundColor: '#0f172a', padding: '18px 28px' };
const brand = { color: '#ffffff', fontSize: '13px', fontWeight: '700', letterSpacing: '1.7px', margin: 0 };
const content = { padding: '34px 34px 30px' };
const eyebrow = { color: '#6d3df5', fontSize: '12px', fontWeight: '700', letterSpacing: '1.4px', margin: '0 0 10px' };
const heading = { color: '#0f172a', fontSize: '32px', lineHeight: '1.16', margin: '0 0 24px' };
const paragraph = { color: '#344054', fontSize: '16px', lineHeight: '1.65', margin: '0 0 18px' };
const button = { backgroundColor: '#6d3df5', borderRadius: '10px', color: '#ffffff', display: 'block', fontSize: '15px', fontWeight: '700', margin: '26px 0', padding: '14px 20px', textAlign: 'center' as const, textDecoration: 'none' };
const callout = { backgroundColor: '#f4f1ff', border: '1px solid #ded5ff', borderRadius: '12px', margin: '0 0 24px', padding: '18px 20px' };
const calloutTitle = { color: '#5b2bd9', fontSize: '14px', fontWeight: '700', margin: '0 0 7px' };
const calloutText = { color: '#344054', fontSize: '14px', lineHeight: '1.55', margin: 0 };
const signature = { color: '#0f172a', fontSize: '16px', fontWeight: '700', margin: '0 0 24px' };
const rule = { borderColor: '#e5e7eb', margin: '28px 0 20px' };
const footerText = { color: '#667085', fontSize: '12px', lineHeight: '1.55', margin: '0 0 10px' };
const link = { color: '#5b2bd9', textDecoration: 'underline' };

export default CareerGuideEmail;

