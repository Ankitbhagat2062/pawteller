import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "react-email";

type TopMatch = {
  rank: number;
  breed: string;
  compatibility: number;
  description?: string;
  temperament?: string[];
  lifespan?: string;
  reasons?: string[];
  scoreBreakdown?: {
    apartmentLiving: string;
    lifestyleMatch: string;
    kidFriendly: string;
    beginnerFriendly: string;
    lowShedding: string;
    sizePreference: string;
    total: string;
  };
};

export interface DogBreedEmailProps {
  userName: string;
  topMatches: TopMatch[];
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `${process.env.NEXT_PUBLIC_APP_URL}`
  : "";

const DogBreed = ({ userName, topMatches }: DogBreedEmailProps) => {
  const winner = topMatches[0];
  return (
    <Html>
      <Head />

      <Preview>Your perfect dog breed match is {winner.breed} 🐶</Preview>

      <Tailwind>
        <Body className="bg-slate-100 py-10">
          <Container className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white shadow-xl">
            {/* Hero */}
            <Section className="bg-linear-to-r from-orange-500 to-red-500 px-6 sm:px-10 py-10 sm:py-12 text-center">
              <Text className="m-0 text-5xl sm:text-6xl">🐶</Text>

              <Heading
                as="h1"
                className="m-0 mt-4 text-3xl sm:text-4xl font-bold text-white"
              >
                Your Personalized Dog Breed Report
              </Heading>

              <Text className="mt-4 text-xl sm:text-2xl text-white/95">
                Based on your lifestyle, activity level, family situation,
                grooming preferences, and ideal dog size.
              </Text>
            </Section>

            {/* Intro */}
            <Section className="px-10 py-8">
              <Text className="text-lg text-slate-700">
                Hi <strong>{userName}</strong>,
              </Text>

              <Text className="leading-7 text-slate-600">
                {`Based on your quiz answers, we've analyzed dozens of dog breeds
                and found the ones most compatible with your lifestyle.`}
              </Text>
            </Section>

            <Section className="mx-8 rounded-2xl border border-green-200 bg-green-50 p-5">
              <Text className="m-0 text-center text-green-900">
                ✓ Personalized from 6 lifestyle factors
                <br />✓ Compared against multiple compatible breeds
                <br />✓ Ranked using a weighted compatibility system
              </Text>
            </Section>

            <Section className="px-6 sm:px-8 py-10">
              <Heading
                as="h2"
                className="mb-6 text-2xl sm:text-3xl text-center"
              >
                Your Top Breed Matches
              </Heading>

              {topMatches.map((dog) => (
                <Section
                  key={dog.breed}
                  className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white"
                >
                  {/* Header */}
                  <Section
                    className={
                      dog.rank === 1
                        ? "bg-linear-to-r from-amber-400 to-orange-500 p-6"
                        : dog.rank === 2
                          ? "bg-linear-to-r from-slate-300 to-slate-400 p-6"
                          : "bg-linear-to-r from-orange-200 to-orange-300 p-6"
                    }
                  >
                    <Text className="m-0 text-sm font-bold uppercase text-black">
                      #{dog.rank} Recommended Match
                    </Text>

                    <Heading className="m-0 mt-2 text-4xl text-black">
                      {dog.breed}
                    </Heading>

                    <Text className="m-0 mt-2 text-xl font-bold text-black">
                      {dog.compatibility}% Compatibility
                    </Text>
                  </Section>

                  {/* Body */}
                  <Section className="p-6">
                    <Text className="leading-7 text-slate-700">
                      {dog.description}
                    </Text>

                    {dog.temperament?.length ? (
                      <>
                        <Heading className="mt-6 mb-3 text-lg">
                          Personality Traits
                        </Heading>

                        <Text className="text-slate-700">
                          {dog.temperament.join(" • ")}
                        </Text>
                      </>
                    ) : null}

                    {dog.lifespan ? (
                      <Text className="mt-4 text-slate-700">
                        <strong>Lifespan:</strong> {dog.lifespan}
                      </Text>
                    ) : null}

                    {dog.reasons?.length ? (
                      <>
                        <Heading className="mt-6 mb-3 text-lg">
                          Why This Breed Fits You
                        </Heading>

                        {dog.reasons.map((reason) => (
                          <Text key={reason} className="mb-2 text-slate-700">
                            ✅ {reason}
                          </Text>
                        ))}
                      </>
                    ) : null}
                  </Section>
                </Section>
              ))}
            </Section>

            {/* Top 3 */}
            <Section className="px-6 sm:px-8 py-10">
              <Heading as="h2" className="mb-6 text-2xl sm:text-2xl">
                Your Top 3 Matches
              </Heading>

              {topMatches.map((dog) => (
                <Section
                  key={dog.breed}
                  className="mb-4 rounded-2xl border border-slate-200 p-5"
                >
                  <Row>
                    <Column>
                      <Text className="font-bold text-slate-900">
                        #{dog.rank} {dog.breed}
                      </Text>
                    </Column>
                    <Column align="right">
                      <Text className="font-bold text-emerald-900">
                        {dog.compatibility}%
                      </Text>
                    </Column>
                  </Row>

                  <Text className="text-slate-600">{dog.description}</Text>
                </Section>
              ))}
            </Section>

            {topMatches.map((dog) => (
              <Section
                key={`${dog.breed}-score`}
                className="mx-8 mb-6 rounded-2xl bg-slate-50 p-6"
              >
                <Heading className="mb-4 text-xl">
                  {dog.breed} Match Analysis
                </Heading>

                <table width="100%">
                  <tbody>
                    <tr>
                      <td>🏠 Apartment Living</td>
                      <td align="right">
                        {dog.scoreBreakdown?.apartmentLiving}
                      </td>
                    </tr>

                    <tr>
                      <td>🛋 Lifestyle Match</td>
                      <td align="right">
                        {dog.scoreBreakdown?.lifestyleMatch}
                      </td>
                    </tr>

                    <tr>
                      <td>👶 Kid Friendly</td>
                      <td align="right">{dog.scoreBreakdown?.kidFriendly}</td>
                    </tr>

                    <tr>
                      <td>🐾 Beginner Friendly</td>
                      <td align="right">
                        {dog.scoreBreakdown?.beginnerFriendly}
                      </td>
                    </tr>

                    <tr>
                      <td>✨ Low Shedding</td>
                      <td align="right">{dog.scoreBreakdown?.lowShedding}</td>
                    </tr>

                    <tr>
                      <td>📏 Size Preference</td>
                      <td align="right">
                        {dog.scoreBreakdown?.sizePreference}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <strong>Total Score</strong>
                      </td>

                      <td align="right">
                        <strong>{dog.scoreBreakdown?.total}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Section>
            ))}

            <Section className="mx-8 mb-10 rounded-3xl border border-blue-200 bg-blue-50 p-8">
              <Heading className="text-xl">Expert Recommendation</Heading>

              <Text className="leading-8 text-slate-700">
                Among all evaluated breeds,
                <strong> {topMatches[0].breed}</strong>
                achieved the highest compatibility score. However, all three
                recommendations would fit your lifestyle well and could become
                excellent companions depending on individual temperament,
                training, and environment.
              </Text>
            </Section>

            {/* CTA */}
            <Section className="px-6 sm:px-10 py-10 sm:py-12 text-center">
              <Heading className="text-2xl sm:text-2xl" as="h2">
                Ready to Meet Your Future Best Friend?
              </Heading>

              <Text className="mb-8 text-slate-700">
                Every dog is unique, but these breeds are statistically the best
                fit for the lifestyle you described.
              </Text>

              <Link
                href={`${baseUrl}`}
                className="rounded-xl bg-orange-500 px-8 py-4 text-lg font-bold text-white"
              >
                Explore Dog Resources
              </Link>
            </Section>

            {/* Footer */}
            <Section className="border-t border-slate-200 px-10 py-8 text-center">
              <Text className="text-sm text-slate-500">
                Generated from your Dog Breed Match Quiz
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default DogBreed;
