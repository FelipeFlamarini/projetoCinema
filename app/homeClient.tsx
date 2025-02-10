"use client";
import { useQuery } from "@tanstack/react-query";
import { MovieCard } from "@/components/movie-card";
import { Loader2 } from "lucide-react";
import { getPopularMovies } from "@/apis/tmdb";

export default function HomeClient() {
  const { data: popularMovies, isLoading: isLoadingPopular } = useQuery<any[]>({
    queryKey: ["popularMovies"],
    queryFn: getPopularMovies,
  });

  return (
    <div className=" text-white px-10 py-10 p max-w-screen-xl mx-auto">
      <>
        <h2 className="text-xl font-semibold mb-6 text-white/90">
          Popular Movies
        </h2>
        {isLoadingPopular ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
              {popularMovies?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )}
      </>
    </div>
  );
}
