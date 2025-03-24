import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  activeUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
      console.log(state.name);
    },
    setActiveUsers: (state, action) => {
      state.activeUsers = action.payload;
    },
  },
});

export const { setUserName, setActiveUsers } = userSlice.actions;
export default userSlice.reducer;
