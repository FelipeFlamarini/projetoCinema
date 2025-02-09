import type { Metadata } from "next";

import HomeClient from "./homeClient";

export const metadata: Metadata = {
  title: "Página inicial",
};

export default function Home() {
  return <HomeClient />;
}
