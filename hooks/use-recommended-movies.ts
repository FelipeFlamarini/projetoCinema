import { useMutation } from "@tanstack/react-query";

import { searchGeminiMovies } from "@/apis/movies";

export function useRecommendedMovies() {
  return useMutation({
    mutationFn: (query: string) => searchGeminiMovies(query),
    mutationKey: "recommendedMovies",
  });
}
