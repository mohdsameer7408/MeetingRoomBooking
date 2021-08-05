import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";

import { baseURL } from "../features/axios";
import { selectUser } from "../features/authSlice";
import axios from "../features/axios";

function Room({ roomData, unavailable, leave }) {
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);

  const bookingHandler = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      await axios.patch(
        `/bookRoom/${roomData._id}`,
        {},
        { headers: { "auth-token": user.token } }
      );
    } catch ({ response }) {
      alert(response.data);
    }
    setIsLoading(false);
  };

  const checkOutHandler = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      await axios.patch(
        `/leaveRoom/${roomData._id}`,
        {},
        { headers: { "auth-token": user.token } }
      );
    } catch ({ response }) {
      alert(response.data);
    }
    setIsLoading(false);
  };

  return (
    <RoomContainer>
      <RoomImage src={`${baseURL}/image?name=${roomData.imageUrl}`} />
      <RoomNumber>Room No - {roomData.roomNo}</RoomNumber>
      <RoomNumber>
        {moment(new Date(roomData.dateTime)).format("MMM Do YYYY, HH:mm")}
      </RoomNumber>
      {!unavailable && user && (
        <BookButton onClick={bookingHandler} disabled={isLoading}>
          {isLoading ? "Booking..." : "Book Now"}
        </BookButton>
      )}
      {leave && user && (
        <BookButton onClick={checkOutHandler} disabled={isLoading}>
          {isLoading ? "Leaving..." : "Leave"}
        </BookButton>
      )}
    </RoomContainer>
  );
}

export default Room;

const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% / 4);
`;

const RoomImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
`;

const RoomNumber = styled.h4`
  margin-bottom: 10px;
`;

const BookButton = styled(Button)`
  background: var(--secondaryColor) !important;
  color: #fff !important;
`;
