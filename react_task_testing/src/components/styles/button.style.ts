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

export const StyledLink = styled.a`
  color: #007bff; /* Blue color for the link */
  text-decoration: none; /* Remove the underline */
  font-size: 16px; /* Adjust font size */
  font-weight: 500; /* Slightly bold text */
  transition: all 0.3s ease; /* Smooth transition for hover effects */

  &:hover {
    color: #0056b3; /* Darker blue color when hovered */
    text-decoration: underline; /* Underline on hover */
  }

  &:active {
    color: #004085; /* Color when clicked */
  }

  &:visited {
    color: #6c757d; /* Color after the link is visited */
  }
`;
