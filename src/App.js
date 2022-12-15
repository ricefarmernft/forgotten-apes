import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import {
  Navbar,
  Home,
  LostApes,
  UnclaimedApe,
  UnclaimedDog,
  UnclaimedOtherside,
  BurnedApes,
  NoTransfers,
  ApeDetails,
  Footers,
} from "./components/components";

const { Content } = Layout;

function App() {
  return (
    <>
      <Layout>
        <Navbar />
        <Content>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/lost-apes" element={<LostApes />}></Route>
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
            <Route exact path="/no-transfers" element={<NoTransfers />}></Route>
            <Route exact path="/burned-apes" element={<BurnedApes />}></Route>
            <Route exact path="/ape/:ape" element={<ApeDetails />}></Route>
          </Routes>
        </Content>
        <Footers />
      </Layout>
    </>
  );
}

export default App;
