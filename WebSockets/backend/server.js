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
  socket.on("send-message", (data) => {
    const [message, roomId] = data;

    if (roomId !== "all") {
      io.to(roomId).emit("send-message", message);
    } else if (roomId === "all") {
      io.to(roomId).emit("send-message", message);
    }
  });
  socket.on("join-room", (roomId) => {
    console.log("User connected with: ", socket.id);
    console.log("room id: ", roomId);
    if (roomId) {
      socket.join(roomId);
    }
  });

  socket.on("leave-room", (roomId) => {
    socket.leave(roomId);
  });
});

httpServer.listen(3000, () => {
  console.log("Server running on port 3000!");
});

app.get("/", (req, res) => {
  res.json({ message: "server working" });
});
