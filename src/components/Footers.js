import React from "react";
import { Layout } from "antd";
import { GithubOutlined, TwitterOutlined } from "@ant-design/icons";

const { Footer } = Layout;

const Footers = () => {
  return (
    <Footer
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="footer-blank">
        <div>ricefarmer.eth</div>
      </div>
      <div className="footer-text">
        <div>Rice Labs ©2022</div>
        <div>All Rights Reserved</div>
      </div>
      <div className="footer-logos">
        <a href="https://github.com/ricefarmernft" target="_blank" rel="noreferrer">
          <GithubOutlined />
        </a>
        <a href="https://twitter.com/RiceFarmerNFT" target="_blank" rel="noreferrer">
          <TwitterOutlined />
        </a>
      </div>
    </Footer>
  );
};

export default Footers;
