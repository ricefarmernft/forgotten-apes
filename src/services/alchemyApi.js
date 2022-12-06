import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const alchemyApiKey = "weAIDXHKw7995TqqNVUtFtLATPvXpYhz";
const baseUrl = `https://eth-mainnet.g.alchemy.com/nft/v2/${alchemyApiKey}/`;
const baycAddress = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
const burnAddress = "0x000000000000000000000000000000000000dead";
const burnAddress1 = "0x0000000000000000000000000000000000000000";

const createRequest = (url) => ({ url });

export const alchemyApi = createApi({
  reducerPath: "alchemy",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getNfts: builder.query({
      query: (owner) =>
        createRequest(
          `getNFTs?owner=${owner}&pageSize=100&contractAddresses[]=${baycAddress}&withMetadata=false`
        ),
    }),
  }),
});

export const { useGetNftsQuery } = alchemyApi;
