import React, { useState } from "react";
import { Layout, Row, Col, Statistic, Card } from "antd";

const { Content } = Layout;

const Home = (props) => {
  const { lostApes, apes, loading } = props;

  const getRandomApes = (array) => {
    const randomApes = [...array];

    randomApes.sort(() => Math.random() - 0.5);
    return randomApes.slice(0, 24);
  };

  const homeApes = getRandomApes(apes);

  return (
    <Content>
      <div className="home-stats">
        <Row
          gutter={[{ xs: 8, sm: 16, md: 24, lg: 24 }, 24]}
          justify="space-around"
          align="middle"
        >
          <Col xs={10} sm={10} md={7} lg={5} xl={4}>
            <Card>
              <Statistic title="Lost Apes" value={lostApes} suffix="/ 10k" />
            </Card>
          </Col>
          <Col xs={10} sm={10} md={7} lg={5} xl={4}>
            <Card>
              <Statistic
                title="Unclaimed $APE"
                value={lostApes}
                suffix="/ 10k"
              />
            </Card>
          </Col>
          <Col xs={10} sm={10} md={7} lg={5} xl={4}>
            <Card>
              <Statistic
                title="Unclaimed Dog"
                value={lostApes}
                suffix="/ 10k"
              />
            </Card>
          </Col>
          <Col xs={10} sm={10} md={7} lg={5} xl={4}>
            <Card>
              <Statistic title="No Transfers" value={lostApes} suffix="/ 10k" />
            </Card>
          </Col>
          <Col xs={10} sm={10} md={7} lg={5} xl={4}>
            <Card>
              <Statistic title="Burned Apes" value={lostApes} suffix="/ 10k" />
            </Card>
          </Col>
        </Row>
      </div>
      <div className="home-apes">
        <Row
          gutter={[{ xs: 8, sm: 16, md: 24, lg: 24 }, 24]}
          justify="space-around"
          align="middle"
        >
          {homeApes.map((ape) => (
            <Col key={ape} xs={12} sm={10} md={8} lg={6} xl={4}>
              <Card
                hoverable
                loading={loading}
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
                <Card.Meta
                  style={{ textAlign: "center" }}
                  title={ape}
                //   loading={loading}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Content>
  );
};

export default Home;
