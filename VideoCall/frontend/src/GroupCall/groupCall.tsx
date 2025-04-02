import { useSelector } from "react-redux";
import GroupCallBtn from "./groupCallBtn";
import { callStates } from "../lib/constants";
import {
  closeRoomCall,
  createRoom,
  handleGroupCallUserDisconnect,
} from "../utils/webRTCGroupCallHandler";

import MainGroupCallRoom from "../components/GroupCallRooms/mainGroupCallRoom";

function GroupCall() {
  const localStream = useSelector((state) => state.webrtc.localStream);
  const callState = useSelector((state) => state.webrtc.callState);
  const groupCallActive = useSelector((state) => state.webrtc.groupCallActive);
  const isHostingGroupCall = useSelector(
    (state) => state.webrtc.isHostingGroupCall
  );

  const handleCreateRoom = () => {
    createRoom();
  };

  const handleLeaveRoom = () => {
    handleGroupCallUserDisconnect();
  };

  const handleCloseRoomCall = () => {
    closeRoomCall();
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
      {groupCallActive && isHostingGroupCall && (
        <GroupCallBtn onClick={handleCloseRoomCall} label="Close room" />
      )}
    </div>
  );
}

export default GroupCall;
