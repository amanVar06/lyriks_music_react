import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const geoLocationApi = createApi({
  reducerPath: "geoLocationApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://geo.ipify.org/api/v2/country?apiKey=at_evLxlsK0qnKH5LQOtv78jKdUuxlNk",
  }),
  endpoints: (builder) => ({
    getLocation: builder.query({ query: () => "/" }),
  }),
});

export const { useGetLocationQuery } = geoLocationApi;
