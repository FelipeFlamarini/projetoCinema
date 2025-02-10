import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
} from "@/lib/api-types";

interface WatchlistButtonProps {
  movie: any;
  variant?: "default" | "secondary";
}

export function WatchlistButton({
  movie,
  variant = "default",
}: WatchlistButtonProps) {
  const { toast } = useToast();
  const [isInList, setIsInList] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsInList(isInWatchlist(movie.id));
  }, [movie.id]);

  const toggleWatchlist = () => {
    setIsPending(true);
    try {
      if (isInList) {
        removeFromWatchlist(movie.id);
        toast({
          title: "Removed from watchlist",
          description: `${movie.title} has been removed from your watchlist.`,
        });
      } else {
        addToWatchlist(movie);
        toast({
          title: "Added to watchlist",
          description: `${movie.title} has been added to your watchlist.`,
        });
      }
      setIsInList(!isInList);
    } catch {
      toast({
        title: "Error",
        description: "Failed to update watchlist.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      variant={variant}
      onClick={(e) => {
        e.stopPropagation();
        toggleWatchlist();
      }}
      className="gap-2"
      disabled={isPending}
    >
      {isInList ? (
        <BookmarkCheck className="w-4 h-4" />
      ) : (
        <Bookmark className="w-4 h-4" />
      )}
      {isInList ? "Na watchlist" : "Adicionar à watchlist"}
    </Button>
  );
}
