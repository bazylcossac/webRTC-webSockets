import { useSelector } from "react-redux";
import GroupCallBtn from "./groupCallBtn";
import { callStates } from "../lib/constants";
import { createRoom } from "../utils/webRTCGroupCallHandler";

function GroupCall() {
  const localStream = useSelector((state) => state.webrtc.localStream);
  const callState = useSelector((state) => state.webrtc.callState);

  const handleCreateRoom = () => {
    createRoom();
  };

  return (
    <div>
      {localStream && callState !== callStates.CALL_IN_PROGRESS && (
        <GroupCallBtn onClick={handleCreateRoom} label="Create group call" />
      )}
    </div>
  );
}

export default GroupCall;
