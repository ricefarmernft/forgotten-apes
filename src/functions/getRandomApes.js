export default function getRandomApes(array, count) {
    const randomApes = [...array];

    randomApes.sort(() => Math.random() - 0.5);
    return randomApes.slice(0, count);
  };