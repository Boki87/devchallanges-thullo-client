import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const SelectStyled = styled.div`
  position: relative;

  .btn {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    color: var(--white);
    background: var(--blue);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      filter: brightness(90%);
    }
  }

  .options {
    width: 150px;
    min-height: 50px;
    max-height: 200px;
    background: var(--bgWhite);
    border: var(--border-light);
    border-radius: 12px;
    position: absolute;
    top: 40px;
    left: 0px;
    overflow: hidden;
    overflow-y: auto;
    z-index: 1;
    .option {
      width: 100%;
      height: 35px;
      display: flex;
      align-items: center;
      /* padding-left: 20px; */
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      background: var(--bgWhite);
      color: var(--textBlack);
      &:hover {
        filter: brightness(90%);
      }
      .icon {
        padding: 0px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--textGrey);
      }
    }
  }
`;

export default function AddMemberDropdown() {
  const [showOptions, setShowOptions] = useState(false);

  const ref = useRef(null);

  useOutsideClick(ref, closeDropdown);

  function closeDropdown() {
    setShowOptions(false);
  }

  return (
    <SelectStyled ref={ref}>
      <div className="btn" onClick={() => setShowOptions(true)}>
        +
      </div>
      {showOptions && <div className="options">asd</div>}
    </SelectStyled>
  );
}
