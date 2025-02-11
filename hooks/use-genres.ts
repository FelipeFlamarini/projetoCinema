import { getGenres } from "@/apis/tmdb";
import { useQuery } from "@tanstack/react-query";

export function useGetGenres() {
  return useQuery({ queryKey: ['genres'], queryFn: () => getGenres() })
}

