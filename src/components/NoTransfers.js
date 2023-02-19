import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import {
  useGetPastHoldersQuery,
  useGetCurrentHoldersQuery,
} from "../services/alchemyApi";
import { useIdFilter, getRandomApes } from "../functions/functions";
import {
  TitleMain,
  ApesMain,
  SearchMain,
  SortMain,
  Loader,
  ErrorMsg,
} from "./subcomponents/subcomponents";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

import { setNoTransfersCount } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

const web3 = new createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`
);

const { Content } = Layout;

const NoTransfers = () => {
  const [loading, setLoading] = useState(true);

  const [untransferredApes, setUntransferredApes] = useState();
  const [filteredApes, setFilteredApes] = useState();
  const [searchTerm, setSearchTerm] = useState();

  const dispatch = useDispatch();
  const lastApeBlock = 12347249;
  const noTransfersCount = useSelector((state) => state.noTransfersCountSlice);

  const { data: current, error: currentError } = useGetCurrentHoldersQuery();
  const { data: past, error: pastError } = useGetPastHoldersQuery(lastApeBlock);

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
      setUntransferredApes(getRandomApes(apeNumbers));
      if (noTransfersCount === 0) {
        dispatch(setNoTransfersCount(apeNumbers.length));
      }
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

  if (currentError || pastError) return <ErrorMsg />;

  return (
    <Content>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TitleMain number={noTransfersCount}>
            {noTransfersCount} apes are in the same wallet that minted them.
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
