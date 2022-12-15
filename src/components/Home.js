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


  // Set 12 apes for the homepage
  useEffect(() => {
    // const array = [];
    // for (let i = 0; i < 12; i++) {
    //   array.push(i);
    // }
    const array = [7895, 2488, 6384, 4101, 5526, 7071, 1768, 5040, 1, 2, 3, 30];

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
