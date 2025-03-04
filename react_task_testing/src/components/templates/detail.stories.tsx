import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import UserDetail from "./userDetail";
import UserContext from "../../context/userContext";
import { I18nextProvider } from "react-i18next";
import i18n from "../../translation/i18config";
import Navbar from "../organisms/navbar/Navbar";
import {
  authSliceType,
  languageReduxType,
} from "../../data/modal/types/reduxTypes/reduxType";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../redux/slices/auth.slice";
import languageReducer from "../../redux/slices/language.slice";
import { Provider } from "react-redux";

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

export default {
  component: UserDetail,
  decorators: [
    (Story) => {
      const store = createTestStore({
        auth: { token: null },
        language: { language: "en" },
      });
      return (
        <>
          {" "}
          <MemoryRouter>
            <Provider store={store}>
              <Navbar></Navbar>
            </Provider>
            <I18nextProvider i18n={i18n}>
              <Routes>
                <Route path="/*" element={<Story />} />
              </Routes>
            </I18nextProvider>{" "}
          </MemoryRouter>
        </>
      );
    },
  ],
} as Meta;

type Story = StoryObj<typeof UserDetail>;

export const Default: Story = {
  render: () => (
    <UserContext.Provider
      value={{
        name: "John Doe",
        email: "john@example.com",
        role: "user",
        address: "sidsar",
        password: "anurag123!",
      }}
    >
      <UserDetail />
    </UserContext.Provider>
  ),
};

export const AdminUser: Story = {
  render: () => (
    <UserContext.Provider
      value={{
        name: "Admin",
        email: "admin@example.com",
        role: "admin",
        address: "sidsar",
        password: "anurag123!",
      }}
    >
      <UserDetail />
    </UserContext.Provider>
  ),
};

export const GuestUser: Story = {
  render: () => (
    <UserContext.Provider value={undefined}>
      <UserDetail />
    </UserContext.Provider>
  ),
};
