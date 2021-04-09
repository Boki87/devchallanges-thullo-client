import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../styles/Button";
import { useOvermind } from "../../store";

const NewListButtonStyled = styled.div`
  min-width: 245px;
  min-height: 32px;
  margin: 0px 10px;
  position: relative;

  .add-card-action {
    width: 100%;
    height: 32px;
    border-radius: 8px;
    padding: 0px 12px;
    background: var(--lightBlue);
    color: var(--blue);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover {
      filter: brightness(90%);
    }
  }

  .new-button-form {
    border-radius: 8px;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 64px;
    background: var(--white);
    display: flex;
    flex-direction: column;
    padding: 15px;
    input {
      border: none;
      font-size: 0.9rem;
      width: 100%;
      height: 32px;
      outline: none;
      color: var(--textDark);
      margin-bottom: 5px;
    }
    .new-button-form--actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .material-icons {
        cursor: pointer;
      }
    }
  }
`;

export default function NewListButton({ boardId }) {
  const [showForm, setShowForm] = useState(false);
  const [newListName, setNewListName] = useState("");

  const {
    state: { lists: listsState },
    actions: { lists: listsActions },
  } = useOvermind();

  function addNewListHandler() {
    //ajax to add new list
    if (newListName.trim() === "") {
      return;
    }

    let newPosition = 0;

    if (listsState.lists.length > 0) {
      newPosition = Math.max(...listsState.lists.map((l) => l.position)) + 1;
    }

    console.log(newListName, newPosition);
    listsActions.createNewList({
      title: newListName,
      boardId,
      position: newPosition,
    });
    closeForm();
  }

  function closeForm() {
    setShowForm(false);
    setNewListName("");
  }

  return (
    <NewListButtonStyled>
      <div className="add-card-action" onClick={() => setShowForm(true)}>
        <span>Add another list</span>
        <span className="material-icons">add</span>
      </div>
      {showForm && (
        <div className="new-button-form">
          <input
            type="text"
            placeholder="Enter a title for this list..."
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <div className="new-button-form--actions">
            <Button
              disabled={newListName.trim() === ""}
              bg="var(--green)"
              color="#fff"
              onClick={addNewListHandler}
            >
              Add List
            </Button>
            <span className="material-icons" onClick={closeForm}>
              close
            </span>
          </div>
        </div>
      )}
    </NewListButtonStyled>
  );
}
