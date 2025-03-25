import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  localStream: null,
};

const webRTCSlice = createSlice({
  name: "webrtc",
  initialState,
  reducers: {
    setLocalStream: (state, action) => {
      state.localStream = action.payload;
    },
  },
});

export const { setLocalStream } = webRTCSlice.actions;
export default webRTCSlice.reducer;
