import React, { useEffect } from "react";
import { Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import { forceCheck } from "react-lazyload";

const ApesMain = (props) => {
  const { unclaimed, loading } = props;

  // Lazy load on sorting function
  useEffect(() => {
    forceCheck();
  }, [unclaimed]);

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
            <LazyLoad height="100%" offset={100}>
              <Link to={`/ape/${ape}`}>
                <Card
                  hoverable
                  loading={loading}
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
            </LazyLoad>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ApesMain;
