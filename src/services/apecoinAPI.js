import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = "PQKBJBWE9EEDEQSJ2QCKDR1W97FY2M2DTR";

const apeLog0 =
  "0x592993b07849bd4ab51c2de371aea3db52156da6f3cd8476b1c585454b254f48";
const apecoinDeployer = "0x025c6da5bd0e6a5dd1350fda9e3b6a614b205a1f";

const dogDeployer = "0xba30e5f9bb24caa003e9f2f0497ad287fdf95623";
const dogLog0 =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
const dogLog1 =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

const baseUrl = `https://api.etherscan.io/api`;

const createRequest = (url) => ({ url });

export const etherscanApi = createApi({
  reducerPath: "etherscan",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getApecoinApe: builder.query({
      query: () =>
        createRequest(
          `?module=logs&action=getLogs&address=${apecoinDeployer}&fromBlock=00000000&toBlock=99999999&topic0=${apeLog0}&page=1&offset=10000&apikey=${api}`
        ),
    }),
    getDogApe: builder.query({
      query: () =>
        createRequest(`?module=logs&action=getLogs&address=${dogDeployer}&fromBlock=00000000&toBlock=99999999&topic0=${dogLog0}&topic1=${dogLog1}&page=1&offset=10000&apikey=${api}`),
    }),
  }),
});

export const { useGetApecoinApeQuery, useGetDogApeQuery } = etherscanApi;
