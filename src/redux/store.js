import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./features/playerSlice";
import { shazamCoreApi } from "./services/shazamCore";
import { geoLocationApi } from "./services/geoLocation";

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    [geoLocationApi.reducerPath]: geoLocationApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(shazamCoreApi.middleware)
      .concat(geoLocationApi.middleware),
});
