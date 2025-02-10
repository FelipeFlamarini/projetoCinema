"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Stars } from "lucide-react";
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
      <Button className="flex items-center px-5 py-8 text-white text-lg bg-gradient-to-r from-[#8323FF] to-[#FF2DAF]">
        <div className="mr-2 bg-slate-300 bg-opacity-50 p-3 rounded-full text-lg backdrop-blur-sm">
          <Stars />
        </div>
        Busca Inteligente
      </Button>
      <ThemeToggleMenu />
    </header>
  );
}
