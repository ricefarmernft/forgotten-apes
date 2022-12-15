import React from "react";
import { Button, Dropdown } from "antd";
import {
  getRandomApes,
  getLowToHighApes,
  getHighToLowApes,
} from "../../functions/functions";

const SortMain = (props) => {
  const { unclaimed, setUnclaimed } = props;

  const onRandomClick = () => {
    setUnclaimed(getRandomApes(unclaimed));
  };

  const onSortLowHighClick = () => {
    setUnclaimed(getLowToHighApes(unclaimed));
  };
  const onSortHighLowClick = () => {
    setUnclaimed(getHighToLowApes(unclaimed));
  };

  const items = [
    {
      key: "1",
      label: <a onClick={onRandomClick}>Randomize</a>,
    },
    {
      key: "2",
      label: <a onClick={onSortLowHighClick}>Low to High</a>,
    },
    {
      key: "3",
      label: <a onClick={onSortHighLowClick}>High to Low</a>,
    },
  ];

  return (
    <>
      <div className="sort-dropdown">
        <Dropdown
          menu={{
            items,
          }}
          trigger={['click']}
        >
          <Button>Filters</Button>
        </Dropdown>
      </div>
      <div className="sort-container">
        <Button onClick={onRandomClick}>Randomize</Button>
        <Button onClick={onSortLowHighClick}>Low to High</Button>
        <Button onClick={onSortHighLowClick}>High to Low</Button>
      </div>
    </>
  );
};

export default SortMain;
