import React from "react";
import styled from "styled-components";
// import lighten from "@bit/styled-components.polished.color.lighten";
// import darken from "@bit/styled-components.polished.color.darken";
import { lighten, darken } from "polished";

const LabelPillStyled = styled.button`
  border: none;
  min-width: 20px;
  height: 20px;
  padding: 0px 20px;
  background: ${({ color }) => lighten(0.2, color)};
  font-size: 0.8rem;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ color }) => darken(0.3, color)};
  .del-btn {
    cursor: pointer;
    position: absolute;
    right: 0px;
    width: 20px;
    height: 20px;
    display: none;
    justify-content: center;
    align-items: center;
    .material-icons {
      font-size: 1rem;
    }
  }

  &:hover {
    .del-btn {
      display: flex;
    }
  }
`;

export default function LabelPill({ label, removable = false, removeLabel }) {
  const { color, title, _id } = label;

  return (
    <LabelPillStyled color={color}>
      <span>{title}</span>
      {removable && (
        <div className="del-btn" onClick={() => removeLabel(_id)}>
          <span className="material-icons">remove_circle</span>
        </div>
      )}
    </LabelPillStyled>
  );
}
