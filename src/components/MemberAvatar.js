import React from "react";
import styled from "styled-components";
import { getInitials } from "../utils";

const MemberAvatarStyled = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--grey);
  color: var(--white);
  font-size: 0.9rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function MemberAvatar({ member = { name: "", photo: "" } }) {
  const { name, photo } = member;
  let initials = getInitials(name);
  return (
    <MemberAvatarStyled>
      {photo !== "" ? <img src={photo} alt="" /> : <span>{initials}</span>}
    </MemberAvatarStyled>
  );
}
