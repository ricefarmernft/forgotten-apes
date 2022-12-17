import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { useGetCurrentHoldersQuery } from "../services/alchemyApi";
import {
  useGetApecoinApeQuery,
  useGetOthersideApeQuery,
} from "../services/etherscanApi";
import {
  useSetClaimed,
  useSetUnclaimed,
  useIdFilter,
  getRandomApes,
} from "../functions/functions";
import {
  TitleMain,
  ApesMain,
  SearchMain,
  SortMain,
  Loader,
  ErrorMsg,
} from "./subcomponents/subcomponents";
import { LostApeWallets } from "./components";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const web3 = new createAlchemyWeb3(
  "https://eth-mainnet.g.alchemy.com/v2/weAIDXHKw7995TqqNVUtFtLATPvXpYhz"
);

const { Content } = Layout;
const lastOthersideBlock = 14680891;

const LostApes = () => {
  const [loading, setLoading] = useState(true);

  const [claimedApes, setClaimedApes] = useState();
  const [unclaimedApes, setUnclaimedApes] = useState();

  const [yugaClaimedOtherside, setYugaClaimedOtherside] = useState();
  const [unclaimedOtherside, setUnclaimedOtherside] = useState();

  const [matchingApes, setMatchingApes] = useState();

  const [matchingAddresses, setMatchingAddresses] = useState([]);
  const [matchingTokensAddresses, setMatchingTokensAddresses] = useState([]);
  const [inactiveAddresses, setInactiveAddresses] = useState([]);

  const [lostApes, setLostApes] = useState();
  const [lostApesTable, setLostApesTable] = useState();

  const [searchTerm, setSearchTerm] = useState();
  const [filteredApes, setFilteredApes] = useState();
  const [totalApes, setTotalApes] = useState();

  const { data: apecoin, error: apecoinError } =
    useGetApecoinApeQuery();
  const { data: otherside, error: othersideError } =
    useGetOthersideApeQuery();

  //  Set Claimed apecoin Apes
  useSetClaimed(apecoin, 1, setClaimedApes);
  // Set Unclaimed apecoin Apes
  useSetUnclaimed(claimedApes, setUnclaimedApes);

  //   Set Yuga Otherside claims
  useSetClaimed(otherside, 3, setYugaClaimedOtherside);
  //   Filter out Mutant Land, set only Ape Land 0-10,000
  useEffect(() => {
    if (yugaClaimedOtherside) {
      const unclaimedOthersideApes = yugaClaimedOtherside?.filter(
        (ape) => ape < 10000
      );
      setUnclaimedOtherside(unclaimedOthersideApes);
    }
  }, [yugaClaimedOtherside]);

  //   Filter apes with unclaimed $ape and unclaimed otherside
  useEffect(() => {
    if (unclaimedApes && unclaimedOtherside) {
      let matchingData = unclaimedApes.filter((element) =>
        unclaimedOtherside.includes(element)
      );
      // Sort matching apes low to high
      matchingData?.sort((a, b) => a - b);
      setMatchingApes(matchingData);
    }
  }, [unclaimedApes, unclaimedOtherside]);
  // Fetch current Ape holders
  const { data: currentHolders, error: currentError } =
    useGetCurrentHoldersQuery();

  //
  useEffect(() => {
    const tokenHex = [];
    const hexBegin =
      "0x000000000000000000000000000000000000000000000000000000000000";

    matchingApes?.map((number) =>
      tokenHex.push(
        // Convert number to 4 digit hex
        hexBegin + web3.utils.numberToHex(number).substring(2).padStart(4, "0")
      )
    );

    const hexAddress = [];
    const hexTokenAddress = [];
    // Extract wallet addresses and token ID in each wallet address
    currentHolders?.ownerAddresses?.map(({ ownerAddress, tokenBalances }) =>
      tokenBalances.map(({ tokenId }) =>
        tokenHex.filter((element) => {
          if (tokenId?.includes(element)) {
            // Push wallet addresses into an array
            hexAddress.push(ownerAddress);
            let token = web3.utils.hexToNumber(tokenId);
            // Push wallet addresses and token ID into an array
            hexTokenAddress.push({ token: token, address: ownerAddress });
          }
        })
      )
    );
    setMatchingTokensAddresses(hexTokenAddress);

    // Remove duplicate wallet addresses
    let uniqueHexAddress = [];
    hexAddress.forEach((address) => {
      if (!uniqueHexAddress.includes(address)) {
        uniqueHexAddress.push(address);
      }
    });
    setMatchingAddresses(uniqueHexAddress);
  }, [matchingApes]);

  useEffect(() => {
    if (matchingAddresses) {
      const inactiveAddressArr = [];
      // Get transaction count for wallet addresses
      const promises = matchingAddresses?.map((address) => {
        const allTx = web3.eth.getTransactionCount(address).then();

        const beforeTx = web3.eth
          .getTransactionCount(address, lastOthersideBlock)
          .then();
        // Get transaction count for wallet addresses between lastOthersideBlock and most recent Block
        async function getTransactionCount() {
          const allTxs = await allTx;
          const beforeTxs = await beforeTx;
          // If there are no recent transactions, add it to the inactiveAddressArr array
          if (allTxs - beforeTxs === 0) {
            inactiveAddressArr.push(address);
          }
        }

        return getTransactionCount();
      });
      //   Set inactiveAddresses once all promises have returned
      Promise.all(promises).then(() => {
        setInactiveAddresses(inactiveAddressArr);
      });
    }
  }, [matchingAddresses]);

  useEffect(() => {
    // Filter out active addresses
    if (inactiveAddresses) {
      const finalApes = matchingTokensAddresses?.filter(
        ({ token, address }) => {
          if (inactiveAddresses?.includes(address)) {
            return [token, address];
          }
        }
      );
      setLostApesTable(finalApes);

      let lostApesArray = [];
      // Add ape ID numbers to lostApesArray
      finalApes.map(({ token }) => {
        lostApesArray.push(token);
      });
      setTotalApes(lostApesArray.length);
      setFilteredApes(lostApesArray);
      setLostApes(getRandomApes(lostApesArray));
    }
  }, [inactiveAddresses]);

  // Set loader to false
  useEffect(() => {
    if (totalApes) {
      setLoading(false);
    }
  }, [totalApes]);

  // Filter apes by ID
  useIdFilter(filteredApes, setLostApes, searchTerm, true);

  if (currentError || apecoinError || othersideError ) return <ErrorMsg />

  return (
    <Content>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TitleMain number={totalApes}>
            {totalApes} apes are presumed lost. Lost apes satisfy 3 criteria:
            <ul className="lost-apes-list">
              <li>Ape did not claim $APE coin</li>
              <li>Ape did not claim Otherside land</li>
              <li>
                Ethereum Address containing the Ape has had no activity since
                the Otherside mint
              </li>
            </ul>
          </TitleMain>
          <LostApeWallets table={lostApesTable} />
          <SearchMain setSearchTerm={setSearchTerm} />
          <SortMain setUnclaimed={setLostApes} unclaimed={lostApes} />
          <ApesMain unclaimed={lostApes} />
        </>
      )}
    </Content>
  );
};

export default LostApes;
