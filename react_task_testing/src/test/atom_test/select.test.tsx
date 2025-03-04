import { render, screen, fireEvent } from "@testing-library/react";
import SelectMenu from "../../components/atoms/selectMenu/SelectMenu";
import "@testing-library/jest-dom";
describe("SelectMenu Component", () => {
  const mockOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  test("renders select menu with options", () => {
    render(
      <SelectMenu options={mockOptions} onChange={() => {}} value="option1" />
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    mockOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  test("calls onChange handler when an option is selected", () => {
    const handleChange = jest.fn();

    render(
      <SelectMenu
        options={mockOptions}
        onChange={handleChange}
        value="option1"
      />
    );

    const selectElement = screen.getByRole("combobox");

    fireEvent.change(selectElement, { target: { value: "option2" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test("renders the correct selected value", () => {
    render(
      <SelectMenu options={mockOptions} onChange={() => {}} value="option2" />
    );

    const selectElement = screen.getByRole("combobox") as HTMLSelectElement;

    expect(selectElement.value).toBe("option2");
  });
});
