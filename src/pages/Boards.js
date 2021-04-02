import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useOvermind } from "../store";
import Button from "../styles/Button";
import BoardCard from "../components/BoardCard";
import Spinner from "../components/Spinner";
import NewBoardModal from "../components/NewBoardModal";

const BoardsStyled = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  background: var(--bgGreyLight);

  .inner-container {
    max-width: 1140px;
    margin: 60px auto 40px;
    padding: 0px 20px;
  }

  .header {
    width: 100%100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .boards-container {
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
  }
`;

export default function Boards() {
  const {
    state: { boards: boardsState },
    actions: { boards: boardActions },
  } = useOvermind();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    boardActions.resetActiveBoard();
    boardActions.getBoards();
  }, []);

  return (
    <BoardsStyled>
      <div className="inner-container">
        <div className="header">
          <span>All Boards</span>
          <Button onClick={() => setShowModal(true)} style={{ height: "30px" }}>
            + Add
          </Button>
        </div>

        <div className="boards-container">
          {!boardsState.boardsLoading && !boardsState.boardsError ? (
            boardsState.boards.map((board) => {
              return <BoardCard key={board._id} board={board} />;
            })
          ) : (
            <Spinner style={{ margin: "0px auto" }} />
          )}

          {boardsState.boardsError && !boardsState.boardsLoading && (
            <span>{boardsState.boardsError}</span>
          )}
        </div>
      </div>

      <NewBoardModal show={showModal} closeModal={() => setShowModal(false)} />
    </BoardsStyled>
  );
}
