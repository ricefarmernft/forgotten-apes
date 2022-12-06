import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { useGetOthersideApeQuery } from "../services/etherscanApi";
import useSetClaimed from "../functions/useSetClaimed";
import useIdFilter from "../functions/useIdFilter";
import TitleMain from "./subcomponents/TitleMain";
import ApesMain from "./subcomponents/ApesMain";
import SortMain from "./subcomponents/SortMain";
import getRandomApes from "../functions/getRandomApes";

const { Content } = Layout;

const UnclaimedOtherside = () => {
  const [yugaClaimedOtherside, setYugaClaimedOtherside] = useState();
  const [unclaimedOtherside, setUnclaimedOtherside] = useState();
  const [totalApes, setTotalApes] = useState();

  const [searchTerm, setSearchTerm] = useState();

  const { data, isFetching } = useGetOthersideApeQuery();

  //   Set Yuga Otherside claims
  useSetClaimed(data, 3, setYugaClaimedOtherside);

  //   Filter out Mutant Land, set only Ape Land 0-10,000
  useEffect(() => {
    if (yugaClaimedOtherside) {
      const unclaimedApes = yugaClaimedOtherside?.filter((ape) => ape < 10000);
      setTotalApes(unclaimedApes?.length);
      setUnclaimedOtherside(getRandomApes(unclaimedApes));
    }
  }, [yugaClaimedOtherside]);

  //   Filter apes by Id
  useIdFilter(yugaClaimedOtherside, setUnclaimedOtherside, searchTerm, true);

  if (isFetching) return "Loading...";

  return (
    <Content>
      <TitleMain number={totalApes} setSearchTerm={setSearchTerm}>
        {totalApes} apes never claimed their Otherside land.
      </TitleMain>
      <SortMain
        setUnclaimed={setUnclaimedOtherside}
        unclaimed={unclaimedOtherside}
      />
      <ApesMain unclaimed={unclaimedOtherside} />
    </Content>
  );
};

export default UnclaimedOtherside;
