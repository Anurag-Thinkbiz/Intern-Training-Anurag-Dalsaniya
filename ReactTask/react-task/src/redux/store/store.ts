import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";
import { languageSlice } from "../slices/language.slice";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import {
  authSliceType,
  languageReduxType,
} from "../../data/modal/types/reduxTypes/reduxType";
import { authSlice } from "../slices/auth.slice";

const rootReducer: Reducer<{
  language: languageReduxType;
  auth: authSliceType;
}> = combineReducers({
  language: languageSlice.reducer,
  auth: authSlice.reducer,
});

const persistentConfig = {
  key: "root",
  storage,
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistentConfig, rootReducer);

const middleware = (getDefaultMiddleware: any) => {
  return getDefaultMiddleware({
    serializableCheck: false,
  }).concat(logger);
};

const store = configureStore({
  reducer: persistedReducer,
  middleware: middleware,
});

export default store;
export const persistedStore = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
