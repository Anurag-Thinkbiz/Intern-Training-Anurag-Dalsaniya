import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "../../components/atoms/inputElement/Input";
import "@testing-library/jest-dom";

describe("Input Component", () => {
  test("renders the input field with label", () => {
    render(
      <Input
        type="text"
        name="username"
        value=""
        labelText="Username"
        htmlForLabel="username"
        placeholder="Enter your username"
        registerProps={{}}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter your username");
    const labelElement = screen.getByLabelText("Username");

    expect(inputElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
  });

  test("displays an error message when touched and has an error", () => {
    render(
      <Input
        type="text"
        name="email"
        value=""
        labelText="Email"
        htmlForLabel="email"
        placeholder="Enter email"
        registerProps={{}}
        touchedFields={true}
        error="Email is required"
      />
    );

    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  test("calls onBlur function when input loses focus", () => {
    const handleBlur = jest.fn();

    render(
      <Input
        type="text"
        name="username"
        value=""
        labelText="Username"
        htmlForLabel="username"
        placeholder="Enter your username"
        registerProps={{}}
        onBlur={handleBlur}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter your username");
    fireEvent.blur(inputElement);

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
});
