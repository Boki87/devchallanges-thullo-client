import React from "react";
import styled from "styled-components";

import Logo from "../../assets/Logo.svg";

import ProfileDropdown from "./ProfileDropdown";

const NavBarStyled = styled.div`
  width: 100%;
  height: 60px;
  background: var(--bgWhite);
  box-shadow: var(--bs1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 25px;
  font-size: 0.9rem;
`;

export default function NavBar() {
  return (
    <NavBarStyled>
      <img src={Logo} alt="thullo logo" />

      <ProfileDropdown />
    </NavBarStyled>
  );
}
