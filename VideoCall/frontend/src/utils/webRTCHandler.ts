import store from "../store/store";
import { setLocalStream } from "../store/slices/webrtcSlice";

const constraints = {
  video: true,
  audio: true,
};

const webRTCHandler = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    store.dispatch(setLocalStream(stream));
  } catch (error) {
    throw new Error(`Failed to get user media stream | ${error}`);
  }
};

export default webRTCHandler;
