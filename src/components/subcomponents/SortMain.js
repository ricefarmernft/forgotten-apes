import React from "react";
import { Button, Dropdown, Typography } from "antd";
import {
  getRandomApes,
  getLowToHighApes,
  getHighToLowApes,
} from "../../functions/functions";

const { Link } = Typography;

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
      label: <Link onClick={onRandomClick}>Randomize</Link>,
    },
    {
      key: "2",
      label: <Link onClick={onSortLowHighClick}>Low to High</Link>,
    },
    {
      key: "3",
      label: <Link onClick={onSortHighLowClick}>High to Low</Link>,
    },
  ];

  return (
    <>
      <div className="sort-dropdown">
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
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
