
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
  Text,
} from 'react-email';

interface VerifyEmailProps {
  verificationLink?: string;
}

const VERIFICATION_CODE_TTL_MINUTES = 10;

const baseUrl = process.env.VERCEL_URL

  ? `${process.env.VERCEL_URL}`
  : '';

export default function VerifyEmail({
  verificationLink,
}: VerifyEmailProps) {
  return (
    <Html>
      <Head />
        <Body className="bg-white font-aws text-[#212121]">
          <Preview>AWS Email Verification</Preview>
          <Container className="p-5 mx-auto bg-[#eee]">
            <Section className="bg-white">
              <Section className="bg-[#252f3d] flex py-5 items-center justify-center">
                <Img
                  src={`${baseUrl}/vercel.svg`}
                  width="75"
                  height="45"
                  alt="AWS's Logo"
                />
              </Section>
              <Section className="py-6.25 px-8.75">
                <Heading className="text-[#333] text-[20px] font-bold mb-3.75">
                  Verify your email address
                </Heading>
                <Text className="text-[#333] text-[14px] leading-6 mt-6 mb-3.5 mx-0">
                  Thanks for starting the new Pawteller account creation process. We
                  want to make sure it's really you. Please enter the following
                  verification link when prompted. If you don&apos;t want to
                  create an account, you can ignore this message.
                </Text>
                <Section className="flex items-center justify-center">
                  <Text className="text-[#333] m-0 font-bold text-center text-[14px]">
                    This link expires in {VERIFICATION_CODE_TTL_MINUTES} minutes and can be used only once. If you did not request this, please ignore this email.
                  </Text>


                  <Text className="text-[#333] text-[36px] my-2.5 mx-0 font-bold text-center">
                    Click the button below to verify your email address
                  </Text>

                  <Section className="mt-5">
                    <Link
                      href={verificationLink}
                      className="bg-[#252f3d] text-white no-underline text-center font-bold py-3 px-6 rounded"
                    >
                      Verify Email
                    </Link>
                  </Section>

                  <Text className="text-[#333] text-[14px] m-0 text-center">
                    (Valid for {VERIFICATION_CODE_TTL_MINUTES} minutes. Use only once.)
                  </Text>
                </Section>

              </Section>
              <Hr />
              <Section className="py-6.25 px-8.75">
                <Text className="text-[#333] text-[14px] m-0">
                  Pawteller will never email you and ask you to
                  disclose or verify your password, credit card, or banking
                  account number.
                </Text>
              </Section>
            </Section>
            <Text className="text-[#333] text-[12px] my-6 mx-0 px-5 py-0">
              This message was produced and distributed by Pawteller Web Services,
              Inc., 410 Terry Ave. North, Seattle, WA 98109. © 2022, Pawteller Web
              Services, Inc.. All rights reserved. Pawteller is a registered trademark
              of{' '}
              <Link
                href="https://www.pawteller.com"
                target="_blank"
                className="text-[#2754C5] underline text-[14px]"
              >
                Pawteller.com
              </Link>
              , Inc. View our{' '}
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
    </Html>
  );
}

VerifyEmail.PreviewProps = {
  verificationLink: '596853',
} satisfies VerifyEmailProps;
