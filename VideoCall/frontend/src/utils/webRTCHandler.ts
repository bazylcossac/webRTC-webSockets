import store from "../store/store";
import {
  setLocalStream,
  setCallState,
  setCallingDialogVisible,
  setCallingUsername,
  setCallIfRejected,
  setRemoteStream,
  setLocalScreenShareEnabled,
} from "../store/slices/webrtcSlice";
import { callStates, preOfferAnswers } from "../lib/constants";
import * as wss from "../utils/connectToWs";

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
let peerConection: RTCPeerConnection | null;

const createPeerConection = () => {
  peerConection = new RTCPeerConnection(configuration);
  const localStream = store.getState().webrtc.localStream as MediaStream | null;
  if (!localStream) return;

  for (const track of localStream.getTracks()) {
    peerConection.addTrack(track, localStream);
  }

  peerConection.ontrack = ({ streams: [stream] }) => {
    // store remote stream
    store.dispatch(setRemoteStream(stream));
  };

  peerConection.onicecandidate = (event) => {
    if (event.candidate) {
      wss.sednWebRTCCandidate({
        candidate: event.candidate,
        connectedUserSocketId,
      });
    }
  };
  peerConection.onconnectionstatechange = (event) => {
    if (peerConection!.connectionState === "connected") {
      console.log("Succesfully connected to other peer ");
    }
  };
};

export const sendOffer = async () => {
  const offer = await peerConection!.createOffer();
  await peerConection!.setLocalDescription(offer);
  wss.sendWebRTCOffer({
    calleSocketId: connectedUserSocketId,
    offer,
  });
};

export const handleOffer = async (data) => {
  await peerConection!.setRemoteDescription(data.offer);
  const answer = await peerConection!.createAnswer();
  await peerConection!.setLocalDescription(answer);
  wss.sendWebRTCAnswer({
    callerSocketId: connectedUserSocketId,
    answer,
  });
};

export const handleAnswer = async (data) => {
  await peerConection!.setRemoteDescription(data.answer);
};

export const getLocalStream = async () => {
  /// 1. users enter Dashboard page
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    store.dispatch(setLocalStream(stream));
    store.dispatch(setCallState(callStates.CALL_AVAILABLE));
    createPeerConection(stream);
  } catch (error) {
    throw new Error(`Failed to get user media stream | ${error}`);
  }
};

export const getScreenSahre = async () => {
  if (!store.getState().webrtc.localScreenShareEnabled) {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      store.dispatch(setLocalScreenShareEnabled(true));
      const senders = await peerConection!.getSenders();
      const sender = senders.find(
        (sender: RTCRtpSender) =>
          sender.track!.kind === screenStream.getVideoTracks()[0].kind
      );
      if (!sender) return;
      sender.replaceTrack(screenStream.getVideoTracks()[0]);
      // store.dispatch(setLocalStream(screenStream));
    } catch (err) {
      throw new Error(`Failed to screen share | ${err}`);
    }
  } else {
    const localStream = store.getState().webrtc.localStream;
    if (!localStream) return;
    const senders = await peerConection!.getSenders();

    const sender = senders.find(
      (sender: RTCRtpSender) =>
        sender.track!.kind === localStream?.getVideoTracks()[0].kind
    );
    if (!sender) return;
    sender.replaceTrack(localStream.getVideoTracks()[0]);
    store.dispatch(setLocalScreenShareEnabled(false));
  }
};

export const handeCandidate = async (data) => {
  try {
    await peerConection!.addIceCandidate(data.candidate);
  } catch (error) {
    console.error(`Error on creating ice candidates | ${error}`);
  }
};

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

  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
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
    sendOffer();
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
    resetCallData();
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
