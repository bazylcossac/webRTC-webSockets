import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import webRTCReducer from "./slices/webrtcSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    webrtc: webRTCReducer,
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
          "webrtc.groupCallStreams",
        ],
      },
    }),
});
export type AppDispatch = typeof store.dispatch;
export default store;
