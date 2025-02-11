import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { useGetGenres } from "@/hooks/use-genres";
// import { Input } from "postcss";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export type Genres = {
  id: number;
  name: string;
};

interface MultiSelectProps {
  onChange: (value: Option[]) => void;
  className?: string;
  disabled?: boolean;
}

export function MultiSelect({
  onChange,
  className,
  disabled,
}: MultiSelectProps) {
  const { data, isLoading } = useGetGenres();
  const [genres, setGenres] = useState<Option[] | null>(null);
  const { toast } = useToast();
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
      {!isLoading && genres && (
        <MultipleSelector
          maxSelected={4}
          onMaxSelected={() => {
            toast({
              description: "Máximo de 4 categorias selecionadas",
              title: "Limite de categorias atingido",
            });
          }}
          commandProps={{
            label: "Escolha as categorias",
          }}
          defaultOptions={genres}
          placeholder="Escolha a categorias"
          emptyIndicator={
            <p className="text-center text-sm">Nenhuma categoria selecionada</p>
          }
          hidePlaceholderWhenSelected={true}
          onChange={onChange}
          className={className}
          disabled={disabled}
        />
      )}
      {isLoading && (
        <Input
          placeholder="Buscando Categorias..."
          className={cn(
            "bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed px-3 py-2 w-[60rem] block"
          )}
          disabled
        ></Input>
      )}
    </>
  );
}
