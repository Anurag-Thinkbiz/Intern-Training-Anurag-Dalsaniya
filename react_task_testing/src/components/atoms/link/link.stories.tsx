import type { Meta, StoryObj } from "@storybook/react";
import Link from "./Link";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof Link> = {
  component: Link,
  decorators: [(Story) => <MemoryRouter>{<Story />}</MemoryRouter>],
  tags: ["autodocs"],
  argTypes: {
    src: { control: "text" },
    text: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    src: "https://example.com",
    text: "Click here",
  },
};

export const ExternalLink: Story = {
  args: {
    src: "https://www.google.com",
    text: "Go to Google",
  },
};

export const InternalLink: Story = {
  args: {
    src: "/about",
    text: "About Us",
  },
};
