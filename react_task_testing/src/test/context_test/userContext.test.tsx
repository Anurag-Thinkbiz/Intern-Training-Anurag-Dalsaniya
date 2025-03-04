import { render, screen, waitFor } from "@testing-library/react";
import UserContext, { UserContextProvider } from "../../context/userContext";
import useGetDetails from "../../hooks/useDetails";
import "@testing-library/jest-dom";

jest.mock("../../hooks/useDetails");

const mockGetDetails = useGetDetails as jest.MockedFunction<
  typeof useGetDetails
>;

describe("UserContextProvider", () => {
  it("fetches user data and provides it to consumers", async () => {
    const mockUser = {
      address: "123 Test St",
      email: "test@example.com",
      name: "John Doe",
      password: "hashedpassword",
      role: "user",
    };

    mockGetDetails.mockReturnValue({
      getDetails: jest.fn().mockResolvedValue(mockUser),
    });

    const TestComponent = () => {
      return (
        <UserContextProvider>
          <UserContext.Consumer>
            {(user) => <div data-testid="user-name">{user?.name}</div>}
          </UserContext.Consumer>
        </UserContextProvider>
      );
    };

    render(<TestComponent />);

    await waitFor(() =>
      expect(screen.getByTestId("user-name")).toHaveTextContent("John Doe")
    );

    expect(mockGetDetails().getDetails).toHaveBeenCalledTimes(1);
  });

  it("handles errors gracefully", async () => {
    mockGetDetails.mockReturnValue({
      getDetails: jest.fn().mockRejectedValue(new Error("Failed to fetch")),
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <UserContextProvider>
        <UserContext.Consumer>
          {(user) => (
            <div data-testid="user-name">{user?.name || "No Data"}</div>
          )}
        </UserContext.Consumer>
      </UserContextProvider>
    );

    await waitFor(() =>
      expect(screen.getByTestId("user-name")).toHaveTextContent("No Data")
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error fetching user data:",
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });
});
