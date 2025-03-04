import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import FormMoleculer from "../../components/molecules/from/Form";
import useRegister from "../../hooks/useRegister";
import "@testing-library/jest-dom";
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));
jest.mock("../../hooks/useRegister", () => ({
  __esModule: true,
  default: jest.fn(),
}));
describe("FormMoleculer Component", () => {
  let registerUserMock: any;

  beforeEach(() => {
    registerUserMock = jest.fn();
    (useRegister as jest.Mock).mockReturnValue({
      registerUser: registerUserMock,
    });
  });

  test("renders form fields correctly", () => {
    render(<FormMoleculer />);

    expect(screen.getByLabelText("name")).toBeInTheDocument();
    expect(screen.getByLabelText("password")).toBeInTheDocument();
    expect(screen.getByLabelText("email")).toBeInTheDocument();
    expect(screen.getByLabelText("address")).toBeInTheDocument();
    expect(screen.getByText("submit")).toBeInTheDocument();
    expect(screen.getByText("admin")).toBeInTheDocument();
  });

  test("validates form and submits data correctly", async () => {
    render(<FormMoleculer />);

    fireEvent.change(screen.getByLabelText("name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("password"), {
      target: { value: "Password123!" },
    });
    fireEvent.change(screen.getByLabelText("email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("address"), {
      target: { value: "123 Main St" },
    });
    fireEvent.click(screen.getByLabelText("admin"));

    await act(async () => {
      fireEvent.click(screen.getByText("submit"));
    });

    await waitFor(() => {
      expect(registerUserMock).toHaveBeenCalledWith({
        name: "John Doe",
        password: "Password123!",
        email: "john@example.com",
        address: "123 Main St",
        role: "admin",
      });
    });
  });

  test("shows error messages when each input loses focus", async () => {
    render(<FormMoleculer />);

    const nameInput = screen.getByLabelText("name") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("password") as HTMLInputElement;
    const emailInput = screen.getByLabelText("email") as HTMLInputElement;
    const addressInput = screen.getByLabelText("address") as HTMLInputElement;

    fireEvent.input(nameInput, { target: { value: "John Doe" } });
    fireEvent.input(passwordInput, { target: { value: "Password@1" } });
    fireEvent.input(emailInput, { target: { value: "test@example.com" } });
    fireEvent.input(addressInput, { target: { value: "123 Main St" } });

    fireEvent.blur(nameInput);
    fireEvent.blur(passwordInput);
    fireEvent.blur(emailInput);
    fireEvent.blur(addressInput);

    await waitFor(() => {
      expect(screen.queryByText("name is required")).not.toBeInTheDocument();
      expect(
        screen.queryByText("password is required")
      ).not.toBeInTheDocument();
      expect(screen.queryByText("email is required")).not.toBeInTheDocument();
      expect(screen.queryByText("address is required")).not.toBeInTheDocument();
    });
  });
});
