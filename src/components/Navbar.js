import React from "react";
import { Layout, Menu, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const Navbar = (props) => {
  const { lostApes } = props;

  const items = [
    {
      key: 1,
      label: <Link to="/">Forgotten Apes</Link>,
    },
    {
      key: 2,
      label: <Link to="/unclaimed-ape">Unclaimed $APE</Link>,
    },
    {
      key: 3,
      label: <Link to="/unclaimed-dog">Unclaimed Dog</Link>
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
