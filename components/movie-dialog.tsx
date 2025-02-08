import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, PlayCircle, Star } from "lucide-react";
import type { Movie } from "@shared/schema";
import { WatchlistButton } from "./watchlist-button";

interface MovieDialogProps {
  movie: Movie;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MovieDialog({ movie, open, onOpenChange }: MovieDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-gray-950/95 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {movie.title}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-[300px_1fr]">
          <AspectRatio ratio={2 / 3}>
            {movie.posterPath ? (
              <img
                src={movie.posterPath}
                alt={movie.title}
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <div className="w-full h-full bg-white/5 flex items-center justify-center rounded-lg">
                No poster available
              </div>
            )}
          </AspectRatio>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-bold text-yellow-500">
                  {movie.voteAverage.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Clock className="w-4 h-4" />
                <span>{new Date(movie.releaseDate).getFullYear()}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Badge
                  key={genre}
                  variant="secondary"
                  className="bg-white/10 text-white hover:bg-white/20"
                >
                  {genre}
                </Badge>
              ))}
            </div>

            <p className="text-white/80 leading-relaxed">{movie.overview}</p>

            <div className="flex gap-2">
              <WatchlistButton movie={movie} variant="secondary" />
              <Button
                variant="secondary"
                className="flex-1 bg-white/10 hover:bg-white/20 text-white"
                onClick={() =>
                  window.open(
                    `https://www.youtube.com/results?search_query=${encodeURIComponent(
                      movie.title + " trailer"
                    )}`
                  )
                }
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                Assistir trailer
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
