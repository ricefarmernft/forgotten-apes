import React from "react";
import { Row, Col, Card } from "antd";

const ApesMain = (props) => {
  const { unclaimed } = props;

  return (
    <div className="main-apes">
      <Row
        gutter={[{ xs: 8, sm: 16, md: 24, lg: 24 }, 24]}
        justify="start"
        align="middle"
      >
        {unclaimed?.map((ape) => (
          <Col key={ape} xs={12} sm={8} md={8} lg={6} xl={4}>
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
                    src={`https://storage.googleapis.com/nftimagebucket/tokens/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/preview/${ape}.png`}
                  />
                </a>
              }
            >
              <Card.Meta style={{ textAlign: "center" }} title={ape.toString()} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ApesMain;
