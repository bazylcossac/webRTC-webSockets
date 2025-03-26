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

  socket.on("webRTC-candidate", data => {
    socket.to(data.callerSocketId).emit("webRTC-candidate", data.candidate)
  })

  socket.on("disconnect", () => {
    const newUsers = users.filter((user) => user.socketId !== socket.id);
    users = newUsers;
    console.log(users);

    io.sockets.emit("user-left", users);
  });
});
