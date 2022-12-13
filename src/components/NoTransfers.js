import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import useIdFilter from "../functions/useIdFilter";
import TitleMain from "./subcomponents/TitleMain";
import ApesMain from "./subcomponents/ApesMain";
import SortMain from "./subcomponents/SortMain";
import getRandomApes from "../functions/getRandomApes";
import Loader from "./subcomponents/Loader";
import SearchMain from "./subcomponents/SearchMain";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import {
  useGetPastHoldersQuery,
  useGetCurrentHoldersQuery,
} from "../services/alchemyApi";

const web3 = new createAlchemyWeb3(
  "https://eth-mainnet.g.alchemy.com/v2/weAIDXHKw7995TqqNVUtFtLATPvXpYhz"
);

const { Content } = Layout;

const NoTransfers = () => {
  const [loading, setLoading] = useState(true);

  const [untransferredApes, setUntransferredApes] = useState();
  const [filteredApes, setFilteredApes] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [totalApes, setTotalApes] = useState();

  const lastApeBlock = 12347249;

  const { data: current, isFetching: currentFetching } =
    useGetCurrentHoldersQuery();
  const { data: past, isFetching: pastFetching } =
    useGetPastHoldersQuery(lastApeBlock);

  useEffect(() => {
    if (current && past) {
    // Find all ape wallets at the end of the BAYC mint
    let pastArray = [];
    const pastOwner = past?.ownerAddresses?.map(
      ({ ownerAddress, tokenBalances }) =>
        tokenBalances.map(({ tokenId }) =>
          pastArray.push(ownerAddress + tokenId)
        )
    );
    // Find current ape wallets
    let currentArray = [];
    const currentOwner = current?.ownerAddresses?.map(
      ({ ownerAddress, tokenBalances }) =>
        tokenBalances.map(({ tokenId }) =>
          currentArray.push(ownerAddress + tokenId)
        )
    );
    // Match current and past ape wallets to see if they are the same
    const matchingArray = currentArray.filter((value) =>
      pastArray.includes(value)
    );
    // If wallets match, then ape is still owned by original minter
    const apeNumbers = matchingArray.map((array) =>
      web3.utils.hexToNumber(array.substring(42))
    );
    setFilteredApes(apeNumbers);
    setTotalApes(apeNumbers.length);
    setUntransferredApes(getRandomApes(apeNumbers));
    }
  }, [current, past]);

  // Set loader to false
  useEffect(() => {
    if (untransferredApes) {
      setLoading(false);
    }
  }, [untransferredApes]);

  // Filter apes by ID
  useIdFilter(filteredApes, setUntransferredApes, searchTerm, true);

  return (
    <Content>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TitleMain number={totalApes} >
            {totalApes} apes are in the same wallet that minted them.
          </TitleMain>
          <SearchMain setSearchTerm={setSearchTerm} />

          <SortMain
            setUnclaimed={setUntransferredApes}
            unclaimed={untransferredApes}
          />
          <ApesMain unclaimed={untransferredApes} />
        </>
      )}
    </Content>
  );
};

export default NoTransfers;
