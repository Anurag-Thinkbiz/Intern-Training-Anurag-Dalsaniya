import { JSX } from "react";

type ButtonPropsType = {
  text: string;
  onClick: () => void;
};

export const Button = ({ text, onClick }: ButtonPropsType): JSX.Element => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
};
