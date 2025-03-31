import { callStates } from "../lib/constants";
import {
  addStreamToGroupCall,
  setCallState,
  setGroupCallASctive,
} from "../store/slices/webrtcSlice";
import store from "../store/store";
import { sendCreateRoomRequest, sendJoinGroupCallRequest } from "./connectToWs";
import Peer from "peerjs";

let myPeer;
let myPerrId: string;

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
};

export const connectToNewUser = (data) => {
  const localStream = store.getState().webrtc.localStream;
  const call = myPeer!.call(data.peerId, localStream);

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
