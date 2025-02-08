import axios from "axios";
import "@/lib/envConfig";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_API_KEY}`,
    "Content-Type": "application/json",
  },
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
      posterPath: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
      genres: details.data.genres.map((g: any) => g.name),
    };
  } catch (error) {
    console.error("TMDB API error:", error);
    return null;
  }
}

export async function getPopularMovies() {
  try {
    const response = await tmdb.get("/movie/popular");
    const movies = response.data.results;

    // Get detailed information for each movie including genres
    const detailedMovies = await Promise.all(
      movies.slice(0, 6).map(async (movie: any) => {
        const details = await tmdb.get(`/movie/${movie.id}`);
        return {
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          posterPath: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : null,
          releaseDate: movie.release_date,
          voteAverage: movie.vote_average,
          genres: details.data.genres.map((g: any) => g.name),
        };
      })
    );

    return detailedMovies;
  } catch (error) {
    console.error("TMDB API error:", error);
    return [];
  }
}
