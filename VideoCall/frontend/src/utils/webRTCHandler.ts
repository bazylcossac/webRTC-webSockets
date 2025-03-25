import store from "../store/store";
import {
  setLocalStream,
  setCallState,
  setCallingDialogVisible,
  setCallingUsername,
} from "../store/slices/webrtcSlice";
import { callStates } from "../lib/constants";
import * as wss from "../utils/connectToWs";

const constraints = {
  video: true,
  audio: true,
};

export const getLocalStream = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    store.dispatch(setLocalStream(stream));
    store.dispatch(setCallState(callStates.CALL_AVAILABLE));
  } catch (error) {
    throw new Error(`Failed to get user media stream | ${error}`);
  }
};

let connectedUserSocketId;

export const callToOtherUser = (calleDetials) => {
  connectedUserSocketId = calleDetials.socketId;
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
  store.dispatch(setCallingDialogVisible(true));
  wss.sendPreOffer({
    calle: calleDetials,
    caller: {
      username: store.getState().user.name,
    },
  });
};

export const handlePreOffer = (data) => {
  connectedUserSocketId = data.callerSocketId;
  store.dispatch(setCallingUsername(data.callerUsername));
  store.dispatch(setCallState(callStates.CALL_REQUESTED));
};
