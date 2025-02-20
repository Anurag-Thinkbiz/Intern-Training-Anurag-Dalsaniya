import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";
import { languageSlice } from "../slices/language.slice";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import { languageReduxType } from "../../data/modal/types/reduxTypes/reduxType";

const rootReducer: Reducer<{
  language: languageReduxType;
}> = combineReducers({
  language: languageSlice.reducer,
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
