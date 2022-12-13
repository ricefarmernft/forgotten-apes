import React from "react";
import { Typography } from "antd";
const { Title, Text } = Typography;

const TitleMain = (props) => {
  const { number, children } = props;

  return (
    <div className="title-container">
      <Title className="total-title" level={3}>
        Total Apes: {number}
      </Title>
      <Text className="title-text" level={3}>
        {children}
      </Text>
    </div>
  );
};

export default TitleMain;
