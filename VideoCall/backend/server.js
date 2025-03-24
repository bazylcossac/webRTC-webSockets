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
});
