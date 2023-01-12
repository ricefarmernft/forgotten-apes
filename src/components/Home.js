import React, { useEffect, useState } from "react";
import { Layout, Typography } from "antd";
import {
  HomeStatistics,
  ApesMain,
  Loader,
} from "./subcomponents/subcomponents";
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Text } = Typography;

const Home = (props) => {
  const [homeApes, setHomeApes] = useState();

  const { totalNoTransfer, totalLostApes, lostApes, loading } = props;

  // Set 12 apes for the homepage
  useEffect(() => {
    const lostApesTwelve = lostApes?.slice(0, 12);
    setHomeApes(lostApesTwelve);
  }, [lostApes]);

  return (
    <Content>
      {loading ? (
        <Loader>This could take up to 1 minute...</Loader>
      ) : (
        <>
          <HomeStatistics
            totalLostApes={totalLostApes}
            totalNoTransfer={totalNoTransfer}
          />
          <div className="home-feature">
            <Text type="secondary">
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
