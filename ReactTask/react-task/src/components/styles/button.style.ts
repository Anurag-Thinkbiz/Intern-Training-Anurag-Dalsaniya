import styled from "styled-components";
export const StyledButton = styled.button`
padding: 12px 20px;
background-color: #007bff;
color: white;
border: none;
border-radius: 8px;
font-size: 16px;
font-weight: 600;
cursor: pointer;
transition: background-color 0.3s ease, transform 0.2s ease;

&:hover {
  background-color: #0056b3;
  transform: translateY(-2px); /* Slight lifting effect on hover */
}

&:active {
  background-color: #003f7f;
  transform: translateY(0); /* Button moves back down when clicked */
}

&:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5); /* Focus effect */
}

&:disabled {
  background-color: #cfcfcf;
  color: #a1a1a1;
  cursor: not-allowed;
}
`;
