import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("User connected with: ", socket.id);

  socket.on("send-message", (data) => {
    io.emit("send-message", data);
  });
});

httpServer.listen(3000, () => {
  console.log("Server running on port 3000!");
});

app.get("/", (req, res) => {
  res.json({ message: "server working" });
});

// io.listen(3000);
