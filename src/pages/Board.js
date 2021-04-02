import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useOvermind } from "../store";
import BoardActionsBar from "../components/boardPageComponents/BoardActionsBar";
import Spinner from "../components/Spinner";
import BardSlideMenu from "../components/boardPageComponents/BoardSlideMenu";

const BoardStyled = styled.div`
  padding: 24px;
  height: 100%;
  width: 100%;
  position: relative;
`;

export default function Board() {
  const { id } = useParams();

  const [showMenu, setShowMenu] = useState(false);

  const {
    state: { boards: boardsState },
    actions: { boards: boardsActions },
  } = useOvermind();

  useEffect(() => {
    boardsActions.getActiveBoard(id);
  }, []);

  function toggleMenuHandler() {
    setShowMenu(!showMenu);
  }

  return (
    <BoardStyled>
      {boardsState.boardLoading && (
        <div style={{ textAlign: "center" }}>
          <Spinner />
        </div>
      )}
      {!boardsState.boardLoading && (
        <>
          <BoardActionsBar
            board={boardsState.activeBoard}
            toggleMenu={toggleMenuHandler}
          />

          {/* <div
            style={{
              width: "100%",
              height: "1000px",
              borderRadius: "12px",
              background: "var(--bgGrey)",
              marginTop: "20px",
            }}
          ></div> */}
        </>
      )}

      <BardSlideMenu
        board={boardsState.activeBoard}
        show={showMenu}
        toggleMenu={toggleMenuHandler}
      />
    </BoardStyled>
  );
}
