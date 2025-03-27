import { io, Socket } from "socket.io-client";
import store from "../store/store";
import { setActiveUsers } from "../store/slices/userSlice";
import * as webRTCHandler from "./webRTCHandler";
import { broadcastEvents } from "../lib/constants";
import { handleCloseConnection } from "./webRTCHandler";
const SERVER_URL = "http://localhost:3000";

let socket: Socket;

export const connectoToWs = () => {
  socket = io(SERVER_URL);
  socket.on("connection", (socketId) => {
    console.log(socketId);
  });

  socket.on("broadcast", (data) => {
    handleBroadCastEvent(data);
    console.log(data.activeUsers);
  });

  socket.on("pre-offer", (data) => {
    webRTCHandler.handlePreOffer(data);
  });

  socket.on("pre-offer-answer", (data) => {
    webRTCHandler.handlePreOfferAnswer(data);
  });

  socket.on("webRTC-offer", (data) => {
    webRTCHandler.handleOffer(data);
  });
  socket.on("webRTC-answer", (data) => {
    webRTCHandler.handleAnswer(data);
  });

  socket.on("webRTC-candidate", (data) => {
    webRTCHandler.handeCandidate(data);
  });
  socket.on("close-connection", (data) => {
    console.log(data);
    console.log("CONNECTION CLOSE");
    handleCloseConnection()
  });
};

export const registerNewUser = (username: string) => {
  socket.emit("user-join", { username, socketId: socket.id });
};

export const sendWebRTCOffer = (data) => {
  socket.emit("webRTC-offer", data);
  // webRTCHandler.handlePreOffer(data);
};

export const sendWebRTCAnswer = (data) => {
  socket.emit("webRTC-answer", data);
};

export const sendPreOffer = (data) => {
  socket.emit("pre-offer", data);
};

export const sendPreOfferAnswer = (data) => {
  socket.emit("pre-offer-answer", data);
};

export const sednWebRTCCandidate = (data) => {
  socket.emit("webRTC-candidate", data);
};

export const sendCloseConnectionIformation = (data) => {
  socket.emit("close-connection", data);
};

const handleBroadCastEvent = (data) => {
  switch (data.eventType) {
    case broadcastEvents.ACTIVE_USERS: {
      const activeUsers = data.activeUsers.filter(
        (users) => users.socketId !== socket.id
      );
      store.dispatch(setActiveUsers(activeUsers));
      break;
    }
    default:
      break;
  }
};
