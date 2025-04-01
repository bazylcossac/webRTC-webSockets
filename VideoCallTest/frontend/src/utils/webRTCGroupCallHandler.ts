import Peer from "peerjs";
import store from "../store/store";
import { handleCreateGroupCall, sendJoinRoomRequest } from "./wssConnection";
import { setCallState, setGroupCallActive } from "../store/slices/webrtcSlice";
import { callStates } from "../constants";

let myPeer;
let myPeerId: string;

export const connectWithPeer = () => {
  myPeer = new Peer("", {
    path: "/peerjs",
    host: "/",
    port: 3000,
  });

  myPeer.on("open", (id: string) => {
    myPeerId = id;
    console.log("CONENCTED WITH PEERJS");
    console.log(id);
  });
};

export const createGroupCall = () => {
  handleCreateGroupCall({
    hostPeerId: myPeerId,
    hostName: store.getState().user.name,
  });

  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
  store.dispatch(setGroupCallActive(true));
};

export const joinRoom = (groupCallId: string, groupPeerId: string) => {
  const localStream = store.getState().webrtc.localStream as MediaStream | null;
  if (!localStream) return;

  sendJoinRoomRequest({
    localStreamId: localStream.id,
    groupCallId: groupCallId,
    groupPeerId: groupPeerId,
  });
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
  store.dispatch(setGroupCallActive(true));
};

export const connectToGroup = (data) => {
  console.log("CONNECTED TO GROUP");
  console.log(data);
};
