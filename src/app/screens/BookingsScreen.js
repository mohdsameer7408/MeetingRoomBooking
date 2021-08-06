import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { RoomsContainer } from "./HomeScreen";
import { selectUser } from "../features/authSlice";
import { selectBookings } from "../features/bookingsSlice";
import Booking from "../components/Booking";

function BookingsScreen() {
  const user = useSelector(selectUser);
  const bookings = [
    ...useSelector(selectBookings).filter(
      (booking) => booking.user._id === user._id
    ),
  ];

  return (
    <BookingsScreenContainer>
      <RoomsContainer>
        {bookings.map((booking) => (
          <Booking key={booking._id} bookingData={booking} />
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
