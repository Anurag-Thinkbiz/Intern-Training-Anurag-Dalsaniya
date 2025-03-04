import { render } from "@testing-library/react";
import Link from "../../components/atoms/link/Link";
jest.mock("../../components/styles/button.style", () => ({
  StyledLink: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

describe("Link Component Snapshot", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <Link src="https://example.com" text="Click Here" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
