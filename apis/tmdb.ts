"use server";

import axios from "axios";
import type { Movie, MovieGenre } from "@/lib/interfaces";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_API_KEY}`,
    "Content-Type": "application/json",
  },
});

tmdb.interceptors.request.use((request) => {
  console.log(`Request URL: ${request.baseURL}${request.url}`);
  return request;
});

export async function searchMovie(title: string) {
  try {
    const response = await tmdb.get("/search/movie", {
      params: { query: title },
    });

    if (!response.data.results.length) return null;

    const movie = response.data.results[0];

    const details = await tmdb.get(`/movie/${movie.id}`);

    return {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      genres: details.data.genres.map((g: MovieGenre) => g.name),
    };
  } catch (error) {
    console.error("TMDB API error:", error);
    return null;
  }
}

export async function getPopularMovies() {
  try {
    const response = await tmdb.get("/movie/popular", {
      params: {
        language: "pt-BR",
      },
    });
    const movies = response.data.results;

    // Get detailed information for each movie including genres
    const detailedMovies = await Promise.all(
      movies.slice(0, 8).map(async (movie: Movie) => {
        const details = await tmdb.get(`/movie/${movie.id}`);
        return {
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          poster_path: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : null,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          genres: details.data.genres.map((g: MovieGenre) => g.name),
        };
      })
    );

    return detailedMovies;
  } catch (error) {
    console.error("TMDB API error:", error);
    return [];
  }
}

export type Filter = {
  genre: string;
  year: string;
  rating: [string, string];
};

export const filterMovies = async (filter: Filter) => {
  console.log(filter);
  try {
    const response = await tmdb.get(`/discover/movie`, {
      params: {
        with_genres: filter.genre,
        primary_release_year: filter.year,
        "vote_average.gte": filter.rating[0],
        "vote_average.lte": filter.rating[1],
      },
    });
    // console.log("aaaaa")
    const movies = response.data.results;

    // Get detailed information for each movie including genres
    const detailedMovies = await Promise.all(
      movies.slice(0, 8).map(async (movie: Movie) => {
        const details = await tmdb.get(`/movie/${movie.id}`);
        return {
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          poster_path: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : null,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          genres: details.data.genres.map((g: MovieGenre) => g.name),
        };
      })
    );

    return detailedMovies;
  } catch (error) {
    console.error("TMDB API error:", error);
    return [];
  }
};

export const getGenres = async () => {
  try {
    const response = await tmdb.get(`/genre/movie/list`, {
      params: {
        language: "pt-BR",
      },
    });
    console.log("genres");
    return response.data.genres;
  } catch (error) {
    console.error("TMDB API error:", error);
    return [];
  }
};
