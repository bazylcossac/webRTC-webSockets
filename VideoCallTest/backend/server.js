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

io.on("connection", (socket) => {
  console.log("connected user: ", socket.id);
});
