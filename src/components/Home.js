import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { useGetApecoinApeQuery } from "../services/etherscanApi";
import web3 from "web3";
import getRandomApes from "../functions/getRandomApes";
import ApesMain from "./subcomponents/ApesMain";
import HomeStatistics from "./subcomponents/HomeStatistics";
import Loader from "./subcomponents/Loader";

const { Content } = Layout;

const Home = () => {

  const [homeApes, setHomeApes] = useState();

  useEffect(() => {
    const array = [];
    for (let i = 0; i < 10000; i++) {
      array[i] = i;
    }

    setHomeApes(getRandomApes(array, 18));
  }, []);

  return (
    <Content>
      <HomeStatistics />
      <ApesMain unclaimed={homeApes} />
    </Content>
  );
};

export default Home;
