import { joinRoomRequest } from "../../utils/webRTCGroupCallHandler";
type roomType = {
  groupCallId: string;
  peerId: string;
  hostName: string;
  socketId: string; // host socket id
};

function GroupCallRoom({ room }: { room: roomType }) {
  const handleJoinGroupCall = () => {
    joinRoomRequest(room.groupCallId, room.socketId);
  };

  return <div onClick={handleJoinGroupCall}>{room.hostName}'s room</div>;
}

export default GroupCallRoom;
