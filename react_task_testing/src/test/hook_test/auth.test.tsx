import { renderHook, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import MockAdapter from "axios-mock-adapter";
import useAuth from "../../hooks/useAuth";
import { API } from "../../services/service";
import { logIn } from "../../redux/slices/auth.slice";
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockedNavigate = jest.fn();
const mockedDispatch = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigate,
}));

jest.mock("../../data/modal/types/hookTypes/hookType", () => ({
  useAppDispatch: () => mockedDispatch,
}));

const mockAxios = new MockAdapter(API);

describe("useAuth Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  test("should log in successfully and navigate", async () => {
    const mockToken = "mocked-access-token";

    mockAxios.onPost("/login").reply(200, mockToken);

    const { result } = renderHook(() => useAuth(), {
      wrapper: BrowserRouter,
    });

    await act(async () => {
      result.current.authUser({
        email: "test@example.com",
        password: "Anurag@123",
      });
    });

    expect(mockedDispatch).toHaveBeenCalledWith(logIn(mockToken));
    expect(mockedNavigate).toHaveBeenCalledWith("/details");
    expect(toast.success).toHaveBeenCalledWith("Successfully logged in!");
  });

  test("should show error toast when login fails with 401", async () => {
    mockAxios.onPost("/login").reply(401, { message: "Invalid credentials" });
    const { result } = renderHook(() => useAuth(), {
      wrapper: BrowserRouter,
    });

    await act(async () => {
      result.current.authUser({
        email: "test@example.com",
        password: "wrongpassword",
      });
    });

    expect(mockedDispatch).not.toHaveBeenCalled();
    expect(mockedNavigate).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith(
      "Error: Request failed with status code 401"
    );
  });

  test("should show error toast on network error", async () => {
    mockAxios.onPost("/login").networkError();

    const { result } = renderHook(() => useAuth(), {
      wrapper: BrowserRouter,
    });

    await act(async () => {
      result.current.authUser({
        email: "test@example.com",
        password: "Anurag@123",
      });
    });

    expect(mockedDispatch).not.toHaveBeenCalled();
    expect(mockedNavigate).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith(expect.stringMatching(/Error:/));
  });
  test("should show error toast when API returns 404 (Not Found)", async () => {
    mockAxios.onPost("/login").reply(404, { message: "Endpoint not found" });

    const { result } = renderHook(() => useAuth(), { wrapper: BrowserRouter });

    await act(async () => {
      result.current.authUser({
        email: "test@example.com",
        password: "Anurag@123",
      });
    });

    expect(mockedDispatch).not.toHaveBeenCalled();
    expect(mockedNavigate).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith(
      "Error: Request failed with status code 404"
    );
  });
});
