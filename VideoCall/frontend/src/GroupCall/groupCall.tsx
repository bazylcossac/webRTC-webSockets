import { useSelector } from "react-redux";
import GroupCallBtn from "./groupCallBtn";
import { callStates } from "../lib/constants";

function GroupCall() {
  const localStream = useSelector((state) => state.webrtc.localStream);
  const callState = useSelector((state) => state.webrtc.callState);

  const createRoom = () => {
    // create rOOM
  };

  return (
    <div>
      {localStream && callState !== callStates.CALL_IN_PROGRESS && (
        <GroupCallBtn onClick={createRoom} label="Creage group call" />
      )}
    </div>
  );
}

export default GroupCall;
