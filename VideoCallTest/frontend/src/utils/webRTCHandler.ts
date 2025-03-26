import { setLocalStream } from "../store/slices/webrtcSlice";
import store from "../store/store";

const constraints = {
  video: true,
  audio: true,
};

export const getLocalStream = async () => {
  try {
    const localStream = await navigator.mediaDevices.getUserMedia(constraints);

    store.dispatch(setLocalStream(localStream));
  } catch (err) {
    throw new Error(`Failed to get local stream | ${err}`);
  }
};
