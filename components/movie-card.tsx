import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Clock, PlayCircle } from "lucide-react";
import { MovieDialog } from "./movie-dialog";
import { WatchlistButton } from "./watchlist-button";
import Image from "next/image";
import type { Movie } from "@/lib/interfaces";

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

export function MovieCard({ movie, className }: MovieCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Card
        className={`bg-background/5 border-0 cursor-pointer transition-transform hover:scale-105 max-w-xs min-w-64 ${className}`}
        onClick={() => setShowDetails(true)}
      >
        <AspectRatio ratio={2 / 3}>
          {movie.poster_path ? (
            <Image
              src={movie.poster_path}
              alt={movie.title}
              width={500}
              height={750}
              className="object-cover w-full h-full rounded-t-lg"
            />
          ) : (
            <div className="w-full h-full bg-muted/20 flex items-center justify-center rounded-t-lg">
              No poster available
            </div>
          )}
        </AspectRatio>
        <CardContent className="space-y-3 pt-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-xl text-white truncate max-w-full">
              {movie.title}
            </h3>
            {movie.vote_average !== undefined && (
              <div className="flex items-center bg-yellow-500/20 px-2 py-1 rounded">
                <span className="text-yellow-500 font-bold">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>

          <div className="flex gap-2 flex-col">
            <WatchlistButton movie={movie} variant="secondary" />
            <Button
              variant="secondary"
              className="flex-1 bg-white/10 hover:bg-white/20 text-white"
              onClick={(e: Event) => {
                e.stopPropagation();
                window.open(
                  `https://www.youtube.com/results?search_query=${encodeURIComponent(
                    movie.title + " trailer"
                  )}`
                );
              }}
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              Assistir trailer
            </Button>
          </div>
        </CardContent>
      </Card>

      <MovieDialog
        movie={movie}
        open={showDetails}
        onOpenChange={setShowDetails}
      />
    </>
  );
}
