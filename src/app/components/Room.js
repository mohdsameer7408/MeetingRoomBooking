import React from "react";
import styled from "styled-components";
import moment from "moment";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";

import { baseURL } from "../features/axios";
import { selectUser } from "../features/authSlice";

function Room({ roomData, unavailable }) {
  const user = useSelector(selectUser);

  return (
    <RoomContainer>
      <RoomImage src={`${baseURL}/image?name=${roomData.imageUrl}`} />
      <RoomNumber>Room No - {roomData.roomNo}</RoomNumber>
      <RoomNumber>
        {moment(new Date(roomData.dateTime)).format("MMM Do YYYY, HH:mm")}
      </RoomNumber>
      {!unavailable && user && <BookButton>Book Now</BookButton>}
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

const BookButton = styled(Button)``;
