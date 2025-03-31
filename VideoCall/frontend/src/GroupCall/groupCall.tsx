import { useSelector } from "react-redux";
import GroupCallBtn from "./groupCallBtn";
import { callStates } from "../lib/constants";
import { createRoom } from "../utils/webRTCGroupCallHandler";

import MainGroupCallRoom from "../components/GroupCallRooms/mainGroupCallRoom";

function GroupCall() {
  const localStream = useSelector((state) => state.webrtc.localStream);
  const callState = useSelector((state) => state.webrtc.callState);
  const groupCallActive = useSelector((state) => state.webrtc.groupCallActive);
  console.log("group active ",  groupCallActive);
  const handleCreateRoom = () => {
    createRoom();
  };

  return (
    <div>
      {!groupCallActive &&
        localStream &&
        callState !== callStates.CALL_IN_PROGRESS && (
          <GroupCallBtn onClick={handleCreateRoom} label="Create group call" />
        )}
      {groupCallActive && <MainGroupCallRoom />}
      
    </div>
  );
}

export default GroupCall;
