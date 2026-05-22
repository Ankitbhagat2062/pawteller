'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { type GrowthInfo } from '@/lib/types'
import { calculatePuppyGrowth } from '@/lib/constant'
import { PuppyForm } from '../shared/PuppyForm'
import { ResultCard } from '../shared/ResultCard'
import { MaturitySection } from '../shared/MaturitySection'
import { FooterSection } from '../shared/DogGrowthFooterSection'

const PUPPY_IMAGE = 'https://images.unsplash.com/photo-1633722715463-d30628cff756?w=200&h=200&fit=crop'

export default function DogGrowth() {
  const [growthInfo, setGrowthInfo] = useState<GrowthInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = (breed: string, ageMonths: number, weightLbs: number) => {
    setLoading(true)
    setError(null)

    try {
      const result = calculatePuppyGrowth(breed, ageMonths, weightLbs)
      setGrowthInfo(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setGrowthInfo(null)
    } finally {
      setLoading(false)
    }
  }

  // Initialize with default calculation
  if (!growthInfo && !error) {
    handleCalculate('Labrador Retriever', 3, 25)
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-orange-600 dark:text-orange-400">
              <span>🐕</span>
              <span>PUPPY WEIGHT CALCULATOR</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground">
              How big will your <em className="not-italic font-normal">puppy</em> get?
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
             {` Predict your puppy's adult weight in seconds. We use breed-specific growth
              curves built from veterinary data to give you the most accurate forecast —
              plus a beautiful chart to watch their journey.`}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
              <PuppyForm
                onSubmit={handleCalculate}
                disabled={loading}
              />
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {loading && (
              <div className="rounded-2xl bg-muted p-12 flex items-center justify-center min-h-96">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <p className="text-muted-foreground">Calculating...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-2xl bg-red-50 dark:bg-red-950 p-6 border border-red-200 dark:border-red-800">
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            {growthInfo && !loading && (
              <ResultCard growthInfo={growthInfo} puppyImage={PUPPY_IMAGE} />
            )}
          </div>
        </div>

        {/* Maturity Section */}
        <div className="mb-12 md:mb-16">
          <MaturitySection />
        </div>

        {/* Footer */}
        <FooterSection />
      </div>

      {/* Additional SEO Content */}
      <div className="border-t border-border bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-4">
                How Our Calculator Works
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {`Our puppy weight calculator uses breed-specific growth curves developed from
                veterinary research. By inputting your puppy's current age, weight, and breed,
                we can accurately predict their adult size. The calculation takes into account
                the unique growth patterns of different dog sizes, from tiny Chihuahuas to
                large German Shepherds.`}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-4">
                Tips for Puppy Growth
              </h3>
              <ul className="text-muted-foreground space-y-2 leading-relaxed">
                <li>• {`Monitor your puppy's weight regularly for accurate predictions`}</li>
                <li>• Large breed puppies need special nutrition for healthy development</li>
                <li>• Growth rates vary — consult your veterinarian for breed-specific advice</li>
                <li>• Most puppies reach their adult weight between 9-24 months</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
