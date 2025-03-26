import {
  setCallerUsername,
  setCallState,
  setLocalStream,
} from "../store/slices/webrtcSlice";
import store from "../store/store";
import { callStates } from "../constants";

const constraints = {
  video: true,
  audio: true,
};

let connectedUserSocketId;

export const getLocalStream = async () => {
  try {
    const localStream = await navigator.mediaDevices.getUserMedia(constraints);
    store.dispatch(setLocalStream(localStream));
    store.dispatch(setCallState(callStates.CALL_AVAILABLE));
  } catch (err) {
    throw new Error(`Failed to get local stream | ${err}`);
  }
};

export const handlePreOffer = (data) => {
  if (isCallPossible()) {
    connectedUserSocketId = data.callerSocketId;
    store.dispatch(setCallState(callStates.CALL_REQUESTED));
    store.dispatch(setCallerUsername(data.callerName));
  }
};

const isCallPossible = () => {
  if (
    store.getState().webrtc.localStream === null ||
    store.getState().webrtc.callState !== callStates.CALL_AVAILABLE
  ) {
    return false;
  } else {
    return true;
  }
};
