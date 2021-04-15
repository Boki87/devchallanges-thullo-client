import React from "react";
import styled from "styled-components";
import BoardCardMember from "./BoardCardMember";

const BoardCardMembersStyled = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  .num-of-others {
    color: var(--textGrey);
    font-size: 0.8rem;
  }
`;

export default function BoardCardMembers({ members }) {
  let numOfMembersToShow = 3;

  return (
    <BoardCardMembersStyled>
      {members.map((m, i) => {
        if (i < numOfMembersToShow) {
          return <BoardCardMember member={m} key={i} />;
        }
      })}

      {members.length > numOfMembersToShow && (
        <span className="num-of-others">
          + {members.length - numOfMembersToShow} others
        </span>
      )}
    </BoardCardMembersStyled>
  );
}
