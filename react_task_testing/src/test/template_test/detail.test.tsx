import { render, screen } from "@testing-library/react";
import UserDetail from "../../components/templates/userDetail";
import UserContext from "../../context/userContext";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  Outlet: () => <div data-testid="outlet" />,
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("UserDetail Component", () => {
  const renderWithContext = (contextValue: any) => {
    return render(
      <UserContext.Provider value={contextValue}>
        <UserDetail />
      </UserContext.Provider>
    );
  };

  test("renders correctly when user is logged in (snapshot test)", () => {
    const { container } = renderWithContext({
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
    });
    expect(container).toMatchSnapshot();
  });

  test("renders correctly when user is not logged in (snapshot test)", () => {
    const { container } = renderWithContext(null);
    expect(container).toMatchSnapshot();
  });

  test("displays user details when user is available", () => {
    renderWithContext({
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
    });

    expect(screen.getByText("hello")).toBeInTheDocument();
    expect(screen.getByText("email")).toBeInTheDocument();
    expect(screen.getByText("role")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("admin")).toBeInTheDocument();
  });

  test("displays greeting when user is not available", () => {
    renderWithContext(null);

    expect(screen.getByText("greeting")).toBeInTheDocument();
    expect(screen.getByText("newGreeting")).toBeInTheDocument();
  });

  test("renders Outlet component", () => {
    renderWithContext(null);
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
  });
});
