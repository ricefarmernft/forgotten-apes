import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { useGetApecoinApeQuery } from "../services/etherscanApi";
import useSetClaimed from "../functions/useSetClaimed";
import useSetUnclaimed from "../functions/useSetUnclaimed";
import useIdFilter from "../functions/useIdFilter";
import TitleMain from "./subcomponents/TitleMain";
import ApesMain from "./subcomponents/ApesMain";
import SortMain from "./subcomponents/SortMain";
import Loader from "./subcomponents/Loader";

const { Content } = Layout;

const UnclaimedApe = () => {
  const [loading, setLoading] = useState(true);
  const [claimedApes, setClaimedApes] = useState();
  const [unclaimedApes, setUnclaimedApes] = useState();

  const [searchTerm, setSearchTerm] = useState();

  const { data, isFetching } = useGetApecoinApeQuery();

  // Total unclaimed apes
  const totalApes = 10000 - claimedApes?.length;

  //  Set Claimed Apes
  useSetClaimed(data, 1, setClaimedApes);

  // Set Unclaimed Apes
  useSetUnclaimed(claimedApes, setUnclaimedApes, setLoading);

  // Filter apes by ID
  useIdFilter(claimedApes, setUnclaimedApes, searchTerm);

  return (
    <Content>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TitleMain number={totalApes} setSearchTerm={setSearchTerm}>
            {totalApes} apes never claimed their Apecoin airdrop.
          </TitleMain>
          <SortMain setUnclaimed={setUnclaimedApes} unclaimed={unclaimedApes} />
          <ApesMain unclaimed={unclaimedApes}></ApesMain>
        </>
      )}
    </Content>
  );
};

export default UnclaimedApe;
