import { render, screen } from "@testing-library/react";
import Navbar from "../../components/organisms/navbar/Navbar";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useLocation: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Navbar Component", () => {
  let store: any;
  let useLocationMock: jest.Mock;

  beforeEach(() => {
    store = mockStore({
      auth: { token: null },
      language: { language: "en" },
    });

    store.dispatch = jest.fn();
    useLocationMock = require("react-router-dom").useLocation;
  });

  test("renders navbar correctly", () => {
    useLocationMock.mockReturnValue({ pathname: "/" });

    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    expect(screen.getByText("ReactJS")).toBeInTheDocument();
    expect(screen.getByText("register")).toBeInTheDocument();
    expect(screen.getByText("login")).toBeInTheDocument();
  });

  test("redirects to login if no token is found", () => {
    useLocationMock.mockReturnValue({ pathname: "/" });

    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    expect(screen.getByText("login")).toBeInTheDocument();
  });

  test("shows profile icon when user is logged in", () => {
    useLocationMock.mockReturnValue({ pathname: "/" });

    store = mockStore({
      auth: { token: "valid_token" },
      language: { language: "en" },
    });

    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBeGreaterThan(0);
  });

  test("should not show Login button when on login page", () => {
    useLocationMock.mockReturnValue({ pathname: "/login" });

    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    expect(screen.queryByText("login")).not.toBeInTheDocument();
    expect(screen.getByText("register")).toBeInTheDocument();
  });

  test("should not show Register button when on register page", () => {
    useLocationMock.mockReturnValue({ pathname: "/register" });

    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    expect(screen.queryByText("register")).not.toBeInTheDocument();
    expect(screen.getByText("login")).toBeInTheDocument();
  });
});
