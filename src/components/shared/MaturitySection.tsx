'use client'

import { Card } from '@/components/ui/card'
import { MATURITY_STAGES } from '@/lib/constant'

export function MaturitySection() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl md:text-4xl font-serif text-foreground">
        When will your puppy stop growing?
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6">
        {MATURITY_STAGES.map((stage) => (
          <Card
            key={stage.category}
            className="p-4 md:p-6 border-2 border-border bg-card text-card-foreground hover:border-primary transition-colors text-center"
          >
            <p className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
              {stage.category}
            </p>
            <p className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              {stage.range}
            </p>
            <p className="text-xs text-muted-foreground mt-2 hidden md:block">
              {stage.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}
