import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "react-email";

const ContactThankYouEmail = ({ name }: { name: string }) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        Thanks for reaching out, {name}! {`I'll get back to you soon.`}
      </Preview>
      <Tailwind>
        <Body className="dark:bg-black bg-amber-50 font-sans py-10">
          <Container className="bg-white dark:bg-[#252f3d] rounded-[8px] max-w-150 mx-auto p-10">
            {/* Header */}
            <Section className="text-center mb-8">
              <Heading className="text-[32px] font-bold text-black dark:text-white m-0 mb-4">
                Thanks for Reaching Out!
              </Heading>
            </Section>

            {/* Main Content */}
            <Section className="mb-8">
              <Text className="text-[16px] text-gray-800 dark:text-[#c1b5b5] mb-4 leading-6">
                Hi {name}!
                <br />
                <br />
                {` Thanks for reaching out—I've received your message and
                appreciate you taking the time.`}
              </Text>

              <Text className="text-[16px] text-gray-800 dark:text-[#c1b5b5] mb-4 leading-6">
                {` I've reviewed your message and will get back to you within
                24–48 hours.`}
              </Text>

              <Text className="text-[16px] text-gray-800 dark:text-[#c1b5b5] leading-6">
                {`If your inquiry is urgent, please don't hesitate to follow
                up.`}
              </Text>

              <Text className="text-[16px] text-gray-800 dark:text-[#c1b5b5] leading-6">
                Best regards,
                <br />
                Chris
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-solid border-gray-200 pt-6 mt-10">
              <Text className="text-[12px] text-gray-500 dark:text-[#c1b5b5] text-center m-0 mb-2">
                © 2025 Chris. All rights reserved.
              </Text>
              <Text className="text-[12px] text-gray-500 dark:text-[#c1b5b5] text-center m-0">
                <a
                  href={`${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe`}
                  className="text-gray-500 dark:text-[#c1b5b5] underline"
                >
                  Unsubscribe
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactThankYouEmail;
