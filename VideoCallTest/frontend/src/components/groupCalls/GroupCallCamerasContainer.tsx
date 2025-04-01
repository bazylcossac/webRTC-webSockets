import { useSelector } from "react-redux";
import GroupCallCamera from "./GroupCallCamera";

function GroupCallCamerasContainer() {
  const groupCallsStreams = useSelector(
    (state) => state.webrtc.groupCallsStreams
  );
  console.log("streams");
  console.log(groupCallsStreams);

  return (
    <div>
      {groupCallsStreams?.map((stream) => {
        return <GroupCallCamera stream={stream} key={stream.id} />;
      })}
    </div>
  );
}

export default GroupCallCamerasContainer;
