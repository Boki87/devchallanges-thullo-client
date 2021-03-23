import styled from "styled-components";

const Input = styled.input`
  height: 35px;
  margin: 10px 0px;
  border: var(--border-light);
  border-radius: 8px;
  padding-left: 15px;
  color: var(--textBlack);
  box-shadow: var(--bs1);
  outline: none;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  :focus {
    border: 1px solid var(--blue);
  }
`;

export default Input;
