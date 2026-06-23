"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <div className="flex flex-col items-start gap-2">
      {/* Switch - matches the pill shape from your image */}
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        className="h-7 w-12 rounded-full 
                   data-[state=checked]:bg-zinc-700 
                   data-[state=unchecked]:bg-zinc-300
                   [&>span]:h-6 [&>span]:w-6 
                   [&>span]:bg-white 
                   [&>span]:rounded-full 
                   [&>span]:shadow-sm
                   data-[state=checked]:[&>span]:translate-x-5
                   transition-all duration-200"
      />
      
      {/* Label below switch, changes with theme */}
      <Label className="text-base font-medium text-foreground pl-1">
        {isDark ? "Dark" : "Light"}
      </Label>
    </div>
  )
}