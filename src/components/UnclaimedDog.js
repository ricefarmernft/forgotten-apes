import React, { useState, useEffect } from "react";
import { Layout, Spin } from "antd";
import { useGetDogApeQuery } from "../services/etherscanApi";
import useSetClaimed from "../functions/useSetClaimed";
import useSetUnclaimed from "../functions/useSetUnclaimed";
import useIdFilter from "../functions/useIdFilter";
import Loader from "./subcomponents/Loader";
import TitleMain from "./subcomponents/TitleMain";
import ApesMain from "./subcomponents/ApesMain";
import SortMain from "./subcomponents/SortMain";
import SearchMain from "./subcomponents/SearchMain";

const { Content } = Layout;

const UnclaimedDog = () => {
  const [loading, setLoading] = useState(true);
  const [claimedDogs, setClaimedDogs] = useState();
  const [unclaimedDogs, setUnclaimedDogs] = useState();

  const [searchTerm, setSearchTerm] = useState();

  const { data, isFetching } = useGetDogApeQuery();

  // Total unclaimed apes
  const totalApes = 10000 - claimedDogs?.length;

  //  Set Claimed Dogs
  useSetClaimed(data, 3, setClaimedDogs);

  //   Set Unclaimed Dogs
  useSetUnclaimed(claimedDogs, setUnclaimedDogs, setLoading);

  //   Filter apes by ID
  useIdFilter(claimedDogs, setUnclaimedDogs, searchTerm);

  return (
    <Content>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TitleMain number={totalApes}>
            {totalApes} apes never claimed their Bored Ape Kennel Club dog.
          </TitleMain>
          <SearchMain setSearchTerm={setSearchTerm} />
          <SortMain setUnclaimed={setUnclaimedDogs} unclaimed={unclaimedDogs} />
          <ApesMain unclaimed={unclaimedDogs} />
        </>
      )}
    </Content>
  );
};

export default UnclaimedDog;
