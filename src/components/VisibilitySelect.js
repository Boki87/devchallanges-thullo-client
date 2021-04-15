import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { SelectButton } from "../styles/SelectButton";
import Button from "../styles/Button";
import Spinner from "./Spinner";

const SelectStyled = styled.div`
  position: relative;
  .options {
    width: 245px;
    min-height: 50px;
    max-height: 220px;
    padding: 10px;
    background: var(--bgWhite);
    border: var(--border-light);
    border-radius: 12px;
    position: absolute;
    top: 40px;
    left: 0px;
    overflow: hidden;
    overflow-y: auto;
    box-shadow: var(--bs2);
    z-index: 20;
    h4 {
      color: var(--textDark);
      font-size: 0.8rem;
    }
    p {
      color: var(--textGrey);
      font-size: 0.8rem;
    }

    .option {
      width: 100%;
      height: 58px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 0.8rem;
      padding: 10px;
      cursor: pointer;
      &:hover {
        background: var(--bgGrey);
      }
      .top {
        color: var(--textGrey);
        display: flex;
        align-items: center;
        gap: 10px;
        .material-icons {
          font-size: 1.1rem;
        }
      }
      p {
        font-size: 0.7rem;
      }
    }
  }
`;

export default function InviteMemberDropdown({
  visibility = "public",
  changeVisibility,
}) {
  const [showOptions, setShowOptions] = useState(false);

  const ref = useRef(null);

  useOutsideClick(ref, closeDropdown);

  function closeDropdown() {
    setShowOptions(false);
  }

  function changeVisibilityHandler(val) {
    changeVisibility(val);
    closeDropdown();
  }

  return (
    <SelectStyled ref={ref}>
      <SelectButton
        style={{ textTransform: "capitalize" }}
        onClick={() => setShowOptions(true)}
      >
        <div className="icon">
          <span className="material-icons">
            {visibility === "public" ? "public" : "lock"}
          </span>
        </div>
        <span>{visibility}</span>
      </SelectButton>
      {showOptions && (
        <div className="options">
          <h4>Visibility</h4>
          <p>Choose who can see this board.</p>

          <div
            className="option"
            onClick={() => changeVisibilityHandler("public")}
          >
            <div className="top">
              <span className="material-icons">public</span>
              <span>Public</span>
            </div>
            <p>Anyone on the internet can see this</p>
          </div>

          <div
            className="option"
            onClick={() => changeVisibilityHandler("private")}
          >
            <div className="top">
              <span className="material-icons">lock</span>
              <span>Private</span>
            </div>
            <p>Only board members can see this</p>
          </div>
        </div>
      )}
    </SelectStyled>
  );
}
