import { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { userEvent, within } from "@storybook/test";
import authReducer from "../../../redux/slices/auth.slice";
import LoginPage from "./Login";
import {
  authSliceType,
  languageReduxType,
} from "../../../data/modal/types/reduxTypes/reduxType";
import Navbar from "../../organisms/navbar/Navbar";
import { ToastContainer } from "react-toastify";

const createTestStore = (initialState: {
  auth: authSliceType;
  language: languageReduxType;
}) =>
  configureStore({
    reducer: { auth: authReducer, language: () => initialState.language },
    preloadedState: initialState,
  });

export default {
  component: LoginPage,
  decorators: [
    (Story) => {
      const store = createTestStore({
        auth: { token: null },
        language: { language: "en" },
      });
      return (
        <Provider store={store}>
          <BrowserRouter>
            <Story />
            <ToastContainer></ToastContainer>
          </BrowserRouter>
        </Provider>
      );
    },
  ],
} as Meta;

type Story = StoryObj<typeof LoginPage>;

export const LoggedOut: Story = {
  render: () =><>
  <Navbar></Navbar>
  <LoginPage></LoginPage>
  </>,
  play: async ({ canvasElement }: { canvasElement: any }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByLabelText("email", { selector: "input" });
    await userEvent.type(emailInput, "test@example.com", { delay: 100 });

    const passwordInput = canvas.getByLabelText("password", {
      selector: "input",
    });
    await userEvent.type(passwordInput, "Test@1234", { delay: 100 });

    const submitButton = canvas.getByRole("button", { name: /login/i });
    await userEvent.click(submitButton);
  },
};

export const LoggedIn: Story = {
  render: () => (
    <Provider
      store={createTestStore({
        auth: { token: "mock-token" },
        language: { language: "en" },
      })}
    >
      <Navbar></Navbar>
      <LoginPage />
    </Provider>
  ),
};
