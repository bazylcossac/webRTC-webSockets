import { io, Socket } from "socket.io-client";
import store from "../store/store";
import { setActiveGroups, setActiveUsers } from "../store/slices/userSlice";
import * as webRTCHandler from "./webRTCHandler";
import { broadcastEvents } from "../lib/constants";
import { handleCloseConnection } from "./webRTCHandler";
import {
  connectToNewUser,
  disconnectUserFromGroupCall,
} from "./webRTCGroupCallHandler";
const SERVER_URL = "http://localhost:3000";

let socket: Socket;

export const connectoToWs = () => {
  socket = io(SERVER_URL);
  socket.on("connection", (socketId) => {
    console.log(socketId);
  });

  socket.on("broadcast", (data) => {
    handleBroadCastEvent(data);
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
    handleCloseConnection();
  });

  /// peer js group calls

  socket.on("group-call-join-request", (data) => {
    connectToNewUser(data);
  });

  socket.on("group-call-user-disconnect", (data) => {
    disconnectUserFromGroupCall(data);
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

    case broadcastEvents.GROUP_CALL_ROOMS: {
      const activeGroups = data.groupCalls.filter(
        (group) => group.socketId !== socket.id
      );
      store.dispatch(setActiveGroups(activeGroups));
      break;
    }
    default:
      break;
  }
};

/// PEER JS

export const sendCreateRoomRequest = (data) => {
  socket.emit("group-call-create", data);
};

export const sendJoinGroupCallRequest = (data) => {
  socket.emit("group-call-join-request", data);
};

export const sendCloseConnectionInGroupCall = (data) => {
  socket.emit("group-call-user-disconnect", data);
};
