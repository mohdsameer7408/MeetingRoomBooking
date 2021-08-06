import { createSlice } from "@reduxjs/toolkit";

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    allBookings: [],
  },
  reducers: {
    setBookings: (state, action) => {
      state.allBookings = action.payload;
    },
  },
});

export const { setBookings } = bookingsSlice.actions;

export const selectBookings = (state) => state.bookings.allBookings;

export default bookingsSlice.reducer;
