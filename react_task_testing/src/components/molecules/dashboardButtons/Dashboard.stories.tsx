import { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import UserContext from "../../../context/userContext";

export default {
  component: DashboardNavbar,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} as Meta;

type Story = StoryObj<typeof DashboardNavbar>;

const Template = (args: any) => (
  <UserContext.Provider value={args.user}>
    <DashboardNavbar />
  </UserContext.Provider>
);

export const DefaultUser: Story = {
  render: (args: any) => <Template {...args} />,
  args: {
    user: { role: "user" },
  },
};

export const AdminUser: Story = {
  render: (args: any) => <Template {...args} />,
  args: {
    user: { role: "admin" },
  },
};
