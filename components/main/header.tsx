"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggleMenu } from "../theme-menu";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="flex items-center justify-between p-4 bg-background text-foreground">
      <div className="text-2xl font-bold">Logo</div>
      <ThemeToggleMenu />
    </header>
  );
}
