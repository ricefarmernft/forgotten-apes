import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
  const items = [
    {
      key: 0,
      label: <Link to="/">Home</Link>,
    },
    {
      key: 1,
      label: <Link to="/lost-apes">Lost Apes</Link>,
    },
    {
      key: 2,
      label: <Link to="/unclaimed-ape">Unclaimed $APE</Link>,
    },
    {
      key: 3,
      label: <Link to="/unclaimed-dog">Unclaimed Dog</Link>,
    },
    {
      key: 4,
      label: <Link to="/unclaimed-otherside">Unclaimed Otherside</Link>,
    },
    {
      key: 5,
      label: <Link to="/burned-apes">Burned Apes</Link>,
    },
    {
      key: 6,
      label: <Link to="/no-transfers">No Transfers</Link>,
    },
  ];

  return (
    <Header
      className="navbar"
      style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}
    >
      <div className="logo">
        <Link to="/">Forgotten Apes</Link></div>
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
