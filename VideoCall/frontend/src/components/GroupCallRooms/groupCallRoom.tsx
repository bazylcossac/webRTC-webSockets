function GroupCallRoom({ hostName }: { hostName: string }) {
  const handleJoinGroupCall = () => {};

  return <div onClick={handleJoinGroupCall}>{hostName}'s room</div>;
}

export default GroupCallRoom;
