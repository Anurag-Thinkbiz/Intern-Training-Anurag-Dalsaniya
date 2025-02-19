import { configureStore } from "@reduxjs/toolkit";

import logger from "redux-logger";
import { languageSlice } from "../slices/language.slice";

const middleware = (getDefaultMiddleware: any) => {
  return getDefaultMiddleware().concat(logger);
};

export const store = configureStore({
  reducer: {
    language: languageSlice.reducer,
  },
  middleware: middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;