import React from "react";
import styled from "styled-components";
import MemberAvatar from "./MemberAvatar";
import InviteMemberDropdown from "./InviteMemberDropdown";

const MembersBarStyled = styled.div`
  margin-left: 20px;
  display: flex;
  gap: 15px;
`;

export default function MembersBar({ members }) {
  return (
    <MembersBarStyled>
      {members.map((member) => (
        <MemberAvatar member={member} key={member._id} />
      ))}
      <InviteMemberDropdown />
    </MembersBarStyled>
  );
}
