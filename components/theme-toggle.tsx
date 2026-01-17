"use client"

import { useTheme } from "@/lib/theme-context"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative"
      aria-label="Alternar tema"
    >
      {theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
    </Button>
  )
}
