import React from "react";
import { Input, Typography } from "antd";
const { Title, Text } = Typography;

const TitleMain = (props) => {
  const { number, setSearchTerm, children } = props;

  return (
    <div className="title-container">
      <Title className="total-title" level={3}>
        Total Apes: {number}
      </Title>
      <Text className="title-text" level={3}>
        {children}
      </Text>
      <div className="search-ape">
        <Input
          placeholder="Search Ape ID"
          onChange={(e) => setSearchTerm(e.target.value)}
        ></Input>
      </div>
    </div>
  );
};

export default TitleMain;
