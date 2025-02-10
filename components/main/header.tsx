import { Bookmark } from "lucide-react";
import { ThemeToggleMenu } from "../theme-menu";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex items-center justify-between mb-8 p-4">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        MOVIE AI
      </h1>

      <div className="flex gap-10">
        <Link
          href="/watchlist"
          className="flex items-center gap-2 text-white/80 hover:text-white"
        >
          <Bookmark className="w-4 h-4" />
          Minha Watchlist
        </Link>
        <ThemeToggleMenu />
      </div>
    </div>
  );
}
