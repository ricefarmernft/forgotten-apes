import React, { useEffect, useState } from "react";
import { Layout, Typography } from "antd";
import {
  HomeStatistics,
  ApesMain,
  Loader,
} from "./subcomponents/subcomponents";
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import { ErrorMsg } from "./subcomponents/subcomponents";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

import {
  useGetCurrentHoldersQuery,
  useGetPastHoldersQuery,
} from "../services/alchemyApi";
import {
  useGetApecoinApeQuery,
  useGetOthersideApeQuery,
} from "../services/etherscanApi";
import {
  useSetClaimed,
  useSetUnclaimed,
  getRandomApes,
} from "../functions/functions";

import { setLostApesCount, setNoTransfersCount } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

const { Content } = Layout;
const { Text } = Typography;

const web3 = new createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`
);

const lastOthersideBlock = 14680891;
const lastApeBlock = 12347249;

const Home = (props) => {
  const [homeApes, setHomeApes] = useState();

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

  const { data: current, error: currentsError } = useGetCurrentHoldersQuery();
  const { data: past, error: pastError } = useGetPastHoldersQuery(lastApeBlock);

  const lostApesCount = useSelector((state) => state.lostApesCountSlice);
  const noTransfersCount = useSelector((state) => state.noTransfersCountSlice);
  const dispatch = useDispatch();

  // Find No Transfers Count
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
      if (noTransfersCount === 0) {
        dispatch(setNoTransfersCount(apeNumbers.length));
      }
    }
  }, [current, past]);

  // Find Lost Apes Count
  const { data: apecoin, error: apecoinError } = useGetApecoinApeQuery();
  const { data: otherside, error: othersideError } = useGetOthersideApeQuery();
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

      let lostApesArray = [];
      // Add ape ID numbers to lostApesArray
      finalApes.map(({ token }) => {
        lostApesArray.push(token);
      });
      // setFilteredApes(lostApesArray);

      if (lostApesArray.length > 0) {
        setLostApes(getRandomApes(lostApesArray));
      }

      if (lostApesCount === 0) {
        dispatch(setLostApesCount(lostApesArray.length));
      }
    }
  }, [inactiveAddresses]);

  // Set 12 apes for the homepage
  useEffect(() => {
    const lostApesTwelve = lostApes?.slice(0, 12);
    setHomeApes(lostApesTwelve);
  }, [lostApes]);

  // Set loader to false
  useEffect(() => {
    if (homeApes) {
      setLoading(false);
    }
  }, [homeApes]);

  // Set error message if there is an error
  if (
    currentError ||
    apecoinError ||
    othersideError ||
    currentsError ||
    pastError
  )
    return <ErrorMsg />;

  return (
    <Content>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <HomeStatistics
            totalLostApes={lostApesCount}
            totalNoTransfer={noTransfersCount}
          />
          <div className="home-feature">
            <Text type="secondary" className="home-link">
              <Link to="/lost-apes">
                Check out more Lost Apes <ArrowRightOutlined />
              </Link>
            </Text>
          </div>
          <ApesMain unclaimed={homeApes} />
        </>
      )}
    </Content>
  );
};

export default Home;
