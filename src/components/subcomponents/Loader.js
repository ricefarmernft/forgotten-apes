import React from "react";
import {Spin} from "antd";

const Loader = (props) => {
  const minute = props.children
  return (
    <div className="loader">
      <Spin tip={`Reading the Blockchain... ${minute || ""}`} size="large"></Spin>
    </div>
  );
};

export default Loader;
