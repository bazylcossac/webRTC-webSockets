import { io, Socket } from "socket.io-client";
import store from "../store/store";
import { setActiveUsers } from "../store/slices/userSlice";
const serverUrl = "http://localhost:3000";
import {
  handleAnswer,
  handleCandidate,
  handleOffer,
  handlePreOffer,
  handlePreOfferAnswer,
} from "./webRTCHandler";
import { setCallingDialogVisible } from "../store/slices/webrtcSlice";

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

  socket.on("webRTC-offer", (offer) => {
    handleOffer(offer);
  });

  socket.on("webRTC-answer", (answer) => {
    handleAnswer(answer);
  });

  socket.on("webRTC-candidate", (candidate) => {
    handleCandidate(candidate);
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
  store.dispatch(setCallingDialogVisible(true));
};

export const sendWebRTCOffer = (data) => {
  socket.emit("webRTC-offer", data);
};

export const sendWebRTCAnswer = (data) => {
  socket.emit("webRTC-answer", data);
};

export const sendWebRTCCandidate = (data) => {
  socket.emit("webRTC-candidate", data);
};

const handleUsers = (data) => {
  const activeUsers = data.filter((user) => user.socketId !== socket.id);
  store.dispatch(setActiveUsers(activeUsers));
};
