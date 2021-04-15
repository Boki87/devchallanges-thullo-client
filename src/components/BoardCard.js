import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getInitials } from "../utils";
import BoardCardMember from "./BoardCardMember";
import BoardCardMembers from "./BoardCardMembers";

const BoardCardStyled = styled.div`
  width: 243px;
  height: 243px;
  border-radius: 12px;
  box-shadow: var(--bs2);
  background: var(--white);
  padding: 12px;
  .cover-photo-inner {
    width: 219px;
    height: 130px;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 15px;
    background: var(--bgGrey);
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--textGrey);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .board-name {
    text-transform: capitalize;
    a {
      color: var(--textDark);
      text-decoration: none;
      &:hover {
        color: var(--blue);
        text-decoration: underline;
      }
    }
  }

  .board-card-members {
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
    .num-of-others {
      color: var(--textGrey);
      font-size: 0.8rem;
    }
  }
`;

export default function BoardCard({ board }) {
  const { name, createdBy, members, _id, coverPhoto } = board;

  const boardInitials = getInitials(name);

  let allMembers = [createdBy, ...members];

  return (
    <BoardCardStyled>
      <Link to={`/b/${_id}`}>
        <div className="cover-photo-inner">
          {coverPhoto != "" ? (
            <img src={coverPhoto} />
          ) : (
            <span>{boardInitials}</span>
          )}
        </div>
      </Link>

      <div className="board-name">
        <Link to={`/b/${_id}`}>{name}</Link>
      </div>

      <BoardCardMembers members={allMembers} />
    </BoardCardStyled>
  );
}
