import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "User",
  activeUsers: [],
  activeGroups: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setActiveUsers: (state, action) => {
      state.activeUsers = action.payload;
    },

    setActiveGroups: (state, action) => {
      state.activeGroups = action.payload;
    },
  },
});

export const { setUserName, setActiveUsers, setActiveGroups } =
  userSlice.actions;
export default userSlice.reducer;
