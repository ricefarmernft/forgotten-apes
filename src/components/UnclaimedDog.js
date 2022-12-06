import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { useGetDogApeQuery } from "../services/etherscanApi";
import useSetClaimed from "../functions/useSetClaimed";
import useSetUnclaimed from "../functions/useSetUnclaimed";
import useIdFilter from "../functions/useIdFilter";
import TitleMain from "./subcomponents/TitleMain";
import ApesMain from "./subcomponents/ApesMain";
import SortMain from "./subcomponents/SortMain";

const { Content } = Layout;

const UnclaimedDog = () => {
  const [claimedDogs, setClaimedDogs] = useState();
  const [unclaimedDogs, setUnclaimedDogs] = useState();

  const [searchTerm, setSearchTerm] = useState();

  const { data, isFetching } = useGetDogApeQuery();

  // Total unclaimed apes
  const totalApes = 10000 - claimedDogs?.length;

  //  Set Claimed Dogs
  useSetClaimed(data, 3, setClaimedDogs);

  //   Set Unclaimed Dogs
  useSetUnclaimed(claimedDogs, setUnclaimedDogs);

  //   Filter apes by ID
  useIdFilter(claimedDogs, setUnclaimedDogs, searchTerm);

  if (isFetching) return "Loading...";

  return (
    <Content>
      <TitleMain number={totalApes} setSearchTerm={setSearchTerm}>
        {totalApes} apes never claimed their Bored Ape Kennel Club dog.
      </TitleMain>
      <SortMain setUnclaimed={setUnclaimedDogs} unclaimed={unclaimedDogs} />
      <ApesMain unclaimed={unclaimedDogs} />
    </Content>
  );
};

export default UnclaimedDog;
