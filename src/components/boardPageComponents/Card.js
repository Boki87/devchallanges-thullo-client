import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Link, useLocation } from "react-router-dom";
import BoardCardMembers from "../BoardCardMembers";
import LabelPill from "../LabelPill";

const CardStyled = styled.div`
  width: 245px;
  min-height: 50px;
  border-radius: 8px;
  margin: 10px 0px;
  padding: 15px;
  background: var(--white);

  .card-labels {
    width: 100%auto;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin: 10px 0px;
  }

  .card-cover-container {
    width: 100%;
    height: 130px;
    background: var(--bgGrey);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .card-footer {
    display: flex;
  }
`;

export default function Card({ card, index }) {
  const location = useLocation();

  function openCard() {
    console.log(location);
    alert(card._id);
  }

  return (
    <Draggable draggableId={card._id} index={card.position} onClick={openCard}>
      {(provided) => (
        <CardStyled
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {card.coverPhoto !== "" && (
            <Link to={`${location.pathname}?card=${card._id}`}>
              <div className="card-cover-container">
                <img src={card.coverPhoto} />
              </div>
            </Link>
          )}

          <Link to={`${location.pathname}?card=${card._id}`}>{card.title}</Link>
          {card.labels.length > 0 && (
            <div className="card-labels">
              {card.labels.map((label) => (
                <LabelPill label={label} key={label._id} />
              ))}
            </div>
          )}

          <div className="card-footer">
            <div>
              <BoardCardMembers members={card.members} />
            </div>
            <div>
              <div>{/* TODO: comments and attachment number go here */}</div>
            </div>
          </div>
        </CardStyled>
      )}
    </Draggable>
  );
}
