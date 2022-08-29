import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser(state, action) {
      return action.payload;
    },
    removeUser() {
      return null;
    }
  },
});

export const { storeUser, removeUser } = userSlice.actions;
export default userSlice.reducer;


