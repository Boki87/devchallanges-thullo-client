import React, { useState } from "react";
import Button from "../styles/Button";
import styled from "styled-components";

const DescriptionBoxStyled = styled.div`
  width: 100%;
  margin: 20px 0px;

  .description-header {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 10px 0px;
    .label {
      font-size: 0.6rem;
      color: var(--textGrey);
      display: flex;
      align-items: center;
      margin: 13px 0px;
      margin-right: 14px;
      .material-icons {
        font-size: 1rem;
        margin-right: 5px;
      }
    }

    button {
      border: 1px solid var(--grey);
      border-radius: 8px;
      width: 62px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--white);
      color: var(--textGrey);
      font-size: 0.7rem;
      cursor: pointer;
      .material-icons {
        font-size: 1rem;
        margin-right: 7px;
      }
      &:hover {
        filter: brightness(95%);
      }
    }
  }

  .description-actions {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  p {
    border: 1px solid transparent;
    width: 100%;
    font-size: 0.8rem;
    line-height: 1.4rem;
    color: var(--textDark);
    padding: 13px;
  }

  textarea {
    border: 1px solid var(--grey);
    border-radius: 8px;
    font-size: 0.8rem;
    color: var(--textDark);
    padding: 13px;
    width: 100%;
    height: 240px;
    outline: none;
    line-height: 1.4rem;
    transition: border 0.3s ease-in-out;
    &:focus {
      border: 1px solid var(--blue);
    }
  }
`;

export default function DescriptionBox({ description, onSave }) {
  const [editMode, setEditMode] = useState(false);

  const [updatedDescription, setUpdatedDescription] = useState(description);

  function cancel() {
    setUpdatedDescription(description);
    setEditMode(false);
  }

  function saveHandler() {
    onSave(updatedDescription);
    setEditMode(false);
  }

  return (
    <DescriptionBoxStyled>
      <div className="description-header">
        <div className="label">
          <span className="material-icons">description</span>
          <span>Description</span>
        </div>

        {!editMode && (
          <button onClick={() => setEditMode(true)}>
            <span className="material-icons">edit</span>
            <span>Edit</span>
          </button>
        )}
      </div>

      {!editMode && (
        <p>
          {description !== "" ? description : "No description... Edit this."}
        </p>
      )}
      {editMode && (
        <textarea
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
        ></textarea>
      )}

      {editMode && (
        <div className="description-actions">
          <Button
            bg="var(--green)"
            color="var(--white)"
            style={{ marginRight: "15px", fontSize: "0.8rem" }}
            onClick={saveHandler}
          >
            Save
          </Button>
          <Button
            bg="var(--white)"
            color="var(--textGrey)"
            style={{ fontSize: "0.8rem" }}
            onClick={cancel}
          >
            Cancel
          </Button>
        </div>
      )}
    </DescriptionBoxStyled>
  );
}
