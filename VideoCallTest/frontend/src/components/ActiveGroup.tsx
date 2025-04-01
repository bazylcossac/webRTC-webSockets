import { joinRoom } from "../utils/webRTCGroupCallHandler";

type groupCallType = {
  hostName: string;
  hostPeerId: string;
  socketId: string;
  groupId: string;
};

const style = {
  backgroundColor: "black",
  padding: "5px",
  color: "white",
  display: "inline-block",
};
const button = {
  cursor: "pointer",
};

function ActiveGroup({ groupCall }: { groupCall: groupCallType }) {
  const handleJoinGroup = () => {
    joinRoom(groupCall.groupId, groupCall.hostPeerId);
  };

  return (
    <div style={style}>
      <p>{groupCall.hostName}'s group</p>
      <button style={button} onClick={handleJoinGroup}>
        Join group
      </button>
    </div>
  );
}

export default ActiveGroup;
