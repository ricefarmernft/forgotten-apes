import { useEffect } from "react";

// Sort Apes by ID
export default function useIdFilter( claimed, setUnclaimed ,searchTerm ,reverse ) {
  // Create array 0-10,000
  useEffect(() => {
    const array = [];
    for (let i = 0; i < 10000; i++) {
      array[i] = i;
    }
    // Filter array by claimed apes
    if (claimed && reverse) {
      const differences = array.filter((apes) => claimed?.includes(apes));
      //   Filter apes by ID
      const filteredApes = differences?.filter((ape) =>
        String(ape).includes(searchTerm)
      );
      setUnclaimed(filteredApes);
      // Filter array by unclaimed apes
    } else if (claimed) {
      const differences = array.filter((apes) => !claimed?.includes(apes));
      //   Filter apes by ID
      const filteredApes = differences?.filter((ape) =>
        String(ape).includes(searchTerm)
      );
      setUnclaimed(filteredApes);
    }
  }, [searchTerm]);
}
