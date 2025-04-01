type groupCallType = {
  hostName: string;
  hostPeerId: string;
  socketId: string;
  groupId: string;
};

function ActiveGroup({ groupCall }: { groupCall: groupCallType }) {
  const handleJoinGroup = () => {};

  return (
    <div>
      <p>{groupCall.hostName}'s group</p>
      <button onClick={handleJoinGroup}>Join group</button>
    </div>
  );
}

export default ActiveGroup;
