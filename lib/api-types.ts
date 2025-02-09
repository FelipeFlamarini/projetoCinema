import { z } from "zod";
import type { Movie } from "@shared/schema";

export const recommendationsResponseSchema = z.array(z.any());
export type RecommendationsResponse = z.infer<typeof recommendationsResponseSchema>;

export async function getRecommendations(query: string): Promise<Movie[]> {
  const response = await fetch("/api/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });

  if (!response.ok) {
    throw new Error("Failed to get recommendations");
  }

  return response.json();
}

// Local Storage Keys
const WATCHLIST_KEY = 'movieai_watchlist';
const SEARCHES_KEY = 'movieai_searches';

// Watchlist Functions
export function addToWatchlist(movie: Movie): void {
  const watchlist = getWatchlist();
  if (!watchlist.some(item => item.movieId === movie.id)) {
    watchlist.push({
      id: Date.now(),
      movieId: movie.id,
      movieData: movie,
      addedAt: new Date().toISOString()
    });
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  }
}

export function removeFromWatchlist(movieId: number): void {
  const watchlist = getWatchlist();
  const filtered = watchlist.filter(item => item.movieId !== movieId);
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(filtered));
}

export function getWatchlist() {
  const data = localStorage.getItem(WATCHLIST_KEY);
  return data ? JSON.parse(data) : [];
}

export function isInWatchlist(movieId: number): boolean {
  const watchlist = getWatchlist();
  return watchlist.some(item => item.movieId === movieId);
}

// Search History Functions
export function saveSearch(query: string, recommendations: Movie[]): void {
  const searches = getSearches();
  searches.unshift({
    id: Date.now(),
    query,
    recommendations,
    timestamp: new Date().toISOString()
  });

  // Keep only last 5 searches
  const recentSearches = searches.slice(0, 5);
  localStorage.setItem(SEARCHES_KEY, JSON.stringify(recentSearches));
}

export function getSearches() {
  const data = localStorage.getItem(SEARCHES_KEY);
  return data ? JSON.parse(data) : [];
}