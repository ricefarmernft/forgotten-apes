import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Statistic, Card, Pagination } from "antd";
import { useGetApecoinApeQuery } from "./services/apecoinAPI";
import web3 from "web3";
import getRandomApes from "./functions/getRandomApes";

const { Content } = Layout;

const UnclaimedApe = (props) => {
  const [claimedApes, setClaimedApes] = useState();
  const [unclaimedApes, setUnclaimedApes] = useState();

  const { data, isFetching } = useGetApecoinApeQuery();

  //  Set Claimed Apes
  useEffect(() => {
    // Find ape ID's that claimed $APE
    const apeHex = data?.result?.map((entry) => entry.topics[1]);
    const apeNumbers = apeHex?.map((hex) => web3.utils.hexToNumber(hex));
    setClaimedApes(apeNumbers);
  }, [data]);

  // Set Unclaimed Apes
  useEffect(() => {
    // Create array 0-10,000
    const array = [];
    for (let i = 0; i < 10000; i++) {
      array[i] = i;
    }
    // Filter array by unclaimed $APE
    if (claimedApes) {
      const apeDifferences = array.filter(
        (apes) => !claimedApes?.includes(apes)
      );
      setUnclaimedApes(getRandomApes(apeDifferences));
    }
  }, [claimedApes]);

  console.log(unclaimedApes);

  if (isFetching) return "Loading...";

  return (
    <Content>
      <div className="home-apes">
        <Row
          gutter={[{ xs: 8, sm: 16, md: 24, lg: 24 }, 24]}
          justify="space-around"
          align="middle"
        >
          {unclaimedApes?.map((ape) => (
            <Col key={ape} xs={12} sm={10} md={8} lg={6} xl={4}>
              <Card
                hoverable
                loading={false}
                cover={
                  <a
                    href={`https://opensea.io/assets/ethereum/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/${ape}`}
                    target="_blank"
                  >
                    <img
                      style={{ width: "100%" }}
                      alt={`Bored Ape ${ape}`}
                      src={`https://ipfs.io/ipfs/QmQ6VgRFiVTdKbiebxGvhW3Wa3Lkhpe6SkWBPjGnPkTttS/${ape}.png`}
                    />
                  </a>
                }
              >
                <Card.Meta style={{ textAlign: "center" }} title={ape} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Content>
  );
};

export default UnclaimedApe;
