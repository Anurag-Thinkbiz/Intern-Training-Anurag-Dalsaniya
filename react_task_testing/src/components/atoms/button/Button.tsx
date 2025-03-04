import { StyledButton } from "../../styles/button.style";
import { JSX } from "react";
export type ButtonPropsType = {
  text: string;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
};

export const Button = ({
  text,
  onClick,
  type,
  disabled,
}: ButtonPropsType): JSX.Element => {
  return (
    <StyledButton onClick={onClick} type={type} disabled={disabled}>
      {text}
    </StyledButton>
  );
};
