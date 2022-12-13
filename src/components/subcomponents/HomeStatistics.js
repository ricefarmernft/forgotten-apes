import React from 'react'
import { Row, Col, Statistic, Card } from "antd";

const HomeStatistics = () => {
  return (
    <div className="home-stats">
        <Row
          gutter={[{ xs: 4, sm: 4, md: 6, lg: 6 }, 6]}
          justify="space-around"
          align="middle"
        >
          <Col xs={12} sm={8} md={8} lg={8} xl={4}>
            <Card>
              <Statistic title="Lost Apes" value="68" />
            </Card>
          </Col>
          <Col xs={12} sm={8} md={8} lg={8} xl={4}>
            <Card>
              <Statistic title="Unclaimed $APE" value="96" />
            </Card>
          </Col>
          <Col xs={12} sm={8} md={8} lg={8} xl={4}>
            <Card>
              <Statistic title="Unclaimed Dog" value="398" />
            </Card>
          </Col>
          <Col xs={12} sm={8} md={8} lg={8} xl={4}>
            <Card>
              <Statistic title="Unclaimed Otherside" value="266" />
            </Card>
          </Col>
          <Col xs={12} sm={8} md={8} lg={8} xl={4}>
            <Card>
              <Statistic title="Burned Apes" value="2" />
            </Card>
          </Col>
          <Col xs={12} sm={8} md={8} lg={8} xl={4}>
            <Card>
              <Statistic title="No Transfers" value="247" />
            </Card>
          </Col>
        </Row>
      </div>
  )
}

export default HomeStatistics