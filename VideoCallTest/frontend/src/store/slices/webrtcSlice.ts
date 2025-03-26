import { createSlice } from "@reduxjs/toolkit";
import { callStates } from "../../constants";

const initialState = {
  localStream: "",
  remoteStream: "",
  callState: callStates.CALL_AVAILABLE,
  callingDialogVisible: false,
  callerUsername: "",
  callIfRejected: {
    reject: false,
    answer: "",
  },
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
    setCallIfRejected: (state, action) => {
      state.callIfRejected = {
        reject: action.payload.reject,
        answer: action.payload.answer,
      };
    },
  },
});

export const {
  setLocalStream,
  setRemoteStream,
  setCallState,
  setCallerUsername,
  setCallIfRejected,
} = webrtcSlice.actions;
export default webrtcSlice.reducer;
