import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const CardStyled = styled.div`
  width: 100%;
  min-height: 50px;
  border-radius: 8px;
  margin: 10px 0px;
  padding: 15px;
  background: var(--white);
`;

export default function Card({ card, index }) {
  return (
    <Draggable draggableId={card._id} index={card.position}>
      {(provided) => (
        <CardStyled
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {card.title}
        </CardStyled>
      )}
    </Draggable>
  );
}
