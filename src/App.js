import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import web3 from "web3";
import "./App.css";
import Navbar from "./Navbar";
import Home from "./Home";
import UnclaimedApe from "./UnclaimedApe";
import Footers from "./Footers";
import FindApes from "./findApes";
import { Layout } from "antd";

const { Content } = Layout;

function App() {
  const [apes, setApes] = useState([]);
  const [lostApes, setLostApes] = useState("");
  const [loading, setLoading] = useState(true);

  const log0 =
    "0x592993b07849bd4ab51c2de371aea3db52156da6f3cd8476b1c585454b254f48";
  const apecoinDeployer = "0x025c6da5bd0e6a5dd1350fda9e3b6a614b205a1f";
  const api = "PQKBJBWE9EEDEQSJ2QCKDR1W97FY2M2DTR";

  // Create array 0-10,000
  const array = [];
  for (let i = 0; i < 10000; i++) {
    array[i] = i;
  }
  // API Request
  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.etherscan.io/api?module=logs&action=getLogs&address=${apecoinDeployer}&fromBlock=00000000&toBlock=99999999&topic0=${log0}&page=1&offset=10000&apikey=${api}`,
    };

    axios
      .request(options)
      .then(function (response) {
        // Set # of apes with unclaimed $APE
        setLostApes(10000 - response.data.result.length);
        // Find ape ID's that claimed $APE
        const apeHex = response.data.result.map((entry) => entry.topics[1]);
        const apeNumbers = apeHex.map((hex) => web3.utils.hexToNumber(hex));
        // Find ape ID's that did not claim $APE
        const apeDifferences = array.filter(
          (apes) => !apeNumbers.includes(apes)
        );
        // Set ape ID's that did not claim $APE
        setApes(apeDifferences);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.error(error);
      });
  }, []);

  return (
    <>
      <Layout>
        <Navbar lostApes={lostApes} />
        <Content>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home lostApes={lostApes} apes={apes} loading={loading} />
              }
            ></Route>
            <Route
              exact
              path="/unclaimed$ape"
              element={
                <UnclaimedApe lostApes={lostApes} apes={apes} loading={loading} />
              }
            ></Route>
          </Routes>
        </Content>
        <Footers />
      </Layout>
    </>
  );
}

export default App;
