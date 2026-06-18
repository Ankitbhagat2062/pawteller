// https://github.com/resend/react-email

import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "react-email";

interface PawtellerWelcomeEmailProps {
  userFirstname: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export const PawtellerWelcomeEmail = ({
  userFirstname,
}: PawtellerWelcomeEmailProps) => (
  <Html lang="en">
    <Head />
    <Tailwind>
      <Body className="dark:bg-black bg-[#f6f7fb] font-sans">
        <Preview>Welcome to Pawteller — here’s what to expect next.</Preview>

        <Container className="mx-auto w-full max-w-150 px-4 py-8">
          <Section className="rounded-[16px] bg-white dark:bg-[#252f3d] px-6 py-8 shadow-sm">
            <Img
              src={`${baseUrl}/vercel.svg`}
              width="60"
              height="60"
              alt="Pawteller Logo"
              className="mx-auto mb-6"
            />

            <Text className="text-[18px] leading-6.5 font-semibold text-[#111827] dark:text-white">
              Hi {userFirstname},
            </Text>

            <Text className="mt-3 text-[15px] leading-5.75 text-[#374151] dark:text-[#c1b5b5]">
              Thanks for subscribing to Pawteller! You’re officially on the list
              for pet care insights, breed guides, and practical tips you can
              use right away.
            </Text>

            <Section className="mt-5 rounded-[12px] bg-[#f8fafc] dark:bg-[#374151] px-5 py-4">
              <Text className="text-[14px] leading-5 font-semibold text-[#111827] dark:text-white">
                What you’ll get
              </Text>
              <Text className="mt-2 text-[14px] leading-5 text-[#374151] dark:text-[#c1b5b5]">
                • Weekly email updates
                <br />• Helpful guides for dogs & puppies
                <br />• Tools and calculators to support everyday decisions
              </Text>
            </Section>

            <Section className="mt-6">
              <Text className="text-[14px] leading-5 text-[#374151] dark:text-[#c1b5b5]">
                Tip: Add Pawteller to your contacts so you don’t miss the next
                issue.
              </Text>
            </Section>

            <Hr className="border-[#e5e7eb] my-6" />

            <Text className="text-[13px] leading-4.75 text-[#6b7280] dark:text-[#c1b5b5]">
              Best,
              <br />
              The Pawteller team
            </Text>

            <Text className="mt-6 text-[11px] leading-4 text-[#9ca3af] dark:text-[#c1b5b5]">
              You’re receiving this email because you subscribed to Pawteller.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

PawtellerWelcomeEmail.PreviewProps = {
  userFirstname: "Alan",
} as PawtellerWelcomeEmailProps;

export default PawtellerWelcomeEmail;
