import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import languageReducer from "../../redux/slices/language.slice";
import { ChangeLanguageMolecules } from "../../components/molecules/changeLanguageMolecules/ChangeLanguageMolecules";
import "@testing-library/jest-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: { changeLanguage: jest.fn() },
  }),
}));

const mockDispatch = jest.fn();
jest.mock("../../data/modal/types/hookTypes/hookType", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn((selector) =>
    selector({ language: { language: "en" } })
  ),
}));

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  language: persistReducer(persistConfig, languageReducer),
});

const middleware = (getDefaultMiddleware: any) => {
  return getDefaultMiddleware({
    serializableCheck: false,
  });
};

const store = configureStore({ reducer: rootReducer, middleware: middleware });
const persistor = persistStore(store);

describe("ChangeLanguageMolecules with Redux Persist", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  test("renders language select dropdown", () => {
    render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ChangeLanguageMolecules />
        </PersistGate>
      </Provider>
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue("en");
  });

  test("updates language when a new option is selected", () => {
    render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ChangeLanguageMolecules />
        </PersistGate>
      </Provider>
    );

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "hi" } });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "language/changeLanguage",
      payload: "hi",
    });
  });
});
