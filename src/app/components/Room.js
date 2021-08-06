import "react-datetime/css/react-datetime.css";
import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import DateTime from "react-datetime";

import { baseURL } from "../features/axios";
import { selectUser } from "../features/authSlice";
import axios from "../features/axios";
import { selectBookings } from "../features/bookingsSlice";

const getTimeArray = (timeRange) => {
  const timeArr = [],
    rangeArr = timeRange.split("-");
  for (let i = parseInt(rangeArr[0]); i <= parseInt(rangeArr[1]); i++) {
    timeArr.push(i.toString());
  }
  return timeArr;
};

function Room({ roomData }) {
  const user = useSelector(selectUser);
  const bookings = [...useSelector(selectBookings)].filter(
    (booking) => booking.room._id === roomData._id
  );
  const [time, setTime] = useState("Select");
  const [date, setDate] = useState(new Date().toDateString());
  const [isLoading, setIsLoading] = useState(false);
  const [availableTime, setAvailableTime] = useState(
    getTimeArray(roomData.time).filter(
      (timeId) =>
        0 >
        bookings.findIndex(
          (booking) => booking.date === date && booking.time === timeId
        )
    )
  );

  // useEffect(() => {
  //   if (date) {
  //     setAvailableTime(
  //       getTimeArray(roomData.time).filter(
  //         (timeId) =>
  //           0 >
  //           bookings.findIndex(
  //             (booking) => booking.date === date && booking.time === timeId
  //           )
  //       )
  //     );
  //   }
  // }, [date, setAvailableTime, roomData.time]);

  const dateChangeHandler = (event) => {
    const newDate = new Date(event._d).toDateString();
    setAvailableTime(
      getTimeArray(roomData.time).filter(
        (timeId) =>
          0 >
          bookings.findIndex(
            (booking) => booking.date === newDate && booking.time === timeId
          )
      )
    );
    setDate(newDate);
  };

  const bookingHandler = async (event) => {
    event.preventDefault();

    if (time === "Select") return alert("Please select a time!");

    try {
      setIsLoading(true);
      await axios.post(
        `/book/room/`,
        { roomId: roomData._id, time, date },
        { headers: { "auth-token": user.token } }
      );
    } catch ({ response }) {
      alert(response.data);
    }
    setIsLoading(false);
  };

  // const checkOutHandler = async (event) => {
  //   event.preventDefault();

  //   try {
  //     setIsLoading(true);
  //     await axios.patch(
  //       `/leaveRoom/${roomData._id}`,
  //       {},
  //       { headers: { "auth-token": user.token } }
  //     );
  //   } catch ({ response }) {
  //     alert(response.data);
  //   }
  //   setIsLoading(false);
  // };

  return (
    <RoomContainer>
      <RoomImage src={`${baseURL}/image?name=${roomData.imageUrl}`} />
      <RoomNumber>{roomData.name}</RoomNumber>
      <RoomDescription>{roomData.description}</RoomDescription>
      <RoomNumber>Time - {roomData.time}</RoomNumber>
      <RoomNumber>Select Date</RoomNumber>
      <DateTime timeFormat={false} onChange={dateChangeHandler} />
      <RoomNumber>Select Time</RoomNumber>
      <TimeSelector value={time} onChange={(e) => setTime(e.target.value)}>
        <TimeOption>Select</TimeOption>
        {availableTime.map((timeId) => (
          <TimeOption key={timeId}>{timeId}</TimeOption>
        ))}
      </TimeSelector>
      {user && (
        <BookButton onClick={bookingHandler} disabled={isLoading}>
          {isLoading ? "Booking..." : "Book Now"}
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

export const RoomImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
`;

export const RoomNumber = styled.h4`
  margin-bottom: 10px;
`;

const RoomDescription = styled.p``;

const BookButton = styled(Button)`
  background: var(--secondaryColor) !important;
  color: #fff !important;
  margin-top: 5px !important;
`;

const TimeSelector = styled.select``;

const TimeOption = styled.option``;
