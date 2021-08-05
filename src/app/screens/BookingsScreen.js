import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { RoomsContainer } from "./HomeScreen";
import { selectUser } from "../features/authSlice";
import { selectRooms } from "../features/roomsSlice";
import Room from "../components/Room";

function BookingsScreen() {
  const user = useSelector(selectUser);
  const rooms = [
    ...useSelector(selectRooms).filter((room) => room.bookedTo === user._id),
  ];

  return (
    <BookingsScreenContainer>
      <RoomsContainer>
        {rooms.map((room) => (
          <Room key={room._id} roomData={room} unavailable leave />
        ))}
      </RoomsContainer>
    </BookingsScreenContainer>
  );
}

export default BookingsScreen;

const BookingsScreenContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 50px;
`;
