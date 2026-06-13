import * as React from "react";
import { Html, Head, Preview, Body, Container, Section, Text, Button } from "react-email";

type ResetPasswordEmailProps = {
  resetLink: string;
};

export default function ResetPasswordEmail({ resetLink }: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your Pawteller CMS password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Text style={title}>Reset your password</Text>
            <Text style={text}>Click the button below to choose a new password.</Text>
          </Section>

          <Section style={section}>
            <Button href={resetLink} style={button}>
              Reset password
            </Button>
          </Section>

          <Section style={section}>
            <Text style={text}>
              If you didn&apos;t request this, you can ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main: React.CSSProperties = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
};

const container: React.CSSProperties = {
  margin: "0 auto",
  padding: "24px",
  maxWidth: "600px",
};

const section: React.CSSProperties = {
  marginBottom: "16px",
};

const title: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 700,
  margin: "0 0 8px",
};

const text: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#111827",
};

const button: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#111827",
  color: "#ffffff",
  padding: "12px 18px",
  borderRadius: "6px",
  textDecoration: "none",
  fontSize: "14px",
};

