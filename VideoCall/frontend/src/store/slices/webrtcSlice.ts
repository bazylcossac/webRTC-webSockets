import { createSlice } from "@reduxjs/toolkit";
import { callStates } from "../../lib/constants";

const initialState = {
  localStream: null,
  remoteStream: null,
  callState: callStates.CALL_UNAVILABLE,
  callingDialogVisible: false,
  callingUsername: "",
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
    setCallingDialogVisible: (state, action) => {
      state.callingDialogVisible = action.payload;
    },
    setCallingUsername: (state, action) => {
      state.callingUsername = action.payload;
    },
  },
});

export const {
  setLocalStream,
  setRemoteStream,
  setCallState,
  setCallingUsername,
  setCallingDialogVisible,
} = webRTCSlice.actions;
export default webRTCSlice.reducer;
