import React from "react";
import { Row, Col, Statistic, Card } from "antd";
import { Link } from "react-router-dom";

const HomeStatistics = ({ totalLostApes, totalNoTransfer }) => {
  return (
    <div className="home-stats">
      <Row
        gutter={[{ xs: 4, sm: 4, md: 6, lg: 6 }, 6]}
        justify="space-around"
        align="middle"
      >
        <Col xs={12} sm={8} md={8} lg={8} xl={4}>
          <Link to="/lost-apes">
            <Card hoverable>
              <Statistic title="Lost Apes" value={totalLostApes} />
            </Card>
          </Link>
        </Col>
        <Col xs={12} sm={8} md={8} lg={8} xl={4}>
          <Link to="/unclaimed-ape">
            <Card hoverable>
              <Statistic title="Unclaimed $APE" value="96" />
            </Card>
          </Link>
        </Col>
        <Col xs={12} sm={8} md={8} lg={8} xl={4}>
          <Link to="/unclaimed-dog">
            <Card hoverable>
              <Statistic title="Unclaimed Dog" value="398" />
            </Card>
          </Link>
        </Col>
        <Col xs={12} sm={8} md={8} lg={8} xl={4}>
          <Link to="/unclaimed-otherside">
            <Card hoverable>
              <Statistic title="Unclaimed Otherside" value="266" />
            </Card>
          </Link>
        </Col>
        <Col xs={12} sm={8} md={8} lg={8} xl={4}>
          <Link to="/burned-apes">
            <Card hoverable>
              <Statistic title="Burned Apes" value="2" />
            </Card>
          </Link>
        </Col>
        <Col xs={12} sm={8} md={8} lg={8} xl={4}>
          <Link to="/no-transfers">
            <Card hoverable>
              <Statistic title="No Transfers" value={totalNoTransfer} />
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default HomeStatistics;
