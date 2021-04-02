import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VisibilitySelect from "../VisibilitySelect";
import MembersBar from "../MembersBar";
import { SelectButton } from "../../styles/SelectButton";
import { useOvermind } from "../../store";

const BoardActionsBarStyled = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
`;

export default function BoardActionsBar({ board, toggleMenu }) {
  let members = [];
  if (board) {
    members = [board.createdBy, ...board.members];
  }

  const {
    actions: { boards: boardsActions },
  } = useOvermind();

  function setVisibilityHandler(val) {
    console.log(val);
    boardsActions.updateBoard({
      updatedProps: {
        visibility: val,
      },
      cb: (code) => {
        if (code) {
          console.log("some error happened");
          return;
        }
        console.log("Update successful");
      },
    });
  }

  return (
    <BoardActionsBarStyled>
      <VisibilitySelect
        visibility={board?.visibility ? board.visibility : "Public"}
        changeVisibility={setVisibilityHandler}
      />
      <MembersBar members={members} />
      <SelectButton style={{ marginLeft: "auto" }} onClick={toggleMenu}>
        <div className="icon">
          <span className="material-icons">more_horiz</span>
        </div>
        <span>Show Menu</span>
      </SelectButton>
    </BoardActionsBarStyled>
  );
}
