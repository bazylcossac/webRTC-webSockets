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

io.on("connection", (socket) => {
  socket.emit("connection", socket.id);
  console.log("new user connected: ", socket.id);
});
