import GroupCallRoom from "./groupCallRoom";
import { useSelector } from "react-redux";

function GroupCallRooms() {
  const activeGroups = useSelector((state) => state.user.activeGroups);

  return (
    <>
      {activeGroups?.map((room) => (
        <GroupCallRoom key={room.groupCallId} room={room} />
      ))}
    </>
  );
}

export default GroupCallRooms;
