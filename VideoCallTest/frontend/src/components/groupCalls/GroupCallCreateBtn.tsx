import { setIsHostingGroupCall } from "../../store/slices/webrtcSlice";
import store from "../../store/store";
import { createGroupCall } from "../../utils/webRTCGroupCallHandler";

function GroupCallCreateBtn() {
  const handleCreateGroupCall = () => {
    createGroupCall();
    store.dispatch(setIsHostingGroupCall(true))
  };

  return (
    <div>
      <button onClick={handleCreateGroupCall}>Create group call</button>
    </div>
  );
}

export default GroupCallCreateBtn;
