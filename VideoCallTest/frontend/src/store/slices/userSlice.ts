import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  activeUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.name = action.payload;
    },
    setActiveUsers: (state, action) => {
      state.activeUsers = action.payload;
    },
  },
});

export const { setUsername, setActiveUsers } = userSlice.actions;
export default userSlice.reducer;
