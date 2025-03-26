import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  localStream: "",
  remoteStream: "",
  callState: "",
  callerUsername: "",
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
    setCallState: (state, action) => {
      state.callState = action.payload;
    },
    setCallerUsername: (state, action) => {
      state.callerUsername = action.payload;
    },
  },
});

export const { setLocalStream, setRemoteStream, setCallState, setCallerUsername } =
  webrtcSlice.actions;
export default webrtcSlice.reducer;
