import { getMovieRecommendations } from "./gemini";
import { searchMovie } from "./tmdb";

export const searchGeminiMovies = async (query) => {
  const titles = await getMovieRecommendations(query).catch((error) => {
    console.error("Gemini API error:", error);
    throw new Error("Failed to get movie recommendations from AI");
  });

  const moviePromises = titles.map((title) =>
    searchMovie(title).catch((error) => {
      console.error(`TMDB API error for movie "${title}":`, error);
      return null;
    })
  );

  const movies = await Promise.all(moviePromises);
  const validMovies = movies.filter((m) => m !== null);

  if (validMovies.length === 0) {
    throw new Error("No valid movies found");
  }

  return validMovies;
};
