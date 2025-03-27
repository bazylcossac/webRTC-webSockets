import { useState } from "react";
import styles from "./conversationbuttons.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setLocalCameraEnabled,
  setLocalMicrophoneEnabled,
} from "../../store/slices/webrtcSlice";

function ConversationButtons() {
  const dispatch = useDispatch();

  const localMicrophoneEnabled = useSelector(
    (state) => state.webrtc.localMicrophoneEnabled
  );
  const localCameraEnabled = useSelector(
    (state) => state.webrtc.localCameraEnabled
  );
  const localStream = useSelector((state) => state.webrtc.localStream);

  const handleLocalMicrophoneEnabled = () => {
    const micEnabled = localMicrophoneEnabled;
    dispatch(setLocalMicrophoneEnabled(!micEnabled));
    localStream.getAudioTracks()[0].enabled = !micEnabled;
  };

  const handleLocalCameraEnabled = () => {
    const cameraEnabled = localCameraEnabled;
    dispatch(setLocalCameraEnabled(!cameraEnabled));
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
  };

  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button} onClick={handleLocalMicrophoneEnabled}>
        Mute
      </button>
      <button className={styles.button} onClick={handleLocalCameraEnabled}>
        Camera
      </button>
      <button className={styles.button}>Share screen</button>
      <button className={styles.button}>End call</button>
    </div>
  );
}

export default ConversationButtons;
