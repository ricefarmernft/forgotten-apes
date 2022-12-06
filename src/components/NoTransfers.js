import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { useGetNftsQuery } from "../services/alchemyApi";
import useIdFilter from "../functions/useIdFilter";
import TitleMain from "./subcomponents/TitleMain";
import ApesMain from "./subcomponents/ApesMain";
import SortMain from "./subcomponents/SortMain";
import Web3 from "web3";

const web3 = new Web3('https://eth-mainnet.g.alchemy.com/v2/weAIDXHKw7995TqqNVUtFtLATPvXpYhz');

const NoTransfers = () => {

    const options = {
        fromBlock: 0, // Start search from the earliest block
        toBlock: 'latest', // End search at the latest block
        address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d", // The address of the NFT contract
        topics: ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        null,
        null,
        "0x0000000000000000000000000000000000000000000000000000000000000000"
    ] // The event signature for the Transfer event
      };
    
      web3.eth.getPastLogs(options)
    .then(data => console.log(data));

  return (
    <div>NoTransfers</div>
  )
}

export default NoTransfers