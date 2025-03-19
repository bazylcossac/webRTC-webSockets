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
    const [message, roomId] = data;
    if (roomId !== null) {
      socket.to(roomId).emit("send-message", message);
    } else {
      socket.emit("send-message", message);
    }
  });
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log("room id: ", roomId);
  });
});

httpServer.listen(3000, () => {
  console.log("Server running on port 3000!");
});

app.get("/", (req, res) => {
  res.json({ message: "server working" });
});

// io.listen(3000);
