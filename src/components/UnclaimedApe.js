import React, { useState } from "react";
import { Layout } from "antd";
import { useGetApecoinApeQuery } from "../services/etherscanApi";
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

const UnclaimedApe = () => {
  const [loading, setLoading] = useState(true);
  const [claimedApes, setClaimedApes] = useState();
  const [unclaimedApes, setUnclaimedApes] = useState();

  const [searchTerm, setSearchTerm] = useState();

  const { data, error } = useGetApecoinApeQuery();

  // Total unclaimed apes
  const totalApes = 10000 - claimedApes?.length;

  //  Set Claimed Apes
  useSetClaimed(data, 1, setClaimedApes);

  // Set Unclaimed Apes
  useSetUnclaimed(claimedApes, setUnclaimedApes, setLoading);

  // Filter apes by ID
  useIdFilter(claimedApes, setUnclaimedApes, searchTerm);

  if (error) return <ErrorMsg />;

  return (
    <Content>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TitleMain number={totalApes}>
            {totalApes} apes never claimed their Apecoin airdrop.
          </TitleMain>
          <SearchMain setSearchTerm={setSearchTerm} />
          <SortMain setUnclaimed={setUnclaimedApes} unclaimed={unclaimedApes} />
          <ApesMain unclaimed={unclaimedApes}></ApesMain>
        </>
      )}
    </Content>
  );
};

export default UnclaimedApe;
