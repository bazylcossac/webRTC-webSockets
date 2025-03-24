import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
      console.log(state.name);
    },
  },
});

export const { setUserName } = userSlice.actions;
export default userSlice.reducer;
