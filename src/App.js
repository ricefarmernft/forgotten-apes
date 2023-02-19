import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Layout, ConfigProvider } from "antd";

import {
  DarkMode,
  Navbar,
  Home,
  LostApes,
  UnclaimedSewer,
  BakcSewer,
  UnclaimedApe,
  UnclaimedDog,
  UnclaimedOtherside,
  BurnedApes,
  NoTransfers,
  ApeDetails,
  Footers,
} from "./components/components";
import { darkSelector } from "./store/store";
import { useSelector } from "react-redux";

import ReactGA from "react-ga4";

const googleApi = `${process.env.REACT_APP_GOOGLE_API_KEY}`;
ReactGA.initialize(googleApi);

const { Content } = Layout;

function App() {
  const darkMode = useSelector(darkSelector);

  const location = useLocation();

  // Google analytics
  useEffect(() => {
    ReactGA.send("pageview", location.pathname);
  }, [location]);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorBgBase: darkMode ? "#112a45" : "#fff",
            colorTextBase: darkMode ? "#FAF9F6" : "#000",
            colorPrimary: darkMode ? "#65b7f3" : "#1677ff",
            colorLink: darkMode ? "#65b7f3" : "#1677ff",
            colorLinkHover: darkMode ? "#b7e3fa" : "#69b1ff",
          },
        }}
      >
        <Layout>
          <DarkMode />
          <Navbar />
          <Content>
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route
                exact
                path="/unclaimed-sewer"
                element={<UnclaimedSewer />}
              ></Route>
              <Route
                exact
                path="/bakc-unclaimed-sewer"
                element={<BakcSewer />}
              ></Route>
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
              <Route
                exact
                path="/no-transfers"
                element={<NoTransfers />}
              ></Route>
              <Route exact path="/burned-apes" element={<BurnedApes />}></Route>
              <Route exact path="/ape/:ape" element={<ApeDetails />}></Route>
            </Routes>
          </Content>
          <Footers />
        </Layout>
      </ConfigProvider>
    </>
  );
}

export default App;
