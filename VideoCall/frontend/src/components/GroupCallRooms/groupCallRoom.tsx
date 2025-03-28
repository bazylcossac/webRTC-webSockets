function GroupCallRoom({
  room: { roomId, hostName },
}: {
  room: { roomId: string; hostName: string};
}) {
  const handleJoinGroupCall = () => {};

  return (
    <div id={roomId} onClick={handleJoinGroupCall}>
      {hostName}
    </div>
  );
}

export default GroupCallRoom;
