import styled from "styled-components";

export const SelectButton = styled.div`
  width: 120px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  background: var(--bgGrey);
  color: var(--textGrey);
  font-size: 1rem;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &:hover {
    filter: brightness(90%);
  }
  .icon {
    padding: 0px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
