"use client";
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
import { MovieCard } from "@/components/movie-card";
import { LoaderCircle } from "lucide-react";

type InputGenres = {
  value: string;
  label: string;
};

export default function FilmesClient() {
  const [selectedGenres, setSelectedGenres] = useState<InputGenres[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<string>("");
  const [params, setParams] = useState({
    genre: "",
    year: "",
    rating: ["", ""] as [string, string],
  });
  // const [numberRating, setNumberRating] = useState<[string, string]>(["", ""])
  const { data, isLoading } = useFilteredMovies(params);

  console.log(data);
  // console.log(params)
  // console.log(JSON.stringify(params, null, 2));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // console.log(JSON.stringify(selectedGenres.map((genre) => genre.value).join(","), null, 2));
    let numberRating = ["", ""] as [string, string];
    switch (selectedRating) {
      case "low":
        numberRating = ["0", "4"];
        break;
      case "medium":
        numberRating = ["4", "7"];
        break;
      case "high":
        console.log("high");
        numberRating = ["7", "10"];
        break;
      default:
        numberRating = ["", ""];
    }

    setParams({
      genre: selectedGenres.map((genre) => genre.value).join(","),
      year: selectedYear,
      rating: numberRating,
    });
  };

  const handleGenres = (genres: InputGenres[]) => {
    setSelectedGenres(genres);
  };
  const handleYear = (year: string) => {
    setSelectedYear(year);
  };

  return (
    <div className="px-10 py-10 max-w-screen-xl mx-auto space-y-8">
      <h2 className="text-xl font-semibold mb-6 text-white/90">
        Encontre o filme perfeito para sua próxima maratona
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-auto">
        <div className="flex w-full gap-2">
          <div className="w-full">
            <MultiSelect
              onChange={handleGenres}
              className="w-full"
              disabled={isLoading}
            />
          </div>
          <ComboboxYears
            onChange={handleYear}
            className="w-32 ml-auto"
            disabled={isLoading}
          />
          <Select
            onValueChange={setSelectedRating}
            value={selectedRating}
            disabled={isLoading}
          >
            <SelectTrigger className="w-32">
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
      <div className="flex justify-center">
        {!isLoading && (
          <>
            {data?.length === 0 && (
              <p className="text-center text-lg">Nenhum Filme Encontrado</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20">
              {data?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
