import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["webrtc/setLocalStream", "webrtc/setRemoteStream"],
        ignoredPaths: ["webrtc.localStream", "webrtc.remoteStream"],
      },
    }),
});

export default store;
