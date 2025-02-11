"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Bookmark, Filter, HomeIcon } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isOnWatchlistPage = pathname === "/watchlist";

  const handleNavigation = () => {
    router.push("/watchlist");
  };

  const handleFilmes = () => {
    router.push("/filmes");
  };

  return (
    <header className="flex items-center justify-between p-4 bg-background text-foreground max-w-screen-xl mx-auto">
      <div className="text-2xl font-bold">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          <Link href={"/"}>MOVIE AI</Link>
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={handleNavigation}
          className="flex items-center gap-2 border-2 border-primary rounded-full px-4 py-2 hover:bg-primary hover:bg-opacity-10 transition-colors hover:text-black w-32 justify-center"
        >
          <Bookmark className="w-6 h-6" />
          <p>Watchlist</p>
        </button>
        <Link href={"/filmes"}>
          <button
            onClick={handleFilmes}
            className="flex items-center gap-2 border-2 border-primary rounded-full px-4 py-2 hover:bg-primary hover:bg-opacity-10 transition-colors hover:text-black w-32 justify-center"
          >
            <Filter />
            <p>{"Filmes"}</p>
          </button>
        </Link>
      </div>
    </header>
  );
}
