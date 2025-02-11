import type { Metadata } from "next";

import WatchlistClient from "./WatchlistClient";

export const metadata: Metadata = {
  title: "Watchlist",
};

export default function Watchlist() {
  return <WatchlistClient />;
}
