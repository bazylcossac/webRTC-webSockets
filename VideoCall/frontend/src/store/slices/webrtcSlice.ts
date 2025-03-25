import { createSlice } from "@reduxjs/toolkit";
import { callStates } from "../../lib/constants";

const initialState = {
  localStream: null,
  remoteStream: null,
  callState: callStates.CALL_UNAVILABLE,
  callingDialogVisible: false,
  callingUsername: "",
  callRejected: {
    rejected: false,
    answer: "",
  },
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
    setCallIfRejected: (state, action) => {
      state.callRejected = {
        rejected: action.payload.rejected,
        answer: action.payload.answer,
      };
    },
  },
});

export const {
  setLocalStream,
  setRemoteStream,
  setCallState,
  setCallingUsername,
  setCallingDialogVisible,
  setCallIfRejected,
} = webRTCSlice.actions;
export default webRTCSlice.reducer;
