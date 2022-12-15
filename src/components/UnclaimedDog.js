import React, { useState } from "react";
import { Layout } from "antd";
import { useGetDogApeQuery } from "../services/etherscanApi";
import {
  useSetClaimed,
  useSetUnclaimed,
  useIdFilter,
} from "../functions/functions";
import {
  TitleMain,
  ApesMain,
  SearchMain,
  SortMain,
  Loader,
  ErrorMsg,
} from "./subcomponents/subcomponents";

const { Content } = Layout;

const UnclaimedDog = () => {
  const [loading, setLoading] = useState(true);
  const [claimedDogs, setClaimedDogs] = useState();
  const [unclaimedDogs, setUnclaimedDogs] = useState();

  const [searchTerm, setSearchTerm] = useState();

  const { data, error } = useGetDogApeQuery();

  // Total unclaimed apes
  const totalApes = 10000 - claimedDogs?.length;

  //  Set Claimed Dogs
  useSetClaimed(data, 3, setClaimedDogs);

  //   Set Unclaimed Dogs
  useSetUnclaimed(claimedDogs, setUnclaimedDogs, setLoading);

  //   Filter apes by ID
  useIdFilter(claimedDogs, setUnclaimedDogs, searchTerm);

  if (error) return <ErrorMsg />

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
