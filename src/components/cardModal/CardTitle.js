import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const CardTitleStyled = styled.div`
  margin: 24px 0px;

  .card-title-input {
    border: none;
    font-size: 1rem;
    color: var(--textBlack);
  }

  p {
    font-size: 1rem;
    color: var(--textBlack);
  }
  span {
    color: var(--textGrey);
    font-size: 0.8rem;
    strong {
      color: var(--textBlack);
    }
  }
`;

export default function CardTitle({ title, listTitle, onTitleChange }) {
  const [showInput, setShowInput] = useState(false);

  const ref = useRef();

  useOutsideClick(ref, function () {
    onTitleChange(ref.current.value);
    setShowInput(false);
  });

  function focusInput() {
    setShowInput(true);
    setTimeout(() => {
      ref.current.focus();
    });
  }

  return (
    <CardTitleStyled>
      {!showInput && <p onClick={focusInput}>{title}</p>}
      {showInput && (
        <div>
          <input
            className="card-title-input"
            defaultValue={title}
            ref={ref}
            type="text"
          />
        </div>
      )}
      <span>
        in list <strong>{listTitle}</strong>
      </span>
    </CardTitleStyled>
  );
}
