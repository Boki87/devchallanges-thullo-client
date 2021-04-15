import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useLocation } from "react-router-dom";
import { useOvermind } from "../store";
import BoardActionsBar from "../components/boardPageComponents/BoardActionsBar";
import Spinner from "../components/Spinner";
import BardSlideMenu from "../components/boardPageComponents/BoardSlideMenu";
import ListsContainer from "../components/boardPageComponents/ListsContainer";
import CardModal from "../components/cardModal/CardModal";

const BoardStyled = styled.div`
  padding-top: 24px;
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Board() {
  const location = useLocation();
  const { id } = useParams();
  const query = useQuery();

  const [showMenu, setShowMenu] = useState(false);
  const [cardModalId, setCardModalId] = useState(null);

  const {
    state: { boards: boardsState },
    actions: { boards: boardsActions },
  } = useOvermind();

  useEffect(() => {
    boardsActions.getActiveBoard(id);
  }, []);

  useEffect(() => {
    let cardId = query.get("card");
    setCardModalId(cardId);
  }, [location.search]);

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

          <ListsContainer />
        </>
      )}

      {cardModalId && <CardModal cardId={cardModalId} />}

      <BardSlideMenu
        board={boardsState.activeBoard}
        show={showMenu}
        toggleMenu={toggleMenuHandler}
      />
    </BoardStyled>
  );
}
