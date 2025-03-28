import GroupCallRoom from "./groupCallRoom";

const rooms = [
  {
    roomId: "3512",
    hostName: "Michal",
  },
  {
    roomId: "3542",
    hostName: "Nicola",
  },
  {
    roomId: "4312",
    hostName: "Berni",
  },
];

function GroupCallRooms() {
  return (
    <>
      {rooms.map((room) => (
        <GroupCallRoom key={room.roomId} room={room} />
      ))}
    </>
  );
}

export default GroupCallRooms;
