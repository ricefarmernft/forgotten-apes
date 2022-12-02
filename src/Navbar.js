import React from "react";
import { Layout, Menu, Row, Col, Statistic } from "antd";

const { Header } = Layout;

const Navbar = (props) => {
  const { lostApes } = props;

  const items = [
    {
      key: 1,
      label: "Forgotten Apes",
    },
    {
      key: 2,
      label: "Unclaimed $APE",
    },
    {
      key: 3,
      label: "Unclaimed Dog",
    },
    {
      key: 4,
      label: "No Transfers",
    },
    {
      key: 5,
      label: "Burned Apes",
    },
  ];

  return (
    <Header
      className="navbar"
    //   style={{ position: "sticky", backgroundColor: "aqua" }}
    >
      <div className="logo">Forgotten Apes</div>
      {/* <div className="nav-stats">
        <Row gutter={12}>
          <Col gutter={16}>
            <Statistic title="Lost Apes" />
          </Col>
        </Row>
      </div> */}
      <Menu
        mode="horizontal"
        theme="dark"
        items={items}
        style={{ position: "sticky", justifyContent: "flex-start" }}
      />
      
    </Header>
  );
};

export default Navbar;
