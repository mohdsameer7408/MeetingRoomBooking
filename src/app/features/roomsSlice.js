import { createSlice } from "@reduxjs/toolkit";

export const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    allRooms: [],
  },
  reducers: {
    setRooms: (state, action) => {
      state.allRooms = action.payload;
    },
  },
});

export const { setRooms } = roomsSlice.actions;

export const selectRooms = (state) => state.rooms.allRooms;

export default roomsSlice.reducer;
