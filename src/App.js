import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import web3 from "web3";
import "./App.css";
import Navbar from "./Navbar";
import Home from "./Home";
import UnclaimedApe from "./UnclaimedApe";
import UnclaimedDog from "./UnclaimedDog";
import Footers from "./Footers";
import FindApes from "./findApes";
import { Layout } from "antd";

const { Content } = Layout;

function App() {
  return (
    <>
      <Layout>
        <Navbar />
        <Content>
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>
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
