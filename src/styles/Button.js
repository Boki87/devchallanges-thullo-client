import styled, { css } from "styled-components";

const Button = styled.button`
  height: 45px;
  min-width: 70px;
  margin: 10px 0px;
  border: none;
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
