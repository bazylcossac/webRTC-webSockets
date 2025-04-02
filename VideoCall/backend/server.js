const express = require("express");
const socket = require("socket.io");
const http = require("http");
const uuid = require("uuid");
const { ExpressPeerServer } = require("peer");
const groupCallHandler = require("./groupCallHandler");
const PORT = 3000;

const app = express();
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("coneccted on port " + PORT);
});

const peerServer = ExpressPeerServer(server, { debug: true });

app.use("/peerjs", peerServer);

groupCallHandler.createPeerListeners(peerServer);

const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let peers = [];
let groupCalls = [];
let peerId;
const broadcastEvents = {
  ACTIVE_USERS: "ACTIVE_USERS",
  GROUP_CALL_ROOMS: "GROUP_CALL_ROOMS",
  CLOSE_GROUP_CALL: "CLOSE_GROUP_CALL",
};

io.on("connection", (socket) => {
  socket.emit("connection", socket.id);
  console.log("new user connected: ", socket.id);
  socket.on("user-join", (data) => {
    peers.push({
      username: data.username,
      socketId: data.socketId,
    });
    io.sockets.emit("broadcast", {
      eventType: broadcastEvents.ACTIVE_USERS,
      activeUsers: peers,
    });
    console.log(peers);
  });
  socket.on("disconnect", () => {
    const newPeers = peers.filter((users) => users.socketId !== socket.id);
    peers = newPeers;
    const newCallGroups = groupCalls.filter(
      (group) => group.socketId !== socket.id
    );
    groupCalls = newCallGroups;

    io.sockets.emit("broadcast", {
      eventType: broadcastEvents.ACTIVE_USERS,
      activeUsers: peers,
    });

    // not workking ??? and idc why the fuck

    io.sockets.emit("broadcast", {
      eventType: broadcastEvents.CLOSE_GROUP_CALL,
      groupCalls: groupCalls,
    });
  });

  socket.on("pre-offer", (data) => {
    console.log("data");
    io.to(data.calle.socketId).emit("pre-offer", {
      callerUsername: data.caller.username, // your name
      callerSocketId: socket.id, // your socketid
    });
  });
  socket.on("pre-offer-answer", (data) => {
    io.to(data.callerSocketId).emit("pre-offer-answer", {
      answer: data.answer,
    });
  });

  socket.on("webRTC-offer", (data) => {
    console.log(data);
    io.to(data.calleSocketId).emit("webRTC-offer", {
      offer: data.offer,
    });
  });

  socket.on("webRTC-answer", (data) => {
    console.log(data);
    io.to(data.callerSocketId).emit("webRTC-answer", {
      answer: data.answer,
    });
  });

  socket.on("webRTC-candidate", (data) => {
    console.log("web rtc candidate");
    io.to(data.connectedUserSocketId).emit("webRTC-candidate", {
      candidate: data.candidate,
    });
  });

  socket.on("close-connection", (data) => {
    socket.to(data.connectedUserSocketId).emit("close-connection", data);
  });

  socket.on("group-call-create", (data) => {
    const groupCallId = uuid.v4();
    peerId = data.peerId; // host peer id
    socket.join(groupCallId);

    groupCalls.push({
      groupCallId: groupCallId,
      peerId: data.peerId,
      hostName: data.hostName,
      socketId: socket.id,
    });

    io.sockets.emit("broadcast", {
      eventType: broadcastEvents.GROUP_CALL_ROOMS,
      peerId: data.peerId,
      groupCalls: groupCalls,
    });
  });

  socket.on("group-call-join-request", (data) => {
    io.to(data.groupCallId).emit("group-call-join-request", {
      peerId: data.peerId,
      streamId: data.localStreamId,
    });
    socket.join(data.groupCallId);
  });

  socket.on("group-call-user-disconnect", (data) => {
    socket.leave(data.groupCallId);
    io.to(data.groupCallId).emit(
      "group-call-user-disconnect",
      data.localStreamId
    );
  });

  socket.on("close-room", (data) => {
    socket.leave(data.groupCallId);

    const newGroupCalls = groupCalls.filter(
      (group) => group.peerId !== data.peerId
    );

    groupCalls = newGroupCalls;

    io.sockets.emit("broadcast", {
      eventType: broadcastEvents.CLOSE_GROUP_CALL,
      groupCalls: groupCalls,
    });
  });

  socket.on("remove-from-group-call", (data) => {
    socket.leave(data.groupCallId);
  });
});
