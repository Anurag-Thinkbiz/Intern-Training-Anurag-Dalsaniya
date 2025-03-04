import { render, screen } from "@testing-library/react";
import DashboardNavbar from "../../components/molecules/dashboardButtons/DashboardNavbar";
import UserContext from "../../context/userContext";
import "@testing-library/jest-dom";
jest.mock("react-router-dom", () => ({
  NavLink: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("DashboardNavbar Component", () => {
  const renderWithContext = (contextValue: any) => {
    return render(
      <UserContext.Provider value={contextValue}>
        <DashboardNavbar />
      </UserContext.Provider>
    );
  };

  test("renders the navbar with myDetails link", () => {
    renderWithContext({ role: "user" });

    expect(screen.getByText("myDetails")).toBeInTheDocument();
    expect(screen.getByText("myDetails")).toHaveAttribute("href", "/details");
    expect(screen.queryByText("report")).not.toBeInTheDocument();
  });

  test("renders report link when user is an admin", () => {
    renderWithContext({ role: "admin" });

    expect(screen.getByText("myDetails")).toBeInTheDocument();
    expect(screen.getByText("report")).toBeInTheDocument();
    expect(screen.getByText("report")).toHaveAttribute(
      "href",
      "/details/report"
    );
  });

  test("does not render report link when user is not an admin", () => {
    renderWithContext({ role: "user" });

    expect(screen.queryByText("report")).not.toBeInTheDocument();
  });

  test("handles null user context gracefully", () => {
    renderWithContext(null);

    expect(screen.getByText("myDetails")).toBeInTheDocument();
    expect(screen.queryByText("report")).not.toBeInTheDocument();
  });
});
