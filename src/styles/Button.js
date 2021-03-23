import styled, { css } from "styled-components";

const Button = styled.button`
  height: 30px;
  min-width: 10px;
  border: none;
  padding: 0px 15px;
  border-radius: 8px;
  background: ${({ bg }) => (bg ? bg : `var(--blue)`)};
  color: ${({ color }) => (color ? color : `var(--white)`)};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--bs1);
  outline: none;
  font-size: 1rem;
  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  &:hover {
    filter: brightness(90%);
  }

  ${(props) =>
    props.disabled &&
    css`
      filter: brightness(90%);
    `}
`;

export default Button;
