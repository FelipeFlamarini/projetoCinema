import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, PlayCircle, Star } from "lucide-react";
import { WatchlistButton } from "./watchlist-button";
import Image from "next/image";
import type { Movie } from "@/lib/interfaces";
import { ScrollArea } from "./ui/scroll-area";

interface MovieDialogProps {
  movie: Movie;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MovieDialog({ movie, open, onOpenChange }: MovieDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-screen bg-gray-950/95 text-white border-gray-800">
        <ScrollArea className="max-h-screen pr-3 sm:pr-0">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {movie.title}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-[250px_1fr]">
            <AspectRatio ratio={2 / 3}>
              {movie.poster_path ? (
                <Image
                  src={movie.poster_path}
                  alt={movie.title}
                  className="object-cover w-full h-full rounded-lg"
                  fill
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
                    {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
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
              <DialogFooter className="flex gap-2 pb-10 sm:pb-0">
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
              </DialogFooter>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
