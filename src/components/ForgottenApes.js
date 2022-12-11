import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { useGetApecoinApeQuery } from "../services/etherscanApi";
import { useGetNftsQuery } from "../services/alchemyApi";
import useSetClaimed from "../functions/useSetClaimed";
import useSetUnclaimed from "../functions/useSetUnclaimed";
import useIdFilter from "../functions/useIdFilter";
import TitleMain from "./subcomponents/TitleMain";
import ApesMain from "./subcomponents/ApesMain";
import SortMain from "./subcomponents/SortMain";

const { Content } = Layout;
const ForgottenApes = () => {

  return (
    <div>ForgottenApes</div>
  )
}

export default ForgottenApes