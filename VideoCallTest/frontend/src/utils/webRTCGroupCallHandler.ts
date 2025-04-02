import Peer from "peerjs";
import store from "../store/store";
import { handleCreateGroupCall, sendJoinRoomRequest } from "./wssConnection";
import {
  addStreamToGroupCall,
  setCallState,
  setGroupCallActive,
} from "../store/slices/webrtcSlice";
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

  myPeer.on("call", (call) => {
    const localStream = store.getState().webrtc.localStream;
    if (!localStream) return;
    call.answer(localStream);

    call.on("stream", (incomingStream) => {
      console.log(incomingStream);
      const groupCallsStreams = store.getState().webrtc.groupCallsStreams;

      const stream = groupCallsStreams.find(
        (stream) => stream.id === incomingStream.id
      );
      if (!stream) {
        console.log("ADDING STREAM");
        store.dispatch(addStreamToGroupCall(incomingStream));
      }
    });
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

export const joinRoom = (groupCallId: string) => {
  const localStream = store.getState().webrtc.localStream as MediaStream | null;
  if (!localStream) return;

  sendJoinRoomRequest({
    localStreamId: localStream.id,
    groupCallId: groupCallId,
    groupPeerId: myPeerId,
  });
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
  store.dispatch(setGroupCallActive(true));
};

export const connectToGroup = (data) => {
  const localStream = store.getState().webrtc.localStream;

  const call = myPeer!.call(data.peerId, localStream);

  call.on("stream", (incomingStream) => {
    console.log(incomingStream);
    const groupCallsStreams = store.getState().webrtc.groupCallsStreams;
    const stream = groupCallsStreams.find(
      (stream) => stream.id === incomingStream.id
    );
    if (!stream) {
      console.log("ADDING STREAM");
      store.dispatch(addStreamToGroupCall(incomingStream));
    }
  });
};
