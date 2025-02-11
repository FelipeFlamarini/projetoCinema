// import { filterMovies } from "@/apis/tmdb";
import { Filter } from "@/apis/tmdb";
import { useQuery } from "@tanstack/react-query";
import { filterMovies } from "@/apis/tmdb";

export function useFilteredMovies(query:Filter) {
  console.log("assa")
  return useQuery({ queryKey: ['filteredMovies',query], queryFn: () => filterMovies(query) })
}

