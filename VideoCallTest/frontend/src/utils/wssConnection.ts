import { io, Socket } from "socket.io-client";
import store from "../store/store";
import { setActiveUsers } from "../store/slices/userSlice";
const serverUrl = "http://localhost:3000";
import { handlePreOffer, handlePreOfferAnswer } from "./webRTCHandler";

let socket: Socket;

export const wssConnection = () => {
  socket = io(serverUrl);

  socket.on("user-join", (data) => {
    console.log("REGISTER ID:", socket.id);
    handleUsers(data);
  });

  socket.on("pre-offer", (data) => {
    console.log(data);
    handlePreOffer(data);
  });

  socket.on("pre-offer-answer", (data) => {
    handlePreOfferAnswer(data);
  });

  socket.on("user-left", (data) => {
    handleUsers(data);
  });
};

export const handleRegisterUser = (username: string) => {
  socket.emit("user-join", { username, socketId: socket.id });
};

export const sendPreOfferAnswer = (data) => {
  socket.emit("pre-offer-answer", data);
};

export const callToUser = (calleDetials) => {
  socket.emit("pre-offer", {
    callerUsername: store.getState().user.name,
    calle: calleDetials,
  });
};

const handleUsers = (data) => {
  const activeUsers = data.filter((user) => user.socketId !== socket.id);
  store.dispatch(setActiveUsers(activeUsers));
};
