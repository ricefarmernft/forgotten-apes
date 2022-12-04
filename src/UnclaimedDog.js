import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Input, Card, Typography } from "antd";
import { useGetDogApeQuery } from "./services/apecoinAPI";
import getRandomApes from "./functions/getRandomApes";
import useSetClaimed from "./functions/useSetClaimed";
import useSetUnclaimed from "./functions/useSetUnclaimed";

const UnclaimedDog = () => {
  const [claimedDogs, setClaimedDogs] = useState();
  const [unclaimedDogs, setUnclaimedDogs] = useState();

  const [searchTerm, setSearchTerm] = useState();

  const { data, isFetching } = useGetDogApeQuery();
  console.log(data);

  //  Set Claimed Dogs
  useSetClaimed(data, 3, setClaimedDogs);

  //   Set Unclaimed Dogs
  useSetUnclaimed(claimedDogs, setUnclaimedDogs);

  console.log(unclaimedDogs);

  return <div>UnclaimedDog</div>;
};

export default UnclaimedDog;
