import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const log0 =
"0x592993b07849bd4ab51c2de371aea3db52156da6f3cd8476b1c585454b254f48";
const apecoinDeployer = "0x025c6da5bd0e6a5dd1350fda9e3b6a614b205a1f";
const api = "PQKBJBWE9EEDEQSJ2QCKDR1W97FY2M2DTR";

const baseUrl = `https://api.etherscan.io/api?module=logs&action=getLogs&address=${apecoinDeployer}&fromBlock=00000000&toBlock=99999999&topic0=${log0}&page=1&offset=10000&apikey=${api}`;

const createRequest = (url) => ({ url });

export const apecoinApi = createApi({
  reducerPath: "apecoinApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getApecoinApe: builder.query({
      query: () => createRequest(""),
    }),
  }),
});

export const { useGetApecoinApeQuery } = apecoinApi;
