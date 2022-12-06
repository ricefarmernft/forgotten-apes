import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { useGetApecoinApeQuery } from "../services/etherscanApi";
import { useGetNftsQuery } from "../services/alchemyApi";
import useSetClaimed from "../functions/useSetClaimed";
import useSetUnclaimed from "../functions/useSetUnclaimed";
import useIdFilter from "../functions/useIdFilter";
import TitleMain from "./subcomponents/TitleMain";
import ApesMain from "./subcomponents/ApesMain";
import SortMain from "./subcomponents/SortMain";

const { Content } = Layout;

const UnclaimedApe = () => {
  const [claimedApes, setClaimedApes] = useState();
  const [unclaimedApes, setUnclaimedApes] = useState();

  const [searchTerm, setSearchTerm] = useState();

  const { data, isFetching } = useGetApecoinApeQuery();

const {data: alchemy, isFetchings} = useGetNftsQuery('0x000000000000000000000000000000000000dead')
console.log(alchemy)

  // Total unclaimed apes
  const totalApes = 10000 - claimedApes?.length;

  //  Set Claimed Apes
  useSetClaimed(data, 1, setClaimedApes);

  // Set Unclaimed Apes
  useSetUnclaimed(claimedApes, setUnclaimedApes);

  // Filter apes by ID
  useIdFilter(claimedApes, setUnclaimedApes, searchTerm);

  if (isFetching) return "Loading...";

  return (
    <Content>
      <TitleMain number={totalApes} setSearchTerm={setSearchTerm}>
        {totalApes} apes never claimed their Apecoin airdrop.
      </TitleMain>
      <SortMain setUnclaimed={setUnclaimedApes} unclaimed={unclaimedApes} />
      <ApesMain unclaimed={unclaimedApes}></ApesMain>
    </Content>
  );
};

export default UnclaimedApe;
