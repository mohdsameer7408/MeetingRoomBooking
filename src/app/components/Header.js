import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectUser, signOutAsync } from "../features/authSlice";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOutAsync());
  };

  return (
    <HeaderContainer>
      <HeaderRightLink to="/">
        <HeaderLeft>
          <HeaderTitle>Meeting Room</HeaderTitle>
        </HeaderLeft>
      </HeaderRightLink>
      <HeaderRight>
        <HeaderRightLink to="/">Home</HeaderRightLink>
        {user && (
          <HeaderRightLink to="/myBookings">My Bookings</HeaderRightLink>
        )}
        {!user && <HeaderRightLink to="/auth">Login</HeaderRightLink>}
        {user && <HeaderRightTab>Hey User</HeaderRightTab>}
        {user && <HeaderRightTab onClick={handleLogout}>LogOut</HeaderRightTab>}
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: var(--primaryColor);
  box-shadow: 1px 2px 2px 0 rgba(0, 0, 0, 0.2),
    0 2px 2px 2px rgba(0, 0, 0, 0.15);
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderTitle = styled.h3`
  margin-left: 20px;
  color: #fff;
  font-size: 21px;
`;

const HeaderRight = styled.nav`
  display: flex;
  width: 22%;
  justify-content: space-around;
  align-items: center;
`;

const LinkStyles = css`
  text-decoration: none;
  color: #aaa;
  transition: all 0.5s ease;
  padding: 5px 0 5px 0;

  :hover {
    color: #fff;
  }
`;

const HeaderRightLink = styled(Link)`
  ${LinkStyles}
`;

const HeaderRightTab = styled.div`
  cursor: pointer;
  ${LinkStyles}
`;
