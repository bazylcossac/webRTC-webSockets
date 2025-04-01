import { createSlice } from "@reduxjs/toolkit";
import { callStates } from "../../constants";

const initialState = {
  localStream: null,
  remoteStream: null,
  callState: callStates.CALL_AVAILABLE,
  groupCallActive: false,
  callingDialogVisible: false,
  callerUsername: "",
  micEnabled: true,
  cameraEnabled: true,
  shareScreenEnabled: true,
  callIfRejected: {
    reject: false,
    answer: "",
  },
  groupCalls: [],
  groupCallsStreams: [],
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
    setCallingDialogVisible: (state, action) => {
      state.callingDialogVisible = action.payload;
    },
    setMicEnabled: (state, action) => {
      state.micEnabled = action.payload;
    },
    setCameraEnabled: (state, action) => {
      state.cameraEnabled = action.payload;
    },
    setShareScreenEnabled: (state, action) => {
      state.shareScreenEnabled = action.payload;
    },
    setGroupCallActive: (state, action) => {
      state.groupCallActive = action.payload;
    },
    setGroupCalls: (state, action) => {
      state.groupCalls = action.payload;
    },
    addStreamToGroupCall: (state, action) => {
      state.groupCallsStreams.push(action.payload);
    },
  },
});

export const {
  setLocalStream,
  setRemoteStream,
  setCallState,
  setCallerUsername,
  setCallIfRejected,
  setCallingDialogVisible,
  setMicEnabled,
  setCameraEnabled,
  setShareScreenEnabled,
  setGroupCalls,
  setGroupCallActive,
  addStreamToGroupCall,
} = webrtcSlice.actions;
export default webrtcSlice.reducer;
