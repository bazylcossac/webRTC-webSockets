const express = require("express");
const socket = require("socket.io");
const http = require("http");
const uuid = require("uuid");
const { ExpressPeerServer } = require("peer");
const groupCallHandler = require("./groupCallHandler");
const port = 3000;

const app = express();

const server = http.createServer(app);

const peerServer = ExpressPeerServer(server, { debug: true });

groupCallHandler.createPeerListeners(peerServer);

app.use("/peerjs", peerServer);

server.listen(port, () => {
  console.log("server running");
});

const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const broadcastEvents = {
  ACTIVE_USERS: "ACTIVE_USERS",
  GROUP_CALL_ROOMS: "GROUP_CALL_ROOMS",
  CLOSE_GROUP_CALL: "CLOSE_GROUP_CALL",
};
let users = [];
let groupCalls = [];

io.on("connection", (socket) => {
  console.log("connected user: ", socket.id);
  socket.on("user-join", (data) => {
    users.push({
      username: data.username,
      socketId: data.socketId,
    });
    console.log(users);
    io.sockets.emit("user-join", users);
  });

  socket.on("pre-offer", (data) => {
    socket.to(data.calle.calleSocketId).emit("pre-offer", {
      callerName: data.callerUsername,
      callerSocketId: socket.id,
    });
  });

  socket.on("pre-offer-answer", (data) => {
    socket.to(data.callerSocketId).emit("pre-offer-answer", {
      answer: data.answer,
      socketId: socket.id,
    });
  });

  socket.on("webRTC-offer", (data) => {
    socket.to(data.calleSocketId).emit("webRTC-offer", data.offer);
  });

  socket.on("webRTC-answer", (data) => {
    socket.to(data.callerSocketId).emit("webRTC-answer", data.answer);
  });

  socket.on("webRTC-candidate", (data) => {
    socket.to(data.callerSocketId).emit("webRTC-candidate", data.candidate);
  });

  socket.on("close-connection", (data) => {
    socket.to(data.connectedUserSocketId).emit("close-connection", data);
  });

  socket.on("disconnect", () => {
    const newUsers = users.filter((user) => user.socketId !== socket.id);
    users = newUsers;
    console.log(users);

    io.sockets.emit("user-left", users);

    const newGroupCalls = groupCalls.filter(
      (group) => group.socketId !== socket.id
    );

    io.sockets.emit("broadcast", {
      eventType: broadcastEvents.CLOSE_GROUP_CALL,
      groupCalls: newGroupCalls,
    });
  });

  /// peerjs

  socket.on("create-group-call", (data) => {
    const groupId = uuid.v4();
    socket.join(groupId);

    groupCalls.push({
      hostName: data.hostName,
      hostPeerId: data.hostPeerId,
      socketId: socket.id,
      groupId: groupId,
    });
    io.sockets.emit("create-group-call", groupCalls);
  });

  socket.on("join-group-request", (data) => {
    io.to(data.groupCallId).emit("join-group-request", {
      peerId: data.groupPeerId,
      streamId: data.localStreamId,
    });
    socket.join(data.groupCallId);
  });

  socket.on("user-leave-group-call", (data) => {
    socket.leave(data.groupCallId);

    io.to(data.groupCallId).emit("user-leave-group-call", data.localStreamId);
  });

  socket.on("close-group-call", (data) => {
    socket.leave(data.groupCallId);

    const newGroups = groupCalls.filter(
      (group) => group.hostPeerId !== data.peerId
    );
    groupCalls = newGroups;
    console.log(groupCalls);

    // io.to(data.groupCallId).emit("close-group-call", data);

    io.sockets.emit("broadcast", {
      eventType: broadcastEvents.CLOSE_GROUP_CALL,
      groupCalls: groupCalls,
    });
  });

  socket.on("kick-user-from-group-call", (data) => {
    socket.leave(data.groupCallId);
  });
});
