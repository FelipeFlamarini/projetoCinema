export function useWantingToWatch() {
  const [wantingToWatch, setWantingToWatch] = useState<number[]>([]);

  function addWantingToWatch(id: number) {
    setWantingToWatch([...wantingToWatch, id]);
  }

  function removeWantingToWatch(id: number) {
    setWantingToWatch(wantingToWatch.filter((movie) => movie !== id));
  }

  return { wantingToWatch, addWantingToWatch, removeWantingToWatch };
}
