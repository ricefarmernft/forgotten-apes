import React from "react";
import {Spin} from "antd";

const Loader = () => {
  return (
    <div className="loader">
      <Spin tip="Reading the Blockchain" size="large"></Spin>
    </div>
  );
};

export default Loader;
