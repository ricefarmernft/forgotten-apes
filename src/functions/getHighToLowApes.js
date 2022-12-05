export default function getHighToLowApes(array, count) {
    const highToLowApes = [...array];

    highToLowApes.sort((a, b) => b - a)
    return highToLowApes.slice(0, count);
  };