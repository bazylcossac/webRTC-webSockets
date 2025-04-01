import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import webrtcReducer from "./slices/webrtcSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    webrtc: webrtcReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "webrtc/setLocalStream",
          "webrtc/setRemoteStream",
          "webrtc/addStreamToGroupCall",
        ],
        ignoredPaths: [
          "webrtc.localStream",
          "webrtc.remoteStream",
          "webrtc.groupCallsStreams",
        ],
      },
    }),
});

export default store;
