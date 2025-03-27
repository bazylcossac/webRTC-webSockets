const express = require("express");
const socket = require("socket.io");

const PORT = 3000;

const app = express();

const server = app.listen(PORT, () => {
  console.log("coneccted on port " + PORT);
});

const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let peers = [];
const broadcastEvents = {
  ACTIVE_USERS: "ACTIVE_USERS",
  GROUP_CALL_ROOMS: "GROUP_CALL_ROOMS",
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

    io.sockets.emit("broadcast", {
      eventType: broadcastEvents.ACTIVE_USERS,
      activeUsers: peers,
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
});
