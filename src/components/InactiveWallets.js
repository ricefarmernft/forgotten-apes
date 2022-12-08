import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { useGetNftsQuery } from "../services/alchemyApi";
import useIdFilter from "../functions/useIdFilter";
import TitleMain from "./subcomponents/TitleMain";
import ApesMain from "./subcomponents/ApesMain";
import SortMain from "./subcomponents/SortMain";
import Web3 from "web3";
import { useGetHoldersQuery } from "../services/alchemyApi";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const web3 = new createAlchemyWeb3(
  "https://eth-mainnet.g.alchemy.com/v2/weAIDXHKw7995TqqNVUtFtLATPvXpYhz"
);

const { Content } = Layout;

const InactiveWallets = () => {
    const [addresses, setAddresses] = useState(["hello"]);
  const { data, isFetching } = useGetHoldersQuery();

  const lastOthersideBlock = 14680891;

  console.log(data)


//   useEffect(() => {

//     data?.ownerAddresses?.map((address) => {

//         const addressTx = address.ownerAddress

//       const allTx = web3.eth
//         .getTransactionCount(addressTx)
//         .then(data);

//       const beforeTx = web3.eth
//         .getTransactionCount(addressTx, lastOthersideBlock)
//         .then(data);

//       async function getTransactionCount() {
//         const allTxs = await allTx;
//         const beforeTxs = await beforeTx;

//         if (allTxs - beforeTxs === 0) {
//             setAddresses(addresses => [...addresses, addressTx])
//         }
//       }

//       getTransactionCount();
//     })

//   }, [data]);

  console.log(addresses);

  if (isFetching) return "Loading...";

  return (
    <Content>
      {addresses?.map(address => <div>{address}</div>)}
    </Content>
  );
};

export default InactiveWallets;

// 0x000000000000000000000000000000000000dead
// 0x00f29ed858a03fd32f892f6decda7ddbe412af44
// 0x0184670b561ce2a85c97b11b06116c2b0a044663
// 0x0dd46d3cab80d4eec9298fbae9cc6c27edd969c0
// 0x08e286f12eb9503f828aba1703d462b4f399c8e0
// 0x04e91ce58a44c501704f5266345c0057a8407805
// 0x0c391abb8ed8d0cee77fdf843110e1037b300d71
// 0x0d4e3433da92bb9d255f6c750889690e6b765563
// 0x0503e39c5ce7d746daae175e7342e6edc4ad1b07
// 0x0f732cd6a97330f7c5fb4f41199f1bf1229ed179
// 0x0fab8621b8c262cebec6b15fa45800e83799a2e8
// 0x1187bbc9f5dac8696650fbd6888e9e199f5c309a
// 0x151a8e3429d7cb08320c3ca738a6a6bd1838bee3
// 0x16164d9104d65401b093f59654745140a522a91a
// 0x19114036f58f6a465477261cf7309aa71b4e4022
// 0x1a79625d7bae59d84e2ef43cfa47885a65ba7ddc
// 0x1b21b115f4bbc82a6b671a8b81d6fe93c82215e8
// 0x067794f1837c0eb0321fe356921a51263ece3a3a
// 0x0e13236bfd4917d9465d54540dab19e66b9f6e3f
// 0x0b4530a70dc0bbf1ce346208e2f3f349dc773b63
// 0x0c883485abd73a8a6ed672c3b1f64261a63cda83
// 0x0eb3b031927e6833231159c9ed0fe47efd29842b
// 0x10ec4d4a8a9de35008e13645ba2b9de931aa5f78
// 0x1616b4c7cdb4093befbcca62f3198993327a8e9e
// 0x1974341df4b113a4c16f3d3f106176dec0e4da67
// 0x14b5943c1aa34ae75988cb1a0e6b9378f2320ad4
// 0x11b528e31d4fac05638c625fd79de34840363be9
// 0x12ec6a7952d62cb0d3336f6d00de26501c483718
// 0x05c6050f35740f44688a60697e78494e4c5d11be
// 0x0a9326888e9ecbcb444118970b37275fb69ce8a3
// 0x00d9711e2defb1b94dcffe6e962d5188f3ae9e52
// 0x114d24243a860162edc73c5a13b6216aca3ecb4c
// 0x16b6e57eda810c8c7ed8370a37104e10c0a93a47
// 0x16c4304868307af8c2002f74955243a431e083fe
