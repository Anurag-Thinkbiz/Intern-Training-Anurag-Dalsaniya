import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import { action } from "@storybook/addon-actions";

// ✅ Wrapper Component for Managing Input State
const InputWrapper = (args: any) => {
  const [inputValue, setInputValue] = useState(args.value || "");

  return (
    <Input
      {...args}
      value={inputValue}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        action("Value changed")(e.target.value); // ✅ Logs value changes
      }}
    />
  );
};

const meta: Meta<typeof Input> = {
  component: InputWrapper, // ✅ Use wrapper component
  tags: ["autodocs"],
  argTypes: {
    type: { control: "radio", options: ["text", "email", "password", "number"] },
    value: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof InputWrapper>;

// ✅ Default Input Story
export const Default: Story = {
  args: {
    type: "text",
    name: "username",
    value: "anurag",
    labelText: "Username",
    htmlForLabel: "username",
    placeholder: "Enter your username",
  },
};

// ✅ Input with Error Message
export const WithError: Story = {
  args: {
    ...Default.args,
    touchedFields: true,
    error: "This field is required",
    value: "nbbnn",
    type: "email"
  },
};

// ✅ Password Input Story
export const PasswordField: Story = {
  args: {
    ...Default.args,
    type: "password",
    name: "password",
    labelText: "Password",
    htmlForLabel: "password",
    placeholder: "Enter your password",
    value: "ghfhgfhfgfg"
  },
};
