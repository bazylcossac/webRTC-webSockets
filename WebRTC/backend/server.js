import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("IO running on port 3000! ", socket);
  io.emit("message", "hello world");
});

httpServer.listen(3000, () => {
  console.log("Server running on port 3000!");
});

// io.listen(3000);
