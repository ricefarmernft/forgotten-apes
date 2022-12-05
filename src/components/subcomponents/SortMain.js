import React from "react";
import { Button } from "antd";
import getRandomApes from "../../functions/getRandomApes";
import getLowToHighApes from "../../functions/getLowToHighApes";
import getHighToLowApes from "../../functions/getHighToLowApes";

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
