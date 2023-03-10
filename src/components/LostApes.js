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
  LostApeWallets,
} from "./subcomponents/subcomponents";
import { setLostApesCount } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import {
  unclaimedSewerApes,
  unclaimedOthersideApes,
  unclaimedApecoinApes,
} from "./data/lostApesData";

const web3 = new createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`
);

const { Content } = Layout;
const lastOthersideBlock = 14680891;

const LostApes = () => {
  const [loading, setLoading] = useState(true);

  const [matchingApes, setMatchingApes] = useState();

  const [matchingAddresses, setMatchingAddresses] = useState([]);
  const [matchingTokensAddresses, setMatchingTokensAddresses] = useState([]);
  const [inactiveAddresses, setInactiveAddresses] = useState([]);

  const [lostApes, setLostApes] = useState(undefined);
  const [lostApesTable, setLostApesTable] = useState();

  const [searchTerm, setSearchTerm] = useState();
  const [filteredApes, setFilteredApes] = useState();

  const dispatch = useDispatch();
  const lostApesCount = useSelector((state) => state.lostApesCountSlice);

  //   Filter apes with unclaimed $ape, unclaimed otherside, and unclaimed sewer
  useEffect(() => {
    if (unclaimedApecoinApes && unclaimedOthersideApes && unclaimedSewerApes) {
      const commonApes = getCommonApes(
        unclaimedApecoinApes,
        unclaimedOthersideApes,
        unclaimedSewerApes
      );
      setMatchingApes(commonApes);
    }
  }, []);

  // Fetch current Ape holders
  const { data: currentHolders, error: currentError } =
    useGetCurrentHoldersQuery();

  // Find Owner Addresses
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

  // Find inactive wallet addresses
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
          try {
            const allTxs = await allTx;
            const beforeTxs = await beforeTx;
            // If there are no recent transactions, add it to the inactiveAddressArr array
            if (allTxs - beforeTxs === 0) {
              inactiveAddressArr.push(address);
            }
          } catch (error) {
            console.log("Error Finding Transaction Count");
            // setPromiseError(true)
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

  // Set Lost Apes
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
      // setTotalApes(lostApesArray.length);
      if (lostApesArray.length > 0) {
        setFilteredApes(lostApesArray);
        setLostApes(getRandomApes(lostApesArray));
      }
      if (lostApesCount === 0) {
        dispatch(setLostApesCount(lostApesArray.length));
      }
    }
  }, [inactiveAddresses]);

  // Set loader to false
  useEffect(() => {
    console.log(lostApes);
    if (lostApes?.length > 0) {
      setLoading(false);
    }
  }, [lostApes]);

  // Filter apes by ID
  useIdFilter(filteredApes, setLostApes, searchTerm, true);

  // Find apes that have unclaimed $APE, Otherside, and Sewer (Function)
  const getCommonApes = (arr1, arr2, arr3) => {
    // Sort the arrays in ascending order
    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);
    arr3.sort((a, b) => a - b);

    const commonApes = [];

    // Iterate through each number in the first array
    for (let i = 0; i < arr1.length; i++) {
      const num = arr1[i];

      // Check if the number is present in both the second and third arrays
      if (arr2.includes(num) && arr3.includes(num)) {
        // Add the number to the array of common numbers
        commonApes.push(num);
      }
    }
    return commonApes;
  };

  if (currentError) return <ErrorMsg />;

  return (
    <Content>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TitleMain number={lostApesCount}>
            {lostApesCount} apes are presumed lost. Lost apes satisfy 4
            criteria:
            <ul className="lost-apes-list">
              <li>Ape did not claim $APE coin</li>
              <li>Ape did not claim Otherside land</li>
              <li>Ape did not claim Sewer Pass</li>
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
