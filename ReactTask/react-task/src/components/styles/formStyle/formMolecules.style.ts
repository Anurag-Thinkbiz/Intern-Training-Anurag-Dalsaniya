import styled from 'styled-components';

export  const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content:center;
  align-items:center;
`;

export const FormSection = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #333;
  font-weight: 600;
  display:flex;
  align-items:center;
  justify-content:center;
`;

export const InputField = styled.input<{ error?: string }>`
  padding: 12px;
  border: 1px solid ${(props) => (props.error ? 'red' : '#ccc')};
  border-radius: 4px;
  font-size: 14px;
  &:focus {
    border-color: #007BFF;
    outline: none;
  }
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  position: absolute;
  width:10px;
  overflow:hidden;
`;

