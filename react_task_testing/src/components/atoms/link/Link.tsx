import { linkType } from "../../../data/modal/types/hookTypes/hookType";
import { StyledLink } from "../../styles/button.style";

const Link = ({ src, text }: linkType) => {
  return <StyledLink href={src}>{text}</StyledLink>;
};
export default Link;
