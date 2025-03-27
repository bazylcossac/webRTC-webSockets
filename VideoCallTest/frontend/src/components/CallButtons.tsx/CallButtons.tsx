import { useDispatch, useSelector } from "react-redux";
import {
  setCameraEnabled,
  setMicEnabled,
} from "../../store/slices/webrtcSlice";

function CallButtons() {
  const dispatch = useDispatch();
  const localStream = useSelector((state) => state.webrtc.localStream);
  const micEnabled = useSelector((state) => state.webrtc.micEnabled);
  const cameraEnabled = useSelector((state) => state.webrtc.cameraEnabled);

  const handleMicEnableChange = () => {
    const micState = micEnabled;
    localStream.getAudioTracks()[0].enabled = !micState;
    dispatch(setMicEnabled(!micState));
  };
  const handleCameraEnableChange = () => {
    const cameraState = cameraEnabled;
    localStream.getVideoTracks()[0].enabled = !cameraState;
    dispatch(setCameraEnabled(!cameraState));
    console.log(!cameraState);
  };
  const handleScreenShare = () => {};
  const handleLeave = () => {};

  return (
    <div className="flex flex-row gap-4 abosolute">
      <button onClick={handleMicEnableChange}>Mute</button>
      <button onClick={handleCameraEnableChange}>Camera</button>
      <button onClick={handleScreenShare}>Share screen</button>
      <button onClick={handleLeave}>Leave</button>
    </div>
  );
}

export default CallButtons;
