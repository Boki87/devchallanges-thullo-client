import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { SelectButton } from "../styles/SelectButton";
import LabelPill from "./LabelPill";

const SelectStyled = styled.div`
  position: relative;

  .options {
    width: 245px;
    min-height: 280px;
    padding: 8px;
    background: var(--bgWhite);
    border: var(--border-light);
    border-radius: 12px;
    position: absolute;
    top: 40px;
    left: 0px;
    overflow: hidden;
    overflow-y: auto;
    z-index: 30;
    h4 {
      color: var(--textDark);
      font-size: 0.8rem;
    }
    p {
      color: var(--textGrey);
      font-size: 0.8rem;
    }

    .results-container {
      width: 100%;
      min-height: 100px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-rows: auto;
      grid-gap: 8px;

      .color-tile {
        border-radius: 4px;
        cursor: pointer;
      }
    }

    .search-input {
      width: 100%;
      height: 32px;
      border-radius: 8px;
      box-shadow: var(--bs1);
      margin: 12px 0px 20px;
      position: relative;
      input {
        width: 100%;
        height: 100%;
        border-radius: inherit;
        font-size: 0.8rem;
        color: var(--textDark);
        padding-left: 15px;
        border: var(--border-light);
        outline: none;
        &:focus {
          border: 1px solid var(--blue);
        }
      }

      .searchBtn {
        cursor: pointer;
        border: none;
        width: 28px;
        height: 28px;
        border-radius: 8px;
        background: var(--blue);
        color: var(--white);
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 2px;
        right: 2px;
        .material-icons {
          font-size: 1rem;
        }
      }
    }
  }

  .available-labels-container {
    display: flex;
    flex-wrap: wrap;
    -webkit-gap: 5px;
    gap: 5px;
  }
`;

export default function LabelSelect({
  labels,
  btnStyle,
  onAddLabel,
  onRemoveLabel,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [labelTitle, setLabelTitle] = useState("");
  const [activeColor, setActiveColor] = useState("");
  const ref = useRef(null);

  const labelColors = [
    "#219653",
    "#F2C94C",
    "#F2994A",
    "#EB5757",
    "#2F80ED",
    "#56CCF2",
    "#6FCF97",
    "#333333",
    "#4F4F4F",
    "#828282",
    "#BDBDBD",
    "#E0E0E0",
  ];

  useOutsideClick(ref, closeDropdown);

  useEffect(() => {
    if (!showOptions) {
      setLabelTitle("");
      setActiveColor("");
    }
  }, [showOptions]);

  useEffect(() => {
    function listenForEscKey(event) {
      if (event.key === "Escape") {
        closeDropdown();
      }
    }

    window.addEventListener("keyup", listenForEscKey);

    return () => window.removeEventListener("keyup", listenForEscKey);
  }, []);

  function closeDropdown() {
    setShowOptions(false);
  }

  function addLabelHandler() {
    onAddLabel({
      title: labelTitle,
      color: activeColor,
    });
    setLabelTitle("");
    setActiveColor("");
  }

  function preventReturn(e) {
    if (e.which === 13 /* Enter */) {
      //handle return action here
      if (labelTitle !== "" && activeColor !== "") {
        addLabelHandler();
      }
      e.preventDefault();
    }
  }
  return (
    <SelectStyled ref={ref}>
      <SelectButton onClick={() => setShowOptions(true)} style={btnStyle}>
        <div className="icon">
          <span className="material-icons">label</span>
        </div>
        <span>Labels</span>
      </SelectButton>
      {showOptions && (
        <div className="options">
          <h4>Label</h4>
          <p>Type a name and select a color</p>

          <div className="search-input">
            <input
              type="text"
              placeholder="Label..."
              value={labelTitle}
              onChange={(e) => setLabelTitle(e.target.value)}
              onKeyPress={preventReturn}
            />
            <div
              className="searchBtn"
              style={{
                pointerEvents:
                  labelTitle !== "" && activeColor !== "" ? "auto" : "none",
                background:
                  labelTitle !== "" && activeColor !== ""
                    ? "var(--blue)"
                    : "var(--grey)",
              }}
              onClick={addLabelHandler}
            >
              <span className="material-icons">add</span>
            </div>
          </div>

          <div className="results-container">
            {labelColors.map((color) => (
              <div
                style={{
                  background: color,
                  border:
                    color === activeColor
                      ? "2px solid #555"
                      : "2px solid transparent",
                }}
                className="color-tile"
                onClick={() => setActiveColor(color)}
                key={color}
              ></div>
            ))}
          </div>
          <div className="available-labels">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "0.8rem",
                color: "var(--textGrey)",
                margin: "10px 0px",
              }}
            >
              <span className="material-icons">label</span>
              <span>Available</span>
            </div>
            <div className="available-labels-container">
              {labels.map((label) => (
                <LabelPill
                  label={label}
                  key={label._id}
                  removable={true}
                  removeLabel={onRemoveLabel}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </SelectStyled>
  );
}
