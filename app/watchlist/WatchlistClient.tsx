"use client";
import { useQuery } from "@tanstack/react-query";
import { MovieCard } from "@/components/movie-card";
import { Loader2 } from "lucide-react";
import { getWatchlist } from "@/lib/api-types";

export default function WatchlistClient() {
  const {
    data: watchList,
    isLoading,
    isError,
  } = useQuery<any[]>({
    queryKey: ["watchlist"],
    queryFn: getWatchlist,
  });

  return (
    <div className="text-white px-10 py-10 max-w-screen-xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-white/90">
        Sua watchlist de filmes
      </h2>
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : isError ? (
        <p className="text-center text-red-500">
          Falha ao carregar a watchlist.
        </p>
      ) : (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20">
            {watchList &&
              watchList?.map((movieList) => (
                <MovieCard key={movieList.id} movie={movieList.movieData} />
              ))}

            {watchList?.length === 0 && (
              <div className="col-span-3 text-center">
                Não há filmes na sua watchlist. Que tal pesquisar e adicionar
                alguns?
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
