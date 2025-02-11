import type { Metadata } from "next";

import FilmesClient from "./filmes-client";

export const metadata: Metadata = {
  title: "Pesquisa de filmes",
};

export default function Filmes() {
  return <FilmesClient />;
}
