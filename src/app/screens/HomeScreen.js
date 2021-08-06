import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectRooms } from "../features/roomsSlice";
import Room from "../components/Room";

function HomeScreen() {
  const rooms = useSelector(selectRooms);

  return (
    <HomeScreenContainer>
      <Title>Available Rooms</Title>
      <RoomsContainer>
        {rooms.map((room) => (
          <Room key={room._id} roomData={room} />
        ))}
      </RoomsContainer>
    </HomeScreenContainer>
  );
}

export default HomeScreen;

const HomeScreenContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 50px;
`;

const Title = styled.h2`
  border-bottom: 3px solid #000;
`;

export const RoomsContainer = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
  margin: 20px 0;
`;
