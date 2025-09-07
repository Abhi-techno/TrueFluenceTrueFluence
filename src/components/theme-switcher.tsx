"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={cn(
        "relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        isDark ? "bg-primary" : "bg-input"
      )}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none relative inline-block h-7 w-7 transform rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out",
          isDark ? "translate-x-6" : "translate-x-0"
        )}
      >
        <span
          className={cn(
            "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity",
            isDark ? "opacity-0 duration-100 ease-out" : "opacity-100 duration-200 ease-in"
          )}
        >
          <Sun className="h-4 w-4 text-foreground" />
        </span>
        <span
          className={cn(
            "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity",
            isDark ? "opacity-100 duration-200 ease-in" : "opacity-0 duration-100 ease-out"
          )}
        >
          <Moon className="h-4 w-4 text-foreground" />
        </span>
      </span>
    </button>
  )
}
