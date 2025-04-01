import Peer from "peerjs";

let myPeer;
let myPeerId: string;

export const connectWithPeer = () => {
  myPeer = new Peer("", {
    path: "/peerjs",
    host: "/",
    port: 3000,
  });

  myPeer.on("open", (id: string) => {
    console.log("CONENCTED WITH PEERJS");
    console.log(id);
  });
};
