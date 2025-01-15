export function useFavorite() {
  const [favorite, setFavorite] = useState<number[]>([]);

  function addFavorite(id: number) {
    setFavorite([...favorite, movie]);
  }

  function removeFavorite(id: number) {
    setFavorite(favorite.filter((movie) => movie.id !== id));
  }

  return { favorite, addFavorite, removeFavorite };
}
