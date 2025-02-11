import { Key } from "react";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  genres: string[];
}

export interface ChatMessages {
  sender: boolean;
  message: string | Movie[];
}

export interface WatchlistMovie {
  id: Key;
  movieId: number;
  movieData: Movie;
  addedAut: string;
}

export interface MovieGenre {
  id: number;
  name: string;
}
