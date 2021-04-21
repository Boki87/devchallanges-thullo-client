import React, { useState, useRef } from "react";
import styled from "styled-components";
import NoProfileImage from "../../assets/no-profile-image.png";
import { useOvermind } from "../../store";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import MemberAvatar from "../MemberAvatar";
const WrapperStyled = styled.div`
  position: relative;
`;

const ProfileDropdownStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  .profile-image-container {
    height: 35px;
    width: 35px;
    border-radius: 6px;
    overflow: hidden;
    .profile-image {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }
`;

const DropdownStyled = styled.div`
  position: absolute;
  top: 60px;
  right: 0px;
  min-height: 100px;
  width: 200px;
  background: #fff;
  border-radius: 8px;
  border: var(--border-light);
  box-shadow: var(--bs2);
  overflow: hidden;
  z-index: 200;
  div {
    height: 40px;
    width: 100%;
    padding: 0px 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      background: var(--bgGrey);
    }
  }
`;

export default function ProfileDropdown() {
  const ref = useRef(null);

  const {
    state: { user: userState },
    actions: { user: userActions },
  } = useOvermind();

  const [showDropdown, setShowDropdown] = useState(false);

  function closeDropdown() {
    setShowDropdown(false);
  }

  useOutsideClick(ref, closeDropdown);

  return (
    <WrapperStyled ref={ref}>
      <ProfileDropdownStyled onClick={() => setShowDropdown(!showDropdown)}>
        {/* <div className="profile-image-container">
          <img
            className="profile-image"
            src={NoProfileImage}
            alt="profile image"
          />
        </div> */}
        <MemberAvatar member={userState?.user} />
        <span>{userState?.user?.name}</span>
        <span className="material-icons">arrow_drop_down</span>
      </ProfileDropdownStyled>
      {showDropdown && (
        <DropdownStyled>
          <div>Profile</div>
          <div>Settings</div>
          <div>Activity</div>
          <div onClick={userActions.logOut}>Log out</div>
        </DropdownStyled>
      )}
    </WrapperStyled>
  );
}
