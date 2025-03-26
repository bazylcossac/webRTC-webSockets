import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  localStream: "",
  remoteStream: "",
};

const webrtcSlice = createSlice({
  name: "webrtc",
  initialState,
  reducers: {
    setLocalStream: (state, action) => {
      state.localStream = action.payload;
    },
    setRemoteStream: (state, action) => {
      state.remoteStream = action.payload;
    },
  },
});

export const { setLocalStream, setRemoteStream } = webrtcSlice.actions;
export default webrtcSlice.reducer;
