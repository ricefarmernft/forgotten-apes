import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import {getRandomApes} from "../functions/functions";
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
    for (let i = 0; i < 10000; i++) {
      array[i] = i;
    }

    setHomeApes(getRandomApes(array, 18));
    setLoading(false)
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
