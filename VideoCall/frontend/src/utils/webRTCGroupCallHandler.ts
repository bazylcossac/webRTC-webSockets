let myPeer;

export const connectWithPeer = () => {
  myPeer = new window.Peer(undefined, {
    path: "/peerjs",
    host: "/",
    port: "3000",
  });

  myPeer.on("open", (id) => {
    console.log("PEER CONNECTION");
    console.log(id);
  });
};
