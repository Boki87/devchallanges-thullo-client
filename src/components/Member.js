import React from "react";
import styled from "styled-components";
import MemberAvatar from "./MemberAvatar";

const MemberStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 15px 0px;
  .member-name {
    text-transform: capitalize;
  }
`;

export default function Member({ member }) {
  return (
    <MemberStyled>
      <MemberAvatar member={member} />
      <span className="member-name">{member.name}</span>
    </MemberStyled>
  );
}
