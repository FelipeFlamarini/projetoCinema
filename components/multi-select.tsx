import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { useGetGenres } from "@/hooks/use-genres";
// import { Input } from "postcss";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

export type Genres = {
  id: number,
  name: string
}

interface MultiSelectProps {
  onChange: (value: Option[]) => void;
  className?: string;
  disabled?: boolean;
}


export function MultiSelect({ onChange, className,disabled}: MultiSelectProps) {
  const { data, isLoading } = useGetGenres()
  const [genres, setGenres] = useState<Option[] | null>(null)
  // console.log(genres)

  useEffect(() => {
    if (!isLoading && data) {
      // console.log(data)
      const mappedGenres = data.map((genre: Genres) => ({
        value: genre.id,
        label: genre.name,
      }));
      setGenres(mappedGenres);
    }
  }, [isLoading, data]);


  return (
    <>
      {(!isLoading && genres) && (
        <MultipleSelector
          maxSelected={4}
          commandProps={{
            label: "Escolha a Categorias",
          }}
          defaultOptions={genres}
          placeholder="Escolha a Categorias"
          emptyIndicator={<p className="text-center text-sm">Sem Categorias Encontradas</p>
          }
          onChange={onChange}
          className={className}
          disabled={disabled}
        />
      )}
      {
        isLoading && (
          <Input placeholder="Buscando Categorias..." className={cn("bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed px-3 py-2 w-[60rem] block")} disabled></Input>
        )
      }
    </>
  );
}
