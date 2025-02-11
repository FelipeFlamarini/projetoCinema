"use client"
import { useState } from "react";
import { MultiSelect } from "@/components/multi-select";
import { ComboboxYears } from "@/components/combobox-years";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useFilteredMovies } from "@/hooks/use-discover-movie";
import { QueryClient } from "@tanstack/react-query";
// import { Genres } from "@/components/multi-select";
import { MovieCard } from "@/components/movie-card";
import { LoaderCircle } from "lucide-react";

type InputGenres = {
  value: string;
  label: string;
}



export default function Filmes() {
  const [selectedGenres, setSelectedGenres] = useState<InputGenres[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<string>("");
  const [params, setParams] = useState({ genre: "", year: "", rating: ["", ""] as [string, string] });
  // const [numberRating, setNumberRating] = useState<[string, string]>(["", ""])
  const { data, isLoading } = useFilteredMovies(params);

  console.log(data);
  // console.log(params)
  // console.log(JSON.stringify(params, null, 2));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // console.log(JSON.stringify(selectedGenres.map((genre) => genre.value).join(","), null, 2));
    let numberRating = ["", ""] as [string, string]
    switch (selectedRating) {
      case "low":
        numberRating = ["0", "4"]
        break;
      case "medium":
        numberRating = ["4", "7"]
        break;
      case "high":
        console.log("high")
        numberRating = ["7", "10"]
        break;
      default:
        numberRating = ["", ""]
    }


    setParams({
      genre: selectedGenres.map((genre) => genre.value).join(","),
      year: selectedYear,
      rating: numberRating,
    })
  };

  const handleGenres = (genres: InputGenres[]) => {
    setSelectedGenres(genres);
  };
  const handleYear = (year: string) => {
    setSelectedYear(year);
  };

  return (
    <div className="container mx-auto space-y-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <MultiSelect onChange={handleGenres} className="w-[60rem]" disabled={isLoading}/>
          <ComboboxYears onChange={handleYear} className="w-full"  disabled={isLoading}/>
          <Select onValueChange={setSelectedRating} value={selectedRating} disabled={isLoading}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Notas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">⭐</SelectItem>
              <SelectItem value="medium">⭐⭐</SelectItem>
              <SelectItem value="high">⭐⭐⭐</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant={"outline"} type="submit" disabled={isLoading}>
              {isLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <span>Enviar</span>
              )}
          </Button>
      </form>
      {!isLoading && (
        <>
          {
            data?.length === 0 && (
              <p className="text-center text-lg">Nenhum Filme Encontrado</p>
            )
          }
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        </>
      )}
    </div>
  );
}