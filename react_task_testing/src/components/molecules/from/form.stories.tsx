import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import Form from "./Form";
import { BrowserRouter } from "react-router-dom";
import {
  FormContainer,
  FormHeading,
} from "../../styles/formStyle/formOrganisms.style";

const meta: Meta<typeof Form> = {
  component: Form,
  decorators: [
    (Story) => (
      <>
        <BrowserRouter>
          <FormContainer>
            <FormHeading>Register</FormHeading>
            <Story />
          </FormContainer>
        </BrowserRouter>
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Form>;

export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nameInput = canvas.getByLabelText("name", {
      selector: "input",
    });

    await userEvent.type(nameInput, "anurag", {
      delay: 100,
    });

    const passwordInput = canvas.getByLabelText("password", {
      selector: "input",
    });

    await userEvent.type(passwordInput, "Ef23@", {
      delay: 100,
    });

    const emailInput = canvas.getByLabelText("email", {
      selector: "input",
    });

    await userEvent.type(emailInput, "example-email@email.com", {
      delay: 100,
    });
    const addressInput = canvas.getByLabelText("address", {
      selector: "input",
    });
    await userEvent.type(addressInput, "sidsar anurag dalsaniya", {
      delay: 100,
    });

    const submitButton = canvas.getByRole("button");

    await userEvent.click(submitButton);
  },
};
