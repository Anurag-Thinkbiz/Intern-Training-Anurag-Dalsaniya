import styled from "styled-components";

export const StyledSelect = styled.select`
  padding: 10px 15px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #4caf50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
  }

  option {
    padding: 10px;
  }
`;
