"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Stars, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggleMenu } from "../theme-menu";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-background text-foreground max-w-screen-xl mx-auto">
      <div className="text-2xl font-bold">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          MOVIE AI
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/watchlist">
          <button
            className="flex items-center gap-2 border-2 border-primary rounded-full px-4 py-2 hover:bg-primary hover:bg-opacity-10 transition-colors
            hover:text-black"
          >
            <Bookmark className="w-6 h-6" />
            <p className="">Watchlist</p>
          </button>
        </Link>
        <ThemeToggleMenu />
      </div>
    </header>
  );
}
