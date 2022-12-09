// Code to find apes that have never been transferred

// const apeIdBeginning = "0x000000000000000000000000000000000000000000000000000000000000";
// const array = [];
//     for (let i = 7895; i < 7896; i++) {
//       array[i] = apeIdBeginning.concat((web3.utils.numberToHex(i).substring(2).padStart(4, "0")));
//     }
    // console.log(array)

    // useEffect(() => {
    //     const options = {
    //                 fromBlock: 0, // Start search from the earliest block
    //                 toBlock: "latest", // End search at the latest block
    //                 address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d", // The address of the NFT contract
    //                 topics: [
    //                   "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
    //                   null,
    //                   null,
    //                   ["0x0000000000000000000000000000000000000000000000000000000000001ed7", "0x0000000000000000000000000000000000000000000000000000000000000000"],
    //                 ],
    //               };
            
    //               const logs = web3.eth.getPastLogs(options).then((data) => {
    //                 data.map(data => console.log(data))
    //                 // if (data.length <= 1) {
    //                 //   setUntransferredApes(array);
    //                 // }
    //             })
    // }, [])