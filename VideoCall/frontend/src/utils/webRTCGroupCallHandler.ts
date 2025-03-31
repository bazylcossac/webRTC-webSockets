import { callStates } from "../lib/constants";
import { setCallState, setGroupCallASctive } from "../store/slices/webrtcSlice";
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
  // console.log(localStream.id);
  sendJoinGroupCallRequest({
    groupCallId,
    socketId,
    localStreamId: localStream.id,
    peerId: myPerrId,
  });
};

export const connectToNewUser = (data) => {};
