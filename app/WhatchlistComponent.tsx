"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { MovieCard } from "@/components/movie-card";
import { Loader2 } from "lucide-react";
import { getWatchlist } from "@/lib/api-types";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function WatchlistComponent() {
  const {
    data: watchList,
    isLoading,
    isError,
  } = useQuery<any[]>({
    queryKey: ["watchlist"],
    queryFn: getWatchlist,
  });

  const { toast } = useToast();
  const router = useRouter();
  const [shouldCheck, setShouldCheck] = useState(false);

  useEffect(() => {
    if (!isLoading && !isError && shouldCheck) {
      if (watchList && watchList.length === 0) {
        toast({
          title: "No movies in watchlist",
          description: "You have not added any movies to your watchlist.",
        });
        router.push("/");
      }
    }
  }, [isLoading, isError, watchList, router, toast, shouldCheck]);

  useEffect(() => {
    if (!isLoading) {
      setShouldCheck(true);
    }
  }, [isLoading]);

  return (
    <div className="text-white px-10 py-10 max-w-screen-xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-white/90">
        Watchlist Movies
      </h2>
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load watchlist</p>
      ) : (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            {watchList?.map((movieList) => (
              <MovieCard key={movieList.id} movie={movieList.movieData} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
