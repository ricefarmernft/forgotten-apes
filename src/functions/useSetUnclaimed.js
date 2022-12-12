import { useEffect } from "react";
import getRandomApes from "./getRandomApes";

// Set Apes that have not claimed (data)
export default function useSetUnclaimed(claimed, setUnclaim, setLoading) {
  useEffect(() => {
    // Create array 0-10,000
    const array = [];
    for (let i = 0; i < 10000; i++) {
      array[i] = i;
    }
    // Filter array by unclaimed apes
    if (claimed) {
      const apeDifferences = array.filter((apes) => !claimed?.includes(apes));
      //   Set unclaimed apes (random)
      setUnclaim(getRandomApes(apeDifferences));
    }
    return () => {
      if (setLoading) setLoading(false);
    };
  }, [claimed]);
}
