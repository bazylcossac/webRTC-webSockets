import store from "../store/store";
import {
  setLocalStream,
  setCallState,
  setCallingDialogVisible,
  setCallingUsername,
  setCallIfRejected,
} from "../store/slices/webrtcSlice";
import { callStates, preOfferAnswers } from "../lib/constants";
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

let connectedUserSocketId: string | null;

export const callToOtherUser = (calleDetials) => {
  connectedUserSocketId = calleDetials.socketId; // socketid that you want to connect with
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
  store.dispatch(setCallingDialogVisible(true));

  // sends pre offer to websocket with
  /// calle => user that we want to call with it's socketId and username
  /// caller => us, with our username in state

  wss.sendPreOffer({
    calle: calleDetials, // data of user that you want to connect with
    caller: {
      username: store.getState().user.name, // your username
    },
  });
};

export const handlePreOffer = (data) => {
  if (isCallIsPossible()) {
    connectedUserSocketId = data.callerSocketId;
    store.dispatch(setCallingUsername(data.callerUsername));
    store.dispatch(setCallState(callStates.CALL_REQUESTED));
  } else {
    wss.sendPreOfferAnswer({
      callerSocketId: data.callerSocketId,
      answer: preOfferAnswers.CALL_UNAVAILABLE,
    });
  }
};

export const acceptIncomingCall = () => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_ACCEPTED,
  });
};

export const declineIncomingCall = () => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_REJECTED,
  });

  resetCallData();
};

export const handlePreOfferAnswer = (data) => {
  store.dispatch(setCallingDialogVisible(false));
  if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
    // send webrtc
  } else {
    let rejectionReason;
    if (data.answer === preOfferAnswers.CALL_UNAVAILABLE) {
      rejectionReason = "User is not available";
    }
    if (data.answer === preOfferAnswers.CALL_REJECTED) {
      console.log(data.answer);
      rejectionReason = "User rejected";
      console.log(rejectionReason);
    }

    store.dispatch(
      setCallIfRejected({ rejected: true, answer: rejectionReason })
    );
    // return rejectionReason;
  }
};

export const isCallIsPossible = () => {
  if (
    store.getState().webrtc.localStream === null ||
    store.getState().webrtc.callState !== callStates.CALL_AVAILABLE
  ) {
    return false;
  } else {
    return true;
  }
};

export const resetCallData = () => {
  connectedUserSocketId = null;
  store.dispatch(setCallState(callStates.CALL_AVAILABLE));
};
