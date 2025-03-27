import { createSlice } from "@reduxjs/toolkit";
import { callStates } from "../../lib/constants";

const initialState = {
  localStream: null as MediaStream | null,
  remoteStream: null,
  callState: callStates.CALL_UNAVILABLE,
  callingDialogVisible: false,
  callingUsername: "",
  localMicrophoneEnabled: true,
  localCameraEnabled: true,
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
    setLocalMicrophoneEnabled: (state, action) => {
      state.localMicrophoneEnabled = action.payload;
      state.localStream!.getAudioTracks()[0].enabled = action.payload;
      console.log(state.localStream!.getAudioTracks()[0].muted);
    },
    setLocalCameraEnabled: (state, action) => {
      state.localCameraEnabled = action.payload;
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
  setLocalMicrophoneEnabled,
  setLocalCameraEnabled,
} = webRTCSlice.actions;
export default webRTCSlice.reducer;
