import {
  setCallerUsername,
  setCallIfRejected,
  setCallState,
  setLocalStream,
} from "../store/slices/webrtcSlice";
import store from "../store/store";
import { callStates, preOfferAnswers } from "../constants";
import { sendPreOfferAnswer } from "./wssConnection";

const constraints = {
  video: true,
  audio: true,
};

let connectedUserSocketId: string | null;

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

export const handlePreOfferAnswer = (data) => {
  if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
    console.log("Call accepted");
    store.dispatch(setCallIfRejected({ reject: false, answer: "" }));
  } else {
    let rejectionReason;

    if (data.answer === preOfferAnswers.CALL_UNAVAILABLE) {
      rejectionReason = "Couldn't connect to user. Its 90% our fault";
    }
    if (data.answer === preOfferAnswers.CALL_REJECTED) {
      rejectionReason = "User dont want to talk right now, how sad ;(";
    }

    store.dispatch(
      setCallIfRejected({ reject: true, answer: rejectionReason })
    );
  }

  resetCallData();
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

export const declineIncomingCall = () => {
  sendPreOfferAnswer({
    answer: preOfferAnswers.CALL_REJECTED,
    callerSocketId: connectedUserSocketId,
  });
};

export const acceptIncomingCall = () => {
  sendPreOfferAnswer({
    answer: preOfferAnswers.CALL_ACCEPTED,
    callerSocketId: connectedUserSocketId,
  });
};

const resetCallData = () => {
  connectedUserSocketId = null;
  store.dispatch(setCallState(callStates.CALL_AVAILABLE));
};
