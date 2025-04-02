import { callStates } from "../lib/constants";
import {
  addStreamToGroupCall,
  setCallState,
  setGroupCallASctive,
  setIsHostingGroupCall,
  setStreamsInGroupCall,
} from "../store/slices/webrtcSlice";
import store from "../store/store";
import {
  sendCloseConnectionInGroupCall,
  sendCloseRoom,
  sendCreateRoomRequest,
  sendJoinGroupCallRequest,
  sendRequestForGroupCallLeave,
} from "./connectToWs";
import Peer from "peerjs";

let myPeer: null | Peer;

let myPerrId: string;
let currentGroupCallId: string | null;

export const connectWithPeer = () => {
  myPeer = new Peer("", {
    path: "/peerjs",
    host: "/",
    port: 3000,
  });

  myPeer.on("open", (id: string) => {
    myPerrId = id;
    console.log("PEER CONNECTION");
    console.log(id);
  });

  myPeer.on("call", (call) => {
    const localStream = store.getState().webrtc.localStream;
    if (!localStream) return;
    call.answer(localStream);

    call.on("stream", (incomingStream) => {
      const groupStreams = store.getState().webrtc.groupCallStreams;
      const stream = groupStreams.find(
        (stream) => stream.id === incomingStream.id
      );
      if (!stream) {
        store.dispatch(addStreamToGroupCall(incomingStream));
      }
    });
  });
};

export const createRoom = () => {
  sendCreateRoomRequest({
    peerId: myPerrId,
    hostName: store.getState().user.name,
  });

  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
  store.dispatch(setGroupCallASctive(true));
  store.dispatch(setIsHostingGroupCall(true));
};

export const joinRoomRequest = (groupCallId: string, socketId: string) => {
  const localStream = store.getState().webrtc.localStream;
  if (!localStream) return;

  sendJoinGroupCallRequest({
    groupCallId,
    socketId,
    localStreamId: localStream.id,
    peerId: myPerrId,
  });
  store.dispatch(setGroupCallASctive(true));
  console.log("JOINING");
  console.log(groupCallId);
  currentGroupCallId = groupCallId;
};

export const connectToNewUser = (data) => {
  const localStream = store.getState().webrtc.localStream;
  const call = myPeer!.call(data.peerId, localStream); // pperId = host id

  call.on("stream", (incomingStream) => {
    const groupStreams = store.getState().webrtc.groupCallStreams;
    const stream = groupStreams.find(
      (stream) => stream.id === incomingStream.id
    );
    if (!stream) {
      store.dispatch(addStreamToGroupCall(incomingStream));
    }
  });
};

export const handleGroupCallUserDisconnect = () => {
  const localStream = store.getState().webrtc.localStream;
  if (!localStream) return;

  sendCloseConnectionInGroupCall({
    localStreamId: localStream.id,
    groupCallId: currentGroupCallId,
  });

  clearAfterGroupCall();
};

export const closeRoomCall = () => {
  sendCloseRoom({
    peerId: myPerrId,
  });

  clearAfterGroupCall();
  store.dispatch(setIsHostingGroupCall(false));
};

export const clearAfterGroupCall = () => {
  currentGroupCallId = null;
  myPeer!.destroy();
  connectWithPeer();
  store.dispatch(setGroupCallASctive(false));
  store.dispatch(setStreamsInGroupCall([]));
  store.dispatch(setCallState(callStates.CALL_AVAILABLE));

  const localStream = store.getState().webrtc.localStream;
  if (!localStream) return;
  localStream.getAudioTracks()[0].enabled = true;
  localStream.getVideoTracks()[0].enabled = true;
};

export const disconnectUserFromGroupCall = (localStreamId: string) => {
  const groupCallStreams = store.getState().webrtc.groupCallStreams;

  const newStreams = groupCallStreams.filter(
    (stream) => stream.id !== localStreamId
  );

  store.dispatch(setStreamsInGroupCall(newStreams));
};

export const removeMeFromGroupcCall = (data) => {
  console.log("removing me from call");
  const localStream = store.getState().webrtc.localStream;
  sendRequestForGroupCallLeave(data);
  disconnectUserFromGroupCall(localStream!.id);
  clearAfterGroupCall();
};

export const isGroupActive = () => {
  if (store.getState().webrtc.groupCallActive) {
    return currentGroupCallId;
  } else return false;
};
