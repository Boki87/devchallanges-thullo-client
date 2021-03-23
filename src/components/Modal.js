import React from "react";
import styled from "styled-components";

const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  .modal-content {
    margin-top: 10%;
    margin-bottom: 50px;
    border-radius: 8px;
    background: var(--bgWhite);
    box-shadow: var(--bs1);
  }
`;

export default function Modal({ show, onClose, children }) {
  return (
    <>
      {show && (
        <ModalStyled onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </ModalStyled>
      )}
    </>
  );
}
