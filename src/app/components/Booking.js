import React from "react";
import styled from "styled-components";

import { baseURL } from "../features/axios";
import { RoomImage, RoomNumber } from "./Room";

function Booking({ bookingData }) {
  return (
    <BookingContainer>
      <RoomImage src={`${baseURL}/image?name=${bookingData.room.imageUrl}`} />
      <RoomNumber>{bookingData.room.name}</RoomNumber>
      <RoomNumber>
        Booked For Date - {bookingData.date}, Time {bookingData.time}-
        {parseInt(bookingData.time) + 1}
      </RoomNumber>
    </BookingContainer>
  );
}

export default Booking;

const BookingContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% / 4);
`;
