import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:3000";

export const connectoToWs = () => {
  const socket = io(SERVER_URL);
  socket.on("connection", (socketId) => {
    console.log(socketId);
  });
};
