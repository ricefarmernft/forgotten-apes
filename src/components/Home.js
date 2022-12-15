import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { getRandomApes } from "../functions/functions";
import {
  HomeStatistics,
  ApesMain,
  Loader,
} from "./subcomponents/subcomponents";

const { Content } = Layout;

const Home = () => {
  const [loading, setLoading] = useState(true);

  const [homeApes, setHomeApes] = useState();

  // Randomly generate 30 ape Ids
  useEffect(() => {
    const array = [];
    for (let i = 0; i < 12; i++) {
      array.push(Math.floor(Math.random() * 10001));
    }

    setHomeApes(array);
    setLoading(false);
  }, []);

  return (
    <Content>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HomeStatistics />
          <ApesMain unclaimed={homeApes} />
        </>
      )}
    </Content>
  );
};

export default Home;
