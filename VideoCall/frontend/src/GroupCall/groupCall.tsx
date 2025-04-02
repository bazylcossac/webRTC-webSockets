import { useSelector } from "react-redux";
import GroupCallBtn from "./groupCallBtn";
import { callStates } from "../lib/constants";
import {
  createRoom,
  handleGroupCallUserDisconnect,
} from "../utils/webRTCGroupCallHandler";

import MainGroupCallRoom from "../components/GroupCallRooms/mainGroupCallRoom";

function GroupCall() {
  const localStream = useSelector((state) => state.webrtc.localStream);
  const callState = useSelector((state) => state.webrtc.callState);
  const groupCallActive = useSelector((state) => state.webrtc.groupCallActive);
  console.log("group active ", groupCallActive);
  const handleCreateRoom = () => {
    createRoom();
  };

  const handleLeaveRoom = () => {
    handleGroupCallUserDisconnect();
  };

  return (
    <div>
      {!groupCallActive &&
        localStream &&
        callState !== callStates.CALL_IN_PROGRESS && (
          <GroupCallBtn onClick={handleCreateRoom} label="Create group call" />
        )}
      {groupCallActive && <MainGroupCallRoom />}
      {groupCallActive && (
        <GroupCallBtn onClick={handleLeaveRoom} label="leave group call" />
      )}
    </div>
  );
}

export default GroupCall;
