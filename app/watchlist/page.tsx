import type { Metadata } from "next";

import WhatchlistComponent from "../WhatchlistComponent";

export const metadata: Metadata = {
  title: "Whatchlist",
};

export default function Whatchlist() {
  return <WhatchlistComponent />;
}
