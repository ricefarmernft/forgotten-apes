import React from "react";
import { Table, Typography } from "antd";

const { Text } = Typography;

const LostApeWallets = ({ table }) => {
  const tableData = [];

  //   Refactor tableData by address and token count
  table.forEach((item) => {
    const existingRow = tableData.find((row) => row.address === item.address);
    if (existingRow) {
      existingRow.count++;
    } else {
      tableData.push({
        address: item.address,
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

  //   Create columsn for table
  const columns = [
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) => (
        <a href={`https://etherscan.io/address/${text}`} target="_blank">
          {text}
        </a>
      ),
    },
    {
      title: "Ape Count",
      dataIndex: "count",
      key: "count",
    },
  ];

  return (
    <div id="lost-wallets" className="lost-wallets">
      <Table
        dataSource={sortedData}
        columns={columns}
        size="small"
        // pagination={false}
        // scroll={{
        //   x: 0,
        //   y: 500,
        // }}
        // summary={(pageData) => {
        //   let total = 0;
        //   pageData.forEach(({ count }) => {
        //     total += count;
        //   });
        //   return (
        //     <>
        //       <Table.Summary fixed>
        //         <Table.Summary.Row>
        //           <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
        //           <Table.Summary.Cell index={1}>
        //             <Text type="danger">{total}</Text>
        //           </Table.Summary.Cell>
        //         </Table.Summary.Row>
        //       </Table.Summary>
        //     </>
        //   );
        // }}
      />
    </div>
  );
};

export default LostApeWallets;
