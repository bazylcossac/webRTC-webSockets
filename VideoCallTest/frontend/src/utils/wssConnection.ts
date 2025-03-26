import { io, Socket } from "socket.io-client";
import store from "../store/store";
import { setActiveUsers } from "../store/slices/userSlice";
const serverUrl = "http://localhost:3000";

let socket: Socket;

export const wssConnection = () => {
  socket = io(serverUrl);

  socket.on("user-join", (data) => {
    console.log("REGISTER ID:", socket.id);
    handleUsers(data);
  });

  socket.on("user-left", (data) => {
    handleUsers(data);
  });
};

export const handleRegisterUser = (username: string) => {
  socket.emit("user-join", { username, socketId: socket.id });
};

const handleUsers = (data) => {
  const activeUsers = data.filter((user) => user.socketId !== socket.id);
  store.dispatch(setActiveUsers(activeUsers));
};
