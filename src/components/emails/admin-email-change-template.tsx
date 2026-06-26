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
  Tailwind,
  Text,
} from "react-email";

interface AdminEmailChangeProps {
  verificationLink?: string;
  previousEmail?: string;
  newEmail?: string;
}

const TTL_MINUTES = 15;

export default function AdminEmailChangeTemplate({
  verificationLink,
  previousEmail,
  newEmail,
}: AdminEmailChangeProps) {
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      <Tailwind>
        <Head />
        <Body className="bg-white dark:bg-black dark:text-white font-aws text-[#212121]">
          <Preview>Pawteller Email Change Confirmation</Preview>

          <Container className="p-5 mx-auto bg-[#eee] dark:bg-[#252f3d] rounded">
            <Section className="bg-white dark:bg-[#252f3d] rounded">
              <Section className="py-5 px-8 flex items-center justify-center">
                <Heading className="text-[#333] dark:text-[#c1b5b5] text-[16px] font-bold m-0">
                  Confirm your email change
                </Heading>
              </Section>

              <Section className="py-6.25 px-8.75">
                <Heading className="text-[#333] dark:text-[#c1b5b5] text-[20px] font-bold mb-3.75">
                  Verify the new email address
                </Heading>

                <Text className="text-[#333] dark:text-[#c1b5b5] text-[14px] leading-6 mt-6 mb-3.5">
                  {previousEmail && newEmail ? (
                    <>
                      You requested to change your Pawteller admin email from{" "}
                      <b>{previousEmail}</b> to <b>{newEmail}</b>.
                    </>
                  ) : (
                    <>You requested to change your Pawteller admin email.</>
                  )}
                </Text>

                <Text className="text-[#333] dark:text-[#c1b5b5] text-[14px] leading-6">
                  Click the button below to confirm. This link expires in {TTL_MINUTES} minutes and can be used only once.
                </Text>

                <Section className="mt-5">
                  <Button
                    href={verificationLink}
                    className="bg-[`#252f3d`] dark:bg-[`#a0a8b3`] text-white no-underline text-center font-bold py-3 px-6 rounded"
                  >
                    Confirm Email Change
                  </Button>
                </Section>

                <Hr />

                <Text className="text-[#333] dark:text-[#c1b5b5] text-[12px] my-4">
                  If you didn’t request this change, you can ignore this email.
                </Text>

                <Text className="text-[#333] dark:text-[#c1b5b5] text-[14px] mt-4">
                  Pawteller will never email you and ask you to disclose or verify your password.
                </Text>

                <Text className="text-[#333] dark:text-[#c1b5b5] text-[12px] my-6">
                  This message was produced and distributed by Pawteller Web Services, Inc. © {currentYear}.
                </Text>

                {verificationLink ? (
                  <Text className="text-[#333] dark:text-[#c1b5b5] text-[12px]">
                    Or copy/paste this link: {" "}
                    <Link href={verificationLink}>{verificationLink}</Link>
                  </Text>
                ) : null}
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

