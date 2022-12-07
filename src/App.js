import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import UnclaimedApe from "./components/UnclaimedApe";
import UnclaimedDog from "./components/UnclaimedDog";
import UnclaimedOtherside from "./components/UnclaimedOtherside";
import NoTransfers from "./components/NoTransfers";
import BurnedApes from "./components/BurnedApes";
import InactiveWallets from "./components/InactiveWallets";
import Footers from "./components/Footers";
import { Layout } from "antd";

const { Content } = Layout;

function App() {
  return (
    <>
      <Layout>
        <Navbar />
        <Content>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route
              exact
              path="/unclaimed-ape"
              element={<UnclaimedApe />}
            ></Route>
            <Route
              exact
              path="/unclaimed-dog"
              element={<UnclaimedDog />}
            ></Route>
            <Route
              exact
              path="/unclaimed-otherside"
              element={<UnclaimedOtherside />}
            ></Route>
            <Route
              exact
              path="/no-transfers"
              element={<NoTransfers />}
            ></Route>
            <Route
              exact
              path="/burned-apes"
              element={<BurnedApes />}
            ></Route>
            <Route
              exact
              path="/inactive-wallets"
              element={<InactiveWallets />}
            ></Route>
          </Routes>
        </Content>
        <Footers />
      </Layout>
    </>
  );
}

export default App;
