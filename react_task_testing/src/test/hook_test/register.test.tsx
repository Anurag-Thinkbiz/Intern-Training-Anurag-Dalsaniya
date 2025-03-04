import { renderHook, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import MockAdapter from "axios-mock-adapter";
import useRegister from "../../hooks/useRegister";
import { API } from "../../services/service";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigate,
}));

const mockAxios = new MockAdapter(API);

describe("useRegister Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  test("should show success toast and navigate on successful registration", async () => {
    mockAxios
      .onPost("/register")
      .reply(200, { message: "successfully created" });

    const { result } = renderHook(() => useRegister(), {
      wrapper: BrowserRouter,
    });

    await act(async () => {
      result.current.registerUser({
        email: "test@example.com",
        password: "Anurag@123",
        role: "user",
        address: "glf;lkdf",
        name: "Anurga",
      });
    });

    expect(mockedNavigate).toHaveBeenCalledWith("/login");
    expect(toast.success).toHaveBeenCalledWith("Successfully registered!");
  });

  test("should show error toast when registration fails with 400 status", async () => {
    mockAxios
      .onPost("/register")
      .reply(400, { message: " Request failed with status code 400" });

    const { result } = renderHook(() => useRegister(), {
      wrapper: BrowserRouter,
    });

    await act(async () => {
      result.current.registerUser({
        email: "test@example.com",
        password: "Anurag@123",
        role: "user",
        address: "glf;lkdf",
        name: "Anurga",
      });
    });

    expect(mockedNavigate).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith(
      "Error: Request failed with status code 400"
    );
  });

  test("should show error toast when registration fails with 409 conflict", async () => {
    mockAxios
      .onPost("/register")
      .reply(409, { message: "User already exists" });

    const { result } = renderHook(() => useRegister(), {
      wrapper: BrowserRouter,
    });

    await act(async () => {
      result.current.registerUser({
        email: "test@example.com",
        password: "Anurag@123",
        role: "user",
        address: "glf;lkdf",
        name: "Anurga",
      });
    });

    expect(mockedNavigate).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith(
      "Error: Request failed with status code 409"
    );
  });

  test("should show error toast on network error", async () => {
    mockAxios.onPost("/register").networkError();

    const { result } = renderHook(() => useRegister(), {
      wrapper: BrowserRouter,
    });

    await act(async () => {
      result.current.registerUser({
        email: "test@example.com",
        password: "Anurag@123",
        role: "user",
        address: "glf;lkdf",
        name: "Anurga",
      });
    });

    expect(mockedNavigate).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith(expect.stringMatching(/Error:/));
  });
});
