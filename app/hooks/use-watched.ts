export function useWatched() {
  const [watched, setWatched] = useState<number[]>([]);

  function addWatched(id: number) {
    setWatched([...watched, id]);
  }

  function removeWatched(id: number) {
    setWatched(watched.filter((movie) => movie !== id));
  }

  return { watched, addWatched, removeWatched };
}
