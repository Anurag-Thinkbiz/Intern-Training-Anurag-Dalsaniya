import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import SelectMenu from "./SelectMenu";

export default {
  component: SelectMenu,
} as Meta;

const options = [
  { value: "en", label: "english" },
  { value: "hi", label: "hindi" },
];

type Story = StoryObj<typeof SelectMenu>;

export const Default: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState(options[0].value);

    return (
      <SelectMenu
        {...args}
        options={options}
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      />
    );
  },
};

export const PreSelectedOption: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState("option2");

    return (
      <SelectMenu
        {...args}
        options={options}
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      />
    );
  },
};
export const InteractionTest: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState(options[0].value);

    return (
      <SelectMenu
        {...args}
        options={options}
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectInput = canvas.getByRole("combobox");

    await userEvent.selectOptions(selectInput, "option2");
  },
};
