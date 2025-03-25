import { createSlice } from "@reduxjs/toolkit";
import { callStates } from "../../lib/constants";

const initialState = {
  localStream: null,
  remoteStream: null,
  callState: callStates.CALL_UNAVILABLE,
};

const webRTCSlice = createSlice({
  name: "webrtc",
  initialState,
  reducers: {
    setLocalStream: (state, action) => {
      console.log(action.payload);
      state.localStream = action.payload;
    },
    setRemoteStream: (state, action) => {
      state.remoteStream = action.payload;
    },
    setCallState: (state, action) => {
      state.callState = action.payload;
    },
  },
});

export const { setLocalStream, setRemoteStream, setCallState } =
  webRTCSlice.actions;
export default webRTCSlice.reducer;
