import { io, Socket } from "socket.io-client";
import store from "../store/store";
import { setActiveUsers } from "../store/slices/userSlice";
import {
  handleAnswer,
  handleCandidate,
  handleCloseConnection,
  handleOffer,
  handlePreOffer,
  handlePreOfferAnswer,
} from "./webRTCHandler";
import {
  setCallingDialogVisible,
  setCallState,
  setGroupCalls,
} from "../store/slices/webrtcSlice";
import { callStates } from "../constants";
import {
  connectToGroup,
  handleUserLeaveGroupCall,
} from "./webRTCGroupCallHandler";

const serverUrl = "http://localhost:3000";
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

  socket.on("close-connection", (data) => {
    handleCloseConnection(data);
  });

  socket.on("user-left", (data) => {
    handleUsers(data);
  });

  socket.on("create-group-call", (groupCalls) => {
    const activeGroups = groupCalls.filter(
      (group) => group.socketId !== socket.id
    );
    console.log(activeGroups);
    store.dispatch(setGroupCalls(activeGroups));
  });

  socket.on("join-group-request", (data) => {
    connectToGroup(data);
  });

  socket.on("user-leave-group-call", (localStreamId) => {
    handleUserLeaveGroupCall(localStreamId);
  });
};

export const handleRegisterUser = (username: string) => {
  socket.emit("user-join", { username, socketId: socket.id });
};

export const callToUser = (calleDetials) => {
  store.dispatch(setCallingDialogVisible(true));
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));

  socket.emit("pre-offer", {
    callerUsername: store.getState().user.name,
    calle: calleDetials,
  });
};

export const sendPreOfferAnswer = (data) => {
  socket.emit("pre-offer-answer", data);
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
export const sendInfoAboutClosingConnection = (data) => {
  socket.emit("close-connection", data);
};

const handleUsers = (data) => {
  const activeUsers = data.filter((user) => user.socketId !== socket.id);
  store.dispatch(setActiveUsers(activeUsers));
};

export const handleCreateGroupCall = (data) => {
  socket.emit("create-group-call", data);
};

export const sendJoinRoomRequest = (data) => {
  socket.emit("join-group-request", data);
};

export const sendLeaveGroupCallRequest = (data) => {
  socket.emit("user-leave-group-call", data);
};
