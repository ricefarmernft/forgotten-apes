export default function getLowToHighApes(array, count) {
    const lowToHighApes = [...array];

    lowToHighApes.sort((a, b) => a - b)
    return lowToHighApes.slice(0, count);
  };