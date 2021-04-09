import React from "react";
import styled from "styled-components";
import Card from "./Card";
import NewCardButton from "./NewCardButton";
import ListTitle from "./ListTitle";

const CardContainerStyled = styled.div`
  min-width: 245px;
  min-height: 100px;
  max-height: 100%;
  padding-bottom: 50px;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0px 10px;
`;

export default function CardContainer({ list }) {
  return (
    <CardContainerStyled>
      <ListTitle title={list.title} listId={list._id} />
      <div>
        {list.cards.map((card, index) => (
          <Card card={card} key={card._id} index={card.position} />
        ))}
      </div>
      <NewCardButton listId={list._id} />
    </CardContainerStyled>
  );
}
