import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import { forceCheck } from "react-lazyload";
import { useGetBakcQuery } from "../../services/alchemyApi";

const BakcMain = (props) => {
  const { unclaimed } = props;

  // Get BAKC image src
  // const GetBakcImage = ({ dog }) => {
  //   const { data } = useGetBakcQuery(dog);
  //   const image = data?.media[0].gateway;
  //   return (
  //     <>
  //       <img
  //         style={{ width: "100%" }}
  //         //   alt={`Bored Ape Kennel Club ${dog}`}
  //         src={image}
  //       />
  //     </>
  //   );
  // };

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
        {unclaimed?.map((dog) => {
          return (
            <Col key={dog} xs={12} sm={8} md={8} lg={6} xl={4}>
              <LazyLoad height="100%" offset={100}>
                {/* <Link to={`/dog/${dog}`}> */}
                <a
                  href={`https://opensea.io/assets/ethereum/0xba30e5f9bb24caa003e9f2f0497ad287fdf95623/${dog}`}
                  target="_blank"
                  rel="noreferrer"
                >
                   <Card
                  hoverable
                  // loading={loading}
                  cover={
                    <img
                      style={{ width: "100%" }}
                      alt={`Bored Ape Kennel Club ${dog}`}
                      src={`https://img.x2y2.io/v2/1/0xba30e5f9bb24caa003e9f2f0497ad287fdf95623/${dog}/720/image.jpg`}
                    />
                  }
                >
                  <Card.Meta
                    style={{ textAlign: "center" }}
                    title={dog.toString()}
                  />
                </Card>
                </a>
                {/* </Link> */}
              </LazyLoad>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default BakcMain;
