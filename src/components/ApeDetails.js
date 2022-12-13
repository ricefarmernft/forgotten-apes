import React from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Card, Layout, Button } from "antd";
import { useGetMetadataQuery } from "../services/alchemyApi";
import {Loader} from "./subcomponents/subcomponents";

const { Content } = Layout;

const ApeDetails = () => {
  const { ape } = useParams();

  const { data, isFetching } = useGetMetadataQuery(ape);

  const metadata = data?.metadata?.attributes;

  if (isFetching) return <Loader />

  return (
    <Content>
      <div className="ape-details-container">
        <div className="ape-details-image">
          <Row
            // gutter={[{ xs: 8, sm: 16, md: 24, lg: 24 }, 24]}
            justify="start"
            //   align="middle"
          >
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Card
                hoverable
                loading={false}
                cover={
                  <img
                    style={{ width: "100%" }}
                    alt={`Bored Ape ${ape}`}
                    src={`https://storage.googleapis.com/nftimagebucket/tokens/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/preview/${ape}.png`}
                  />
                  // </a>
                }
              >
                <Card.Meta
                  style={{ textAlign: "center" }}
                  title={ape.toString()}
                />
              </Card>
            </Col>
                            

          </Row>
        </div>
        <div className="ape-details-body">
          <div className="ape-details-traits">
            <Row
              gutter={[
                { xs: 6, sm: 6, md: 12, lg: 12 },
                { xs: 6, sm: 6, md: 12, lg: 12 },
              ]}
            >
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Card size="small" title="Trait Count">
                  {metadata?.length}
                </Card>
              </Col>
              {metadata?.map((data, index) => (
                <Col key={index} xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Card size="small" title={data.trait_type}>
                    {data.value}
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          <div className="ape-details-links">
            <Row
              gutter={[
                18,
                18,
              ]}
            >
              <Col
                style={{ textAlign: "center" }}
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
              >
                <Button type="primary" href={`https://etherscan.io/nft/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/${ape}`} target="_blank">Etherscan</Button>
              </Col>
              <Col
                style={{ textAlign: "center" }}
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
              >
                <Button type="primary" href={`https://opensea.io/assets/ethereum/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/${ape}`} target="_blank">Opensea</Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default ApeDetails;
