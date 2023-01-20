import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import {
  useGetDogApeQuery,
  useGetSewerApeBakcQuery,
  useGetSewerMutantBakcQuery,
} from "../services/etherscanApi";
import { useSetClaimed, getRandomApes } from "../functions/functions";
import {
  TitleMain,
  BakcMain,
  SearchMain,
  SortMain,
  Loader,
  ErrorMsg,
} from "./subcomponents/subcomponents";
import web3 from "web3";

const { Content } = Layout;

const BakcSewer = () => {
  const [loading, setLoading] = useState(true);

  const [allDogs, setAllDogs] = useState();
  const [apeDogs, setApeDogs] = useState();
  const [mutantDogs, setMutantDogs] = useState();

  const [sewerClaimed, setSewerClaimed] = useState();

  const [unclaimedDogs, setUnclaimedDogs] = useState();

  const [searchTerm, setSearchTerm] = useState();

  const { data: allBakc, error: dogError } = useGetDogApeQuery();

  //   Set total BAKC items
  useSetClaimed(allBakc, 3, setAllDogs);

  const { data: apeBakc, error: apeError } = useGetSewerApeBakcQuery();
  const { data: mutantBakc, error: mutantError } = useGetSewerMutantBakcQuery();

  //   Set claimed BAKC sewer pass function
  function useSetBakcClaimed(data, setDog) {
    useEffect(() => {
      const findHex = data?.result?.map((entry) => entry.data);
      const number = findHex?.map((hex) => web3.utils.hexToNumber(hex));
      setDog(number);
    }, [data]);
  }

  // Set claimed BAKC sewer pass
  useSetBakcClaimed(apeBakc, setApeDogs);
  useSetBakcClaimed(mutantBakc, setMutantDogs);

  //   Set total BAKC sewer pass
  useEffect(() => {
    if (apeDogs && mutantDogs) {
      setSewerClaimed([...apeDogs, ...mutantDogs]);
    }
  }, [apeDogs, mutantDogs]);

  //   Set total BAKC unclaimed sewer pass
  useEffect(() => {
    if (allDogs && sewerClaimed) {
      let unclaimedBakc = allDogs.filter((dog) => {
        return !sewerClaimed.includes(dog);
      });
      setUnclaimedDogs(getRandomApes(unclaimedBakc));
      setLoading(false);
    }
  }, [sewerClaimed]);

  // Filter dogs by ID
  useEffect(() => {
    if (sewerClaimed) {
      const differences = allDogs.filter(
        (dogs) => !sewerClaimed?.includes(dogs)
      );
      const sorted = differences.sort((a, b) => a - b);
      const filteredDogs = sorted?.filter((dog) =>
        String(dog).includes(searchTerm)
      );
      setUnclaimedDogs(filteredDogs);
    }
  }, [searchTerm]);

  // Total unclaimed dogs
  const totalDogs = 10000 - sewerClaimed?.length;

  //   useEffect(() => {
  //     console.log(unclaimedDogs);
  //   }, [unclaimedDogs]);

  if (dogError || apeError || mutantError) return <ErrorMsg />;

  return (
    <Content>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TitleMain number={totalDogs}>
            {totalDogs} dogs have not claimed their Sewer Pass. (Please be
            patient, there is a lot of data to load!)
          </TitleMain>
          <SearchMain setSearchTerm={setSearchTerm} />
          <SortMain setUnclaimed={setUnclaimedDogs} unclaimed={unclaimedDogs} />
          <BakcMain
            unclaimed={unclaimedDogs}
            setLoading={setLoading}
            loading={loading}
          ></BakcMain>
        </>
      )}
    </Content>
  );
};

export default BakcSewer;
