import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const alchemyApiKey = `${process.env.REACT_APP_ALCHEMY_API_KEY}`;
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
    getCurrentHolders: builder.query({
      query: () =>
        createRequest(
          `getOwnersForCollection?contractAddress=${baycAddress}&withTokenBalances=true`
        ),
    }),
    getPastHolders: builder.query({
      query: (block) =>
        createRequest(
          `getOwnersForCollection?contractAddress=${baycAddress}&withTokenBalances=true&block=${block}`
        ),
    }),
    getTokenHolders: builder.query({
      query: (token) =>
        createRequest(
          `getOwnersForToken?contractAddress=${baycAddress}&tokenId=${token}`
        ),
    }),
    getMetadata: builder.query({
      query: (tokenId) =>
        createRequest(
          `getNFTMetadata?contractAddress=${baycAddress}&tokenId=${tokenId}&tokenType=ERC721&refreshCache=false`
        ),
    }),
  }),
});

export const { useGetNftsQuery, useGetCurrentHoldersQuery, useGetPastHoldersQuery, useGetTokenHoldersQuery, useGetMetadataQuery } = alchemyApi;
