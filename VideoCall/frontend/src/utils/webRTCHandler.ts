import store from "../store/store";
import { setLocalStream, setCallState } from "../store/slices/webrtcSlice";
import { callStates } from "../lib/constants";

const constraints = {
  video: true,
  audio: true,
};

const webRTCHandler = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    store.dispatch(setLocalStream(stream));
    store.dispatch(setCallState(callStates.CALL_AVAILABLE));
  } catch (error) {
    throw new Error(`Failed to get user media stream | ${error}`);
  }
};

export default webRTCHandler;
