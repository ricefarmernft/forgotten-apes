import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Statistic, Card, Pagination } from "antd";

const { Content } = Layout;

const UnclaimedApe = (props) => {
  const { lostApes, apes, loading } = props;

//   const defaultApes = apes.slice(0, 24);
  const [apePages, setApePages] = useState();

  useEffect(() => {
    setApePages()
  },[])

//   const onChangePage = (page, pageSize) => {
//     let filteredApes = apes.slice(pageSize * page - pageSize, pageSize * page);
//     setApePages(filteredApes);
//   };

//   console.log(defaultApes);
  console.log(apePages);

  return (
    <Content>
        {/* <Pagination
            defaultCurrent={1}
        //   current={1}
          total={apes.length}
          pageSize={24}
          pageSizeOptions={[24,48,72,96]}
          showSizeChanger={true}
          onChange={onChangePage}
        /> */}
      <div className="home-apes">
        <Row
          gutter={[{ xs: 8, sm: 16, md: 24, lg: 24 }, 24]}
          justify="space-around"
          align="middle"
        >
          {apes.map((ape) => (
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
