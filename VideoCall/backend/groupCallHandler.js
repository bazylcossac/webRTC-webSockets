const createPeerListeners = (peerServer) => {
  peerServer.on("connection", (user) => {
    console.log("connected to peerjs server");
    console.log(user.id);
  });
};

module.exports = {
  createPeerListeners,
};
