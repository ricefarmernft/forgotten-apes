import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import {
  useGetCurrentHoldersQuery,
  useGetPastHoldersQuery,
} from "./services/alchemyApi";
import {
  useGetApecoinApeQuery,
  useGetOthersideApeQuery,
} from "./services/etherscanApi";
import {
  useSetClaimed,
  useSetUnclaimed,
  getRandomApes,
} from "./functions/functions";
import {
  Navbar,
  Home,
  LostApes,
  UnclaimedApe,
  UnclaimedDog,
  UnclaimedOtherside,
  BurnedApes,
  NoTransfers,
  ApeDetails,
  Footers,
} from "./components/components";
import { ErrorMsg } from "./components/subcomponents/subcomponents";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
const web3 = new createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`
);

const { Content } = Layout;
const lastOthersideBlock = 14680891;
const lastApeBlock = 12347249;

function App() {
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
  const [totalLostApes, setTotalLostApes] = useState();

  const [totalNoTransfer, setTotalNoTransfer] = useState();

  // Find No Transfers Count
  const { data: current, error: currentsError } = useGetCurrentHoldersQuery();
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
      setTotalNoTransfer(apeNumbers.length);
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
      // setLostApesTable(finalApes);

      let lostApesArray = [];
      // Add ape ID numbers to lostApesArray
      finalApes.map(({ token }) => {
        lostApesArray.push(token);
      });
      setTotalLostApes(lostApesArray.length);
      // setFilteredApes(lostApesArray);
      setLostApes(getRandomApes(lostApesArray));
    }
  }, [inactiveAddresses]);

  // Set loader to false
  useEffect(() => {
    if (totalLostApes) {
      setLoading(false);
    }
  }, [totalLostApes]);

  if (currentError || apecoinError || othersideError || currentsError || pastError) return <ErrorMsg />;

  return (
    <>
      <Layout>
        <Navbar />
        <Content>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  totalLostApes={totalLostApes}
                  lostApes={lostApes}
                  loading={loading}
                  totalNoTransfer={totalNoTransfer}
                />
              }
            ></Route>
            <Route exact path="/lost-apes" element={<LostApes />}></Route>
            <Route
              exact
              path="/unclaimed-ape"
              element={<UnclaimedApe />}
            ></Route>
            <Route
              exact
              path="/unclaimed-dog"
              element={<UnclaimedDog />}
            ></Route>
            <Route
              exact
              path="/unclaimed-otherside"
              element={<UnclaimedOtherside />}
            ></Route>
            <Route exact path="/no-transfers" element={<NoTransfers />}></Route>
            <Route exact path="/burned-apes" element={<BurnedApes />}></Route>
            <Route exact path="/ape/:ape" element={<ApeDetails />}></Route>
          </Routes>
        </Content>
        <Footers />
      </Layout>
    </>
  );
}

export default App;
