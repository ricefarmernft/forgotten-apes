import React, { useState } from "react";
import { Table, Typography, Button } from "antd";

const LostApeWallets = ({ table }) => {
  const [tableShow, setTableShow] = useState(false);
  const tableData = [];

  //   Refactor tableData by address and token count
  table.forEach((item) => {
    const existingRow = tableData.find((row) => row.address === item.address);
    if (existingRow) {
      existingRow.count++;
    } else {
      tableData.push({
        address: item.address,
        subAddress: item.address,
        count: 1,
      });
    }
  });

  //   Sort data by token count, high to low
  const sortedData = tableData.sort((a, b) => {
    if (a.count > b.count) return -1;
    if (a.count < b.count) return 1;
    return 0;
  });

  //   Create columns for table
  const columns = [
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      responsive: ['sm'],
      render: (text) => (
        <a href={`https://etherscan.io/address/${text}`} target="_blank">
          {text}
        </a>
      ),
    },
    {
      title: "Address",
      dataIndex: "subAddress",
      key: "subAddress",
      responsive: ['xs'],
      render: (text) => (
        <a href={`https://etherscan.io/address/${text}`} target="_blank">
          {text.substring(0,4) + "..."}
        </a>
      ),
    },
    {
      title: "Ape Count",
      dataIndex: "count",
      key: "count",
    },
  ];

  const handleClick = (event) => {
    event.preventDefault();
    setTableShow((current) => !current);
  };

  return (
    <>
      <div className="lost-wallets-btn">
        <Button
          size="large"
          type="link"
          onClick={handleClick}
        >
          {tableShow ? "Hide" : "Show"} Lost Apes Wallets
        </Button>
      </div>
      {tableShow && (
        <div id="lost-wallets" className="lost-wallets">
          <Table dataSource={sortedData} columns={columns} size="small" />
        </div>
      )}
    </>
  );
};

export default LostApeWallets;
