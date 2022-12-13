import React from "react";
import { Button } from "antd";
import {getRandomApes, getLowToHighApes, getHighToLowApes} from "../../functions/functions"

const SortMain = (props) => {

  const {unclaimed, setUnclaimed} = props;

  const onRandomClick = () => {
    setUnclaimed(getRandomApes(unclaimed))
  }

  const onSortLowHighClick = () => {
    setUnclaimed(getLowToHighApes(unclaimed))
  }
  const onSortHighLowClick = () => {
    setUnclaimed(getHighToLowApes(unclaimed))
  }

  return (
    <div className="sort-container">
      <Button onClick={onRandomClick}>Randomize</Button>
      <Button onClick={onSortLowHighClick}>Low to High</Button>
      <Button onClick={onSortHighLowClick}>High to Low</Button>
    </div>
  );
};

export default SortMain;
