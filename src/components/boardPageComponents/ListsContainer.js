import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useOvermind } from "../../store";
import CardContainer from "./CardContainer";
import NewListButton from "./NewListButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const ListsContainerStyled = styled.div`
  overflow: hidden;
  min-height: 200px;
  max-height: 100%;
  padding: 24px;
  .lists-container {
    width: 100%;
    background: var(--bgGrey);
    border-radius: 12px;
    padding: 24px;
    min-height: 150px;
    max-height: 100%;
    display: flex;
    overflow: auto;
  }
`;

export default function ListsContainer() {
  const {
    state: { lists: listsState },
    actions: { lists: listsActions },
  } = useOvermind();

  const { id } = useParams();

  useEffect(() => {
    listsActions.getLists({ id });
  }, []);

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    listsActions.reorderCards({ destination, source, draggableId });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ListsContainerStyled>
        <div className="lists-container">
          {listsState.lists.map((list) => (
            <Droppable droppableId={list._id} key={list._id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <CardContainer list={list} key={list._id} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
          <NewListButton boardId={id} />
        </div>
      </ListsContainerStyled>
    </DragDropContext>
  );
}
