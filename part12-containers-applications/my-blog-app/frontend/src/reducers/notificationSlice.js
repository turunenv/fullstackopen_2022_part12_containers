import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  style: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationSet(state, action) {
      const { message, style } = action.payload;
      state.message = message;
      state.style = style;
    },
    notificationRemoved(state) {
      state.message = "";
      state.style = "";
    },
  },
});

const { notificationSet, notificationRemoved } = notificationSlice.actions;

//function to handle displaying the notification for 3 seconds
//store timeoutID to avoid race-condition between notifications
let timeoutID = 0;
export function setNotification(dispatch, notificationObj) {
  if(timeoutID) {
    clearTimeout(timeoutID);
  }
  dispatch(notificationSet(notificationObj));
  timeoutID = setTimeout(() => {
    dispatch(notificationRemoved())
    timeoutID = 0;
  }, 3000)
}

export default notificationSlice.reducer;
