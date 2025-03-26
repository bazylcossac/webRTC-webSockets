const express = require("express");
const socket = require("socket.io");

const port = 3000;

const app = express();

const server = app.listen(port, () => {
  console.log("server running");
});

const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let users = [];

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

  socket.on("disconnect", () => {
    const newUsers = users.filter((user) => user.socketId !== socket.id);
    users = newUsers;
    console.log(users);

    io.sockets.emit("user-left", users);
  });
});
