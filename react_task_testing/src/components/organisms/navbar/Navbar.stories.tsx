import type { Meta, StoryObj } from "@storybook/react";
import Navbar from "./Navbar";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import languageReducer, {
  changeLanguage,
} from "../../../redux/slices/language.slice";
import authReducer from "../../../redux/slices/auth.slice";
import {
  authSliceType,
  languageReduxType,
} from "../../../data/modal/types/reduxTypes/reduxType";
import i18n from "../../../translation/i18config";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";

const createTestStore = (initialState: {
  auth: authSliceType;
  language: languageReduxType;
}) =>
  configureStore({
    reducer: {
      auth: authReducer,
      language: languageReducer,
    },
    preloadedState: initialState,
  });
const meta: Meta<typeof Navbar> = {
  component: Navbar,
  decorators: [
    (Story) => {
      const store = createTestStore({
        auth: { token: null },
        language: { language: "en" },
      });

      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  decorators: [
    (Story) => {
      return (
        <BrowserRouter>
          <I18nextProvider i18n={i18n}>
            <Story />
          </I18nextProvider>
        </BrowserRouter>
      );
    },
  ],
};

export const LoggedIn: Story = {
  decorators: [
    (Story) => {
      const store = createTestStore({
        auth: { token: "mockAccessToken" },
        language: { language: "en" },
      });

      return (
        <BrowserRouter>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <Story />
            </I18nextProvider>
          </Provider>
        </BrowserRouter>
      );
    },
  ],
};

export const LanguageChange: Story = {
  decorators: [
    (Story) => {
      const store = createTestStore({
        auth: { token: "mockAccessToken" },
        language: { language: "en" },
      });

      store.dispatch(changeLanguage("hi"));

      return (
        <BrowserRouter>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <Story />
            </I18nextProvider>
          </Provider>
        </BrowserRouter>
      );
    },
  ],
};

// Redirect if no user is logged in
export const NoUserRedirect: Story = {
  decorators: [
    (Story) => {
      const store = createTestStore({
        auth: { token: null },
        language: { language: "en" },
      });

      return (
        <BrowserRouter>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <Story />
            </I18nextProvider>
          </Provider>
        </BrowserRouter>
      );
    },
  ],
};
