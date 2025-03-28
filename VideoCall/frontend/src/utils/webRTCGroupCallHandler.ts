import store from "../store/store";
import { sendCreateRoomRequest } from "./connectToWs";

let myPeer;
let myPerrId: string;
export const connectWithPeer = () => {
  myPeer = new window.Peer(undefined, {
    path: "/peerjs",
    host: "/",
    port: "3000",
  });

  myPeer.on("open", (id) => {
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
};
