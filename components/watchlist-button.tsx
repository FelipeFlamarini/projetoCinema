import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
} from "@/lib/api-types";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsInList(isInWatchlist(movie.id));
  }, [movie.id]);

  const toggleWatchlist = () => {
    setIsPending(true);
    try {
      if (isInList) {
        removeFromWatchlist(movie.id);
        toast({
          title: "Removido da watchlist",
          description: `${movie.title} foi removido da sua watchlist.`,
        });
      } else {
        addToWatchlist(movie);
        toast({
          title: "Adicionado à watchlist",
          description: `${movie.title} foi adicionado à watchlist.`,
        });
      }
      setIsInList(!isInList);
    } catch {
      toast({
        title: "Erro",
        description: "Falha ao atualizar sua watchlist.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
      queryClient.invalidateQueries("watchlist");
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
