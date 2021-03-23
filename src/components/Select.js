import React, { useRef, useState } from "react";
import styled from "styled-components";
import { SelectButton } from "../styles/SelectButton";
import { useOutsideClick } from "../hooks/useOutsideClick";

const SelectStyled = styled.div`
  position: relative;

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

export default function Select({ value, options = [], onChange }) {
  const [showOptions, setShowOptions] = useState(false);

  const ref = useRef(null);

  useOutsideClick(ref, closeDropdown);

  function closeDropdown() {
    setShowOptions(false);
  }

  function changeHandler(val) {
    onChange(val);
    closeDropdown();
  }

  return (
    <SelectStyled ref={ref}>
      <SelectButton onClick={() => setShowOptions(true)}>
        <div className="icon">{value.icon}</div>
        <span>{value.title}</span>
      </SelectButton>
      {showOptions && (
        <div className="options">
          {options.map((option, i) => (
            <div
              className="option"
              onClick={() => changeHandler(option)}
              key={i}
            >
              <div className="icon">{option.icon && option.icon}</div>
              <span>{option.title}</span>
            </div>
          ))}
        </div>
      )}
    </SelectStyled>
  );
}
