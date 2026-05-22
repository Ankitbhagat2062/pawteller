'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function FooterSection() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
      <Button
        asChild
        className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-full"
      >
        <Link href="/calculators/dog-feeding">How much to feed →</Link>
      </Button>
      <Button
        variant="ghost"
        asChild
        className="text-foreground font-medium"
      >
        <Link href="/calculators/dog-age">Dog age calculator</Link>
      </Button>
    </div>
  )
}
