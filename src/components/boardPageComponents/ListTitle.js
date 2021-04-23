import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Button from "../../styles/Button";
import { useOvermind } from "../../store";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const ListTitleStyled = styled.div`
  width: 100%;
  height: 32px;
  margin: 5px 0px;
  position: relative;

  .list-title-action {
    width: 100%;
    height: 32px;
    padding: 0px 8px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--bgGrey);
  }

  .new-button-form {
    border-radius: 8px;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 64px;
    background: var(--white);
    display: flex;
    flex-direction: column;
    padding: 15px;
    box-shadow: var(--bs1);
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

const SelectStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  .material-icons {
    padding: 2px;
    background: var(--bgGrey);
    border-radius: 50%;
    &:hover {
      filter: brightness(95%);
    }
  }

  .options {
    width: 150px;
    min-height: 40px;
    max-height: 200px;
    background: var(--bgWhite);
    border: var(--border-light);
    border-radius: 12px;
    position: fixed;
    top: 40px;
    left: 0px;
    overflow: hidden;
    overflow-y: auto;
    z-index: 10;
    .option {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      /* padding-left: 20px; */
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      background: var(--bgWhite);
      color: var(--textBlack);
      padding: 10px;
      font-size: 0.9rem;
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

function DropdownOptions({ onClick, onRename, onDelete }) {
  const [showOptions, setShowOptions] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const ref = useRef(null);

  useOutsideClick(ref, closeDropdown);

  function closeDropdown() {
    setShowOptions(false);
  }

  function openHandler() {
    let rect = ref.current.getBoundingClientRect();
    let top = rect.top;
    let left = rect.left;
    setPopupPosition({ top, left });
    setShowOptions(true);
  }

  function deleteHandler() {
    onDelete();
    closeDropdown();
  }

  function renameHandler() {
    onRename();
    closeDropdown();
  }

  return (
    <SelectStyled ref={ref}>
      <span className="material-icons" onClick={openHandler}>
        more_horiz
      </span>
      {showOptions && (
        <div
          className="options"
          style={{
            top: `${popupPosition.top + 40}px`,
            left: `${popupPosition.left}px`,
          }}
        >
          <div className="option" onClick={renameHandler}>
            Rename
          </div>
          <div className="option" onClick={deleteHandler}>
            Delete this list
          </div>
        </div>
      )}
    </SelectStyled>
  );
}

export default function ListTitle({ title = "", listId }) {
  const [showForm, setShowForm] = useState(false);
  const [newListTitle, setNewListTitle] = useState(title);

  const {
    actions: { lists: listsActions },
  } = useOvermind();

  useEffect(() => {
    setNewListTitle(title);
  }, [title]);

  function updateListTitleHandler() {
    //ajax to add new card
    listsActions.updateListTitle({ id: listId, title: newListTitle });
    closeForm();
  }

  function closeForm() {
    setShowForm(false);
    setNewListTitle(title);
  }

  function deleteListHandler() {
    listsActions.deleteList(listId);
  }

  return (
    <ListTitleStyled>
      <div className="list-title-action">
        <span style={{ flex: 1 }} onClick={() => setShowForm(true)}>
          {title}
        </span>

        <DropdownOptions
          onDelete={deleteListHandler}
          onRename={() => setShowForm(true)}
        />
      </div>
      {showForm && (
        <div className="new-button-form">
          <input
            type="text"
            placeholder="Enter a title for this list..."
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
          />
          <div className="new-button-form--actions">
            <Button
              disabled={newListTitle.trim() === ""}
              bg="var(--green)"
              color="#fff"
              onClick={updateListTitleHandler}
            >
              Save
            </Button>
            <span className="material-icons" onClick={closeForm}>
              close
            </span>
          </div>
        </div>
      )}
    </ListTitleStyled>
  );
}
