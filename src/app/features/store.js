import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import roomsReducer from "./roomsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomsReducer,
  },
});
