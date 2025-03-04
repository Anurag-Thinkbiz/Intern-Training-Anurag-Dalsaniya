import { Button } from "./Button";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    type: { control: "radio", options: ["button", "submit", "reset"] },
    disabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    text: "Click Me",
    type: "button",
    disabled: false,
    onClick: action("Button Clicked"),
  },
};

export const Disabled: Story = {
  args: {
    text: "Disabled",
    type: "button",
    disabled: true,
    onClick: action("Disabled Button Clicked"),
  },
};

export const Submit: Story = {
  args: {
    text: "Submit",
    type: "submit",
    disabled: false,
    onClick: action("Disabled Button Clicked"),
  },
};

