import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../../components/atoms/button/Button";
import "@testing-library/jest-dom";
describe("Button Component", () => {
  test("renders the button with text", () => {
    render(<Button text="Click Me" type="button" />);
    const buttonElement = screen.getByRole("button", { name: /Click Me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button text="Click Me" type="button" onClick={handleClick} />);

    const buttonElement = screen.getByRole("button", { name: /Click Me/i });
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders as disabled when disabled prop is true", () => {
    render(<Button text="Disabled" type="button" disabled />);

    const buttonElement = screen.getByRole("button", { name: /Disabled/i });
    expect(buttonElement).toBeDisabled();
  });

  test("does not trigger onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button text="Disabled" type="button" onClick={handleClick} disabled />
    );

    const buttonElement = screen.getByRole("button", { name: /Disabled/i });
    fireEvent.click(buttonElement);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
