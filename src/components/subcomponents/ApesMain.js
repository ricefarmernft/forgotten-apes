import React from "react";
import { Row, Col, Card } from "antd";
import { Link } from "react-router-dom";

const ApesMain = (props) => {
  const { unclaimed } = props;

  return (
    <div className="main-apes">
      <Row
        gutter={[
          { xs: 8, sm: 12, md: 12, lg: 16 },
          { xs: 8, sm: 12, md: 12, lg: 16 },
        ]}
        justify="start"
        align="middle"
      >
        {unclaimed?.map((ape) => (
          <Col key={ape} xs={12} sm={8} md={8} lg={6} xl={4}>
            <Link to={`/ape/${ape}`}>
              <Card
                hoverable
                loading={false}
                cover={
                  <img
                    style={{ width: "100%" }}
                    alt={`Bored Ape ${ape}`}
                    src={`https://storage.googleapis.com/nftimagebucket/tokens/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/preview/${ape}.png`}
                  />
                }
              >
                <Card.Meta
                  style={{ textAlign: "center" }}
                  title={ape.toString()}
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ApesMain;
