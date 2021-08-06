import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pusher from "pusher-js";
import { useDispatch } from "react-redux";

import HomeScreen from "./app/screens/HomeScreen";
import AuthScreen from "./app/screens/AuthScreen";
import BookingsScreen from "./app/screens/BookingsScreen";
import CreateRoomScreen from "./app/screens/CreateRoomScreen";
import Header from "./app/components/Header";
import axios from "./app/features/axios";
import { setRooms } from "./app/features/roomsSlice";
import Cookies from "js-cookie";
import { signIn } from "./app/features/authSlice";
import { setBookings } from "./app/features/bookingsSlice";

const pusher = new Pusher("065c8d5cf3e03b73bd2f", {
  cluster: "ap2",
});

function App() {
  const dispatch = useDispatch();

  const fetchRooms = useCallback(async () => {
    const { data } = await axios.get("/rooms");
    dispatch(setRooms(data));
  }, [dispatch]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    const channel = pusher.subscribe("rooms");
    channel.bind("inserted", (_) => {
      fetchRooms();
    });
  }, [fetchRooms]);

  const fetchBookings = useCallback(async () => {
    const { data } = await axios.get("/bookings");
    dispatch(setBookings(data));
  }, [dispatch]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  useEffect(() => {
    const channel = pusher.subscribe("bookings");
    channel.bind("inserted", (_) => {
      fetchBookings();
    });
  }, [fetchBookings]);

  useEffect(() => {
    const authToken = Cookies.get("auth-token");

    if (authToken) {
      axios
        .get("/user/autoLogin", { headers: { "auth-token": authToken } })
        .then(({ data }) => dispatch(signIn(data)))
        .catch(({ response }) => alert(response.data));
    }
  }, [dispatch]);

  return (
    <Router>
      <AppContainer>
        <Header />
        <Switch>
          <Route path="/room/create">
            <CreateRoomScreen />
          </Route>
          <Route path="/myBookings">
            <BookingsScreen />
          </Route>
          <Route path="/auth">
            <AuthScreen />
          </Route>
          <Route path="/">
            <HomeScreen />
          </Route>
        </Switch>
      </AppContainer>
    </Router>
  );
}

export default App;

const AppContainer = styled.main`
  display: flex;
  flex-direction: column;
`;
