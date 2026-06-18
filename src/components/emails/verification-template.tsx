import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "react-email";

interface VerifyEmailProps {
  verificationLink?: string;
}

const VERIFICATION_CODE_TTL_MINUTES = 10;

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `${process.env.NEXT_PUBLIC_APP_URL}`
  : "";

export default function VerifyEmail({ verificationLink }: VerifyEmailProps) {
  const currentYear = new Date().getFullYear();
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white dark:bg-black dark:text-white font-aws text-[#212121]">
          <Preview>Pawteller Email Verification</Preview>
          <Container className="p-5 mx-auto bg-[#eee] dark:bg-[#252f3d] rounded">
            <Section className="bg-white dark:bg-[#252f3d] rounded">
              <Section className="bg-[#252f3d] flex py-5 items-center justify-center">
                <Img
                  src={`${baseUrl}/vercel.svg`}
                  width="75"
                  height="45"
                  alt="Pawteller's Logo"
                />
              </Section>
              <Section className="py-6.25 px-8.75">
                <Heading className="text-[#333] dark:text-[#c1b5b5] text-[20px] font-bold mb-3.75">
                  Verify your email address
                </Heading>
                <Text className="text-[#333] dark:text-[#c1b5b5] text-[14px] leading-6 mt-6 mb-3.5 mx-0">
                  {`Thanks for subscribing to Pawteller! We want to make sure it's
                  really you. Please click the verification link below. If you
                  didn't request this, you can ignore this message.`}
                </Text>
                <Section className="flex items-center justify-center">
                  <Text className="text-[#333] dark:text-[#c1b5b5] m-0 font-bold text-center text-[14px]">
                    This link expires in {VERIFICATION_CODE_TTL_MINUTES} minutes
                    and can be used only once. If you did not request this,
                    please ignore this email.
                  </Text>

                  <Text className="text-[#333] dark:text-[#c1b5b5] text-[36px] my-2.5 mx-0 font-bold text-center">
                    Click the button below to verify your email address
                  </Text>

                  <Section className="mt-5">
                    <Link
                      href={verificationLink}
                      className="bg-[#252f3d] dark:bg-[#a0a8b3] text-[#6b6465] dark:text-white no-underline text-center font-bold py-3 px-6 rounded"
                    >
                      Verify Email
                    </Link>
                  </Section>

                  <Text className="text-[#333] dark:text-[#c1b5b5] text-[14px] m-0 text-center">
                    (Valid for {VERIFICATION_CODE_TTL_MINUTES} minutes. Use only
                    once.)
                  </Text>
                </Section>
              </Section>
              <Hr />
              <Section className="py-6.25 px-8.75">
                <Text className="text-[#333] dark:text-[#c1b5b5] text-[14px] m-0">
                  Pawteller will never email you and ask you to disclose or
                  verify your password, credit card, or banking account number.
                </Text>
              </Section>
            </Section>
            <Text className="text-[#333] dark:text-[#c1b5b5] text-[12px] my-6 mx-0 px-5 py-0">
              This message was produced and distributed by Pawteller Web
              Services, Inc., 410 Terry Ave. North, Seattle, WA 98109. ©{" "}
              {currentYear}, Pawteller Web Services, Inc.. All rights reserved.
              Pawteller is a registered trademark of{" "}
              <Link
                href="https://www.pawteller.com"
                target="_blank"
                className="text-[#2754C5] underline text-[14px]"
              >
                pawteller.com
              </Link>
              , Inc. View our{" "}
              <Link
                href="https://www.pawteller.com/privacy"
                target="_blank"
                className="text-[#2754C5] underline text-[14px]"
              >
                privacy policy
              </Link>
              .
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

VerifyEmail.PreviewProps = {
  verificationLink: "596853",
} satisfies VerifyEmailProps;
