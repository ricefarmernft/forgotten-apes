import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { useGetNftsQuery } from "../services/alchemyApi";
import { useIdFilter } from "../functions/functions";
import {
  TitleMain,
  ApesMain,
  SearchMain,
  SortMain,
  Loader,
} from "./subcomponents/subcomponents";

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const web3 = new createAlchemyWeb3(
  "https://eth-mainnet.g.alchemy.com/v2/weAIDXHKw7995TqqNVUtFtLATPvXpYhz"
);

const { Content } = Layout;

const BurnedApes = () => {
  const [loading, setLoading] = useState(true);

  const [burnedApes, setBurnedApes] = useState();
  const [filteredApes, setFilteredApes] = useState();
  const [searchTerm, setSearchTerm] = useState();

  const { data: dead } = useGetNftsQuery(
    "0x000000000000000000000000000000000000dead"
  );
  const { data: zero } = useGetNftsQuery(
    "0x0000000000000000000000000000000000000000"
  );

  //   Set Burned and Filtered apes
  useEffect(() => {
    const array = [];

    // Return ape ID's in first burn address
    const deadNfts = dead?.ownedNfts?.map((token) =>
      web3.utils.hexToNumber(token?.id?.tokenId)
    );
    const deadNftsArray = array.concat(deadNfts);
    setBurnedApes(deadNfts);
    setFilteredApes(deadNftsArray);

    // Return ape ID's in second burn address (if any)
    if (zero?.totalCount > 0) {
      const zeroNfts = zero?.ownedNfts?.map((token) =>
        web3.utils.hexToNumber(token?.id?.tokenId)
      );
      const finalArray = deadNftsArray.concat(zeroNfts);
      setBurnedApes(finalArray);
      setFilteredApes(finalArray);
    }
  }, [dead, zero]);

  //   Set Total Apes Burned
  const totalApes = dead?.totalCount + zero?.totalCount;

  // Set loader to false
  useEffect(() => {
    if (burnedApes) {
      setLoading(false);
    }
  }, [burnedApes]);

  // Filter apes by ID
  useIdFilter(filteredApes, setBurnedApes, searchTerm, true);

  return (
    <Content>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TitleMain number={totalApes}>
            {totalApes} apes have been burned.
          </TitleMain>
          <SearchMain setSearchTerm={setSearchTerm} />

          <SortMain setUnclaimed={setBurnedApes} unclaimed={burnedApes} />
          <ApesMain unclaimed={burnedApes} />
        </>
      )}
    </Content>
  );
};

export default BurnedApes;
