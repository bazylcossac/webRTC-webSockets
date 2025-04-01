import { createGroupCall } from "../utils/webRTCGroupCallHandler";

function GroupCallCreateBtn() {
  const handleCreateGroupCall = () => {
    createGroupCall();
  };

  return (
    <div>
      <button onClick={handleCreateGroupCall}>Create group call</button>
    </div>
  );
}

export default GroupCallCreateBtn;
