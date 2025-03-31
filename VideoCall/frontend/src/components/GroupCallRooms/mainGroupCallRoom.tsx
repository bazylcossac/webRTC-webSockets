import ConversationButtons from "../ConversationButtons/ConversationButtons";
import { useSelector } from "react-redux";
import GroupVideoElement from "./GroupVideoElement";

function MainGroupCallRoom() {
  const groupCallStreams = useSelector(
    (state) => state.webrtc.groupCallStreams
  );

  groupCallStreams.forEach((stream) => console.log(stream));
  return (
    <div>
      {groupCallStreams?.map((stream: MediaStream) => {
        return <GroupVideoElement stream={stream} key={stream.id} />;
      })}

      <ConversationButtons />
    </div>
  );
}

export default MainGroupCallRoom;
