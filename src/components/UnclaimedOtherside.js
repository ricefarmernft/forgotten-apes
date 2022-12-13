import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { useGetOthersideApeQuery } from "../services/etherscanApi";
import {
  useSetClaimed,
  useIdFilter,
  getRandomApes,
} from "../functions/functions";
import {
  TitleMain,
  ApesMain,
  SearchMain,
  SortMain,
  Loader,
} from "./subcomponents/subcomponents";

const { Content } = Layout;

const UnclaimedOtherside = () => {
  const [loading, setLoading] = useState(true);

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
    return () => setLoading(false);
  }, [yugaClaimedOtherside]);

  //   Filter apes by Id
  useIdFilter(yugaClaimedOtherside, setUnclaimedOtherside, searchTerm, true);

  return (
    <Content>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TitleMain number={totalApes}>
            {totalApes} apes never claimed their Otherside land.
          </TitleMain>
          <SearchMain setSearchTerm={setSearchTerm} />
          <SortMain
            setUnclaimed={setUnclaimedOtherside}
            unclaimed={unclaimedOtherside}
          />
          <ApesMain unclaimed={unclaimedOtherside} />
        </>
      )}
    </Content>
  );
};

export default UnclaimedOtherside;
