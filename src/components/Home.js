import React, { useEffect, useState } from "react";
import { Layout, Typography } from "antd";
import {
  HomeStatistics,
  ApesMain,
  Loader,
} from "./subcomponents/subcomponents";

const { Content } = Layout;
const { Text } = Typography;

const Home = () => {
  const [loading, setLoading] = useState(true);

  const [homeApes, setHomeApes] = useState();

  // Set 12 apes for the homepage
  useEffect(() => {
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
          <div className="home-feature">
            <Text type="secondary">
              *Want to feature your Bored Ape below for .05 eth? Contact Rice Farmer
              on{" "}
              <a
                href="https://twitter.com/RiceFarmerNFT"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
            </Text>
          </div>
          <ApesMain unclaimed={homeApes} />
        </>
      )}
    </Content>
  );
};

export default Home;
