import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import UnclaimedApe from "./components/UnclaimedApe";
import UnclaimedDog from "./components/UnclaimedDog";
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
          </Routes>
        </Content>
        <Footers />
      </Layout>
    </>
  );
}

export default App;
