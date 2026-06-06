// https://github.com/resend/react-email

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from 'react-email';
import tailwindConfig from '../../../tailwind.config';
type TopMatch = {
  rank: number;
  breed: string;
  compatibility: number;
  description?: string;
  temperament?: string[];
  lifespan?: string;
  reasons?: string[];
};

export interface DogBreedEmailProps {
  userName: string;
  topMatches: TopMatch[];
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}` : '';

const rankLabel = (rank: number) => {
  if (rank === 1) return 'Top Match';
  if (rank === 2) return 'Runner-Up';
  if (rank === 3) return 'Strong Third';
  return `Match #${rank}`;
};

const formatCompatibility = (value: number) => {
  const safe = Number.isFinite(value) ? value : 0;
  return `${Math.round(safe)}%`;
};

const DogBreed = ({ userName, topMatches }: DogBreedEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind config={tailwindConfig}>
        <Head />
        <Preview>Your quiz results are ready — here are your top 3 breed matches.</Preview>
        <Body className="dark:bg-black bg-amber-50 font-sans py-10">

          <Container className="bg-white dark:bg-[#252f3d] rounded-[8px] max-w-150 mx-auto p-10">
            {/* Header */}
            <Section className="text-center mb-8">
              <Heading className="text-[30px] font-bold text-black dark:text-white m-0 mb-4">
                Your Top 3 Breed Matches 🐾
              </Heading>
              <Text className="text-[16px] text-gray-800 dark:text-[#c1b5b5] leading-6">
                Hi {userName}! Based on your quiz answers, here are the breeds that fit you best.
              </Text>
            </Section>

            <Section>
              {topMatches
                .slice(0, 3)
                .map((match) => (
                  <Section
                    key={`${match.rank}-${match.breed}`}
                    className="mb-6 rounded-[12px] border border-solid border-gray-200 dark:border-gray-700 p-5"
                  >
                    <Section className="flex items-start justify-between gap-4">
                      <Section>
                        <Text className="text-[12px] font-semibold tracking-wide uppercase text-gray-500 dark:text-[#c1b5b5]">
                          {rankLabel(match.rank)}
                        </Text>
                        <Heading className="text-[20px] font-bold text-black dark:text-white m-0 mt-1">
                          {match.breed}
                        </Heading>
                      </Section>

                      <Section className="text-right">
                        <Text className="text-[12px] font-semibold text-gray-500 dark:text-[#c1b5b5]">Compatibility</Text>
                        <Text className="text-[26px] font-bold text-[#e0664d] m-0 leading-none">
                          {formatCompatibility(match.compatibility)}
                        </Text>
                      </Section>
                    </Section>

                    {match.description ? (
                      <Text className="text-[14px] text-gray-800 dark:text-[#c1b5b5] leading-6 mt-4">
                        {match.description}
                      </Text>
                    ) : null}

                    {/* Temperament */}
                    {match.temperament && match.temperament.length > 0 ? (
                      <Section className="mt-4">
                        <Text className="text-[12px] font-semibold text-gray-700 dark:text-[#c1b5b5]">
                          Temperament
                        </Text>
                        <Section className="mt-2 flex flex-wrap gap-2">
                          {match.temperament.slice(0, 4).map((t) => (
                            <Section
                              key={t}
                              className="rounded-full bg-[#fdf7f2] dark:bg-[#1f2937] border border-solid border-orange-100 dark:border-gray-700 px-3 py-1"
                            >
                              <Text className="text-[12px] font-semibold text-[#b45309] dark:text-[#fbbf24] m-0">
                                {t}
                              </Text>
                            </Section>
                          ))}
                        </Section>
                      </Section>
                    ) : null}

                    {/* Lifespan */}
                    {match.lifespan ? (
                      <Text className="text-[13px] text-gray-800 dark:text-[#c1b5b5] mt-3">
                        <span className="font-semibold">Typical lifespan:</span> {match.lifespan}
                      </Text>
                    ) : null}

                    {/* Reasons */}
                    {match.reasons && match.reasons.length > 0 ? (
                      <Section className="mt-4">
                        <Text className="text-[12px] font-semibold text-gray-700 dark:text-[#c1b5b5]">
                          Why this match
                        </Text>
                        <Section className="mt-2">
                          {match.reasons.slice(0, 4).map((r) => (
                            <Text
                              key={r}
                              className="text-[14px] text-gray-800 dark:text-[#c1b5b5] leading-6"
                            >
                              • {r}
                            </Text>
                          ))}
                        </Section>
                      </Section>
                    ) : null}
                  </Section>
                ))}
            </Section>

            <Hr className="border-[#e5e7eb] my-8" />

            <Section className="text-center">
              <Text className="text-[14px] text-gray-800 dark:text-[#c1b5b5] leading-6">
                Want help deciding? Reply to this email with any questions — we’ll point you in the right direction.
              </Text>

              <Section className="mt-6">
                <Button
                  href={`${baseUrl}/quiz`}
                  className="bg-[#e0664d] dark:bg-[#e0664d] text-white no-underline rounded-[10px] px-6 py-3 text-[14px] font-semibold"
                >
                  Retake the quiz
                </Button>
              </Section>
            </Section>

            {/* Footer */}
            <Section className="border-t border-solid border-gray-200 pt-6 mt-10">
              <Text className="text-[12px] text-gray-500 dark:text-[#c1b5b5] text-center m-0 mb-2">
                © 2025 Pawteller. All rights reserved.
              </Text>
              <Text className="text-[12px] text-gray-500 dark:text-[#c1b5b5] text-center m-0">
                <a href={`${baseUrl}/unsubscribe`}className="text-gray-500 dark:text-[#c1b5b5] underline">
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


export default DogBreed;

