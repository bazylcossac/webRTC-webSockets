import { io, Socket } from "socket.io-client";
import store from "../store/store";
import { setActiveUsers } from "../store/slices/userSlice";
const SERVER_URL = "http://localhost:3000";

let socket: Socket;

export const connectoToWs = () => {
  socket = io(SERVER_URL);
  socket.on("connection", (socketId) => {
    console.log(socketId);
  });

  socket.on("broadcast", (data) => {
    store.dispatch(setActiveUsers(data.activeUsers));
  });
};

export const registerNewUser = (username: string) => {
  socket.emit("user-join", { username, socketId: socket.id });
};

// export const listenForNewUsers = () => {
//   let users = [];
//   socket?.on("user-joined", (peers) => users.push(...peers));

//   return users;
// };
