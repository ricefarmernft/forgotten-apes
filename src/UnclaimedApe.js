import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Input, Card, Typography } from "antd";
import { useGetApecoinApeQuery } from "./services/apecoinAPI";
import web3 from "web3";
import getRandomApes from "./functions/getRandomApes";
import useSetClaimed from "./functions/useSetClaimed";
import useSetUnclaimed from "./functions/useSetUnclaimed";

const { Content } = Layout;
const { Title, Text } = Typography;

const UnclaimedApe = () => {
  const [claimedApes, setClaimedApes] = useState();
  const [unclaimedApes, setUnclaimedApes] = useState();

  const [searchTerm, setSearchTerm] = useState();

  const { data, isFetching } = useGetApecoinApeQuery();

  //  Set Claimed Apes
  useSetClaimed(data, 1, setClaimedApes);

  // Set Unclaimed Apes
  useSetUnclaimed(claimedApes, setUnclaimedApes);

  // Filter apes by ID
  useEffect(() => {
    const array = [];
    for (let i = 0; i < 10000; i++) {
      array[i] = i;
    }
    if (claimedApes) {
      const apeDifferences = array.filter(
        (apes) => !claimedApes?.includes(apes)
      );
      const filteredApes = apeDifferences?.filter((ape) =>
        String(ape).includes(searchTerm)
      );
      setUnclaimedApes(filteredApes);
    }
  }, [searchTerm]);

  console.log(unclaimedApes);

  if (isFetching) return "Loading...";

  return (
    <Content>
      <div className="title-container">
        <Title className="total-title" level={3}>
          Total Apes: {unclaimedApes?.length}
        </Title>
        <Text className="title-text" level={3}>
          {unclaimedApes?.length} apes never claimed their Apecoin airdrop.
        </Text>
        <div className="search-ape">
          <Input
            placeholder="Search Ape ID"
            onChange={(e) => setSearchTerm(e.target.value)}
          ></Input>
        </div>
      </div>
      <div className="home-apes">
        <Row
          gutter={[{ xs: 8, sm: 16, md: 24, lg: 24 }, 24]}
          justify="start"
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
