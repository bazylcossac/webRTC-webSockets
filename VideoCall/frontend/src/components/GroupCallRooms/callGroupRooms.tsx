import GroupCallRoom from "./groupCallRoom";
import { useSelector } from "react-redux";

function GroupCallRooms() {
  const activeGroups = useSelector((state) => state.user.activeGroups);

  return (
    <>
      {activeGroups?.map((room) => (
        <GroupCallRoom key={room.groupCallId} hostName={room.hostName} />
      ))}
    </>
  );
}

export default GroupCallRooms;
