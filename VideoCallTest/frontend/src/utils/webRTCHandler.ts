import {
  setCallerUsername,
  setCallIfRejected,
  setCallingDialogVisible,
  setCallState,
  setLocalStream,
  setRemoteStream,
} from "../store/slices/webrtcSlice";
import store from "../store/store";
import { callStates, preOfferAnswers } from "../constants";
import {
  sendPreOfferAnswer,
  sendWebRTCAnswer,
  sendWebRTCCandidate,
  sendWebRTCOffer,
} from "./wssConnection";

const constraints = {
  video: true,
  audio: true,
};

const configuration = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

let connectedUserSocketId: string | null;
let peerConection;

export const getLocalStream = async () => {
  try {
    const localStream = await navigator.mediaDevices.getUserMedia(constraints);
    store.dispatch(setLocalStream(localStream));
    store.dispatch(setCallState(callStates.CALL_AVAILABLE));
    createPeerConection();
  } catch (err) {
    throw new Error(`Failed to get local stream | ${err}`);
  }
};

const createPeerConection = () => {
  peerConection = new RTCPeerConnection(configuration);

  const localStream = store.getState().webrtc.localStream as MediaStream | null;

  if (!localStream) return;

  for (const track of localStream.getTracks()) {
    peerConection.addTrack(track, localStream);
  }

  peerConection.ontrack = (event) => {
    /// store remote stream

    store.dispatch(setRemoteStream(event.streams[0]));
  };

  peerConection.onicecandidate = (event) => {
    if (event.candidate) {
      sendWebRTCCandidate({
        candidate: event.candidate,
        callerSocketId: connectedUserSocketId,
      });
    }

    /// event.candidate
    /// wss action
  };

  peerConection.onconnectionstatechange = (event) => {
    if (peerConection!.connecitonState === "connected") {
      console.log("CONNECTED TO USER");
    }
  };
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
    sendOffer(data.socketId);
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
  store.dispatch(setCallingDialogVisible(false));
  resetCallData();
};

export const handleOffer = async (offer) => {
  await peerConection!.setRemoteDescription(offer);
  const answer = await peerConection!.createAnswer();
  await peerConection!.setLocalDescription(answer);
  sendWebRTCAnswer({
    callerSocketId: connectedUserSocketId,
    answer,
  });
};

export const handleAnswer = async (answer) => {
  await peerConection!.setRemoteDescription(answer);
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};

export const sendOffer = async (calleSocketId: string) => {
  const offer = await peerConection!.createOffer();
  peerConection!.setLocalDescription(offer);
  sendWebRTCOffer({
    calleSocketId,
    offer,
  });
};

export const handleCandidate = async (candidate) => {
  try {
    await peerConection!.addIceCandidate(candidate);
  } catch (err) {
    console.error(`ERROR OCCURED WHEN ADDING ICE CANDIDATE | ${err}`);
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

export const declineIncomingCall = () => {
  sendPreOfferAnswer({
    answer: preOfferAnswers.CALL_REJECTED,
    callerSocketId: connectedUserSocketId,
  });
  resetCallData();
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
