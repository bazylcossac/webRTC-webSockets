import { useSelector } from "react-redux";
import ActiveGroup from "./ActiveGroup";

function ActiveGroupCalls() {
  const activeGroups = useSelector((state) => state.webrtc.activeGroups);

  return (
    <div>
      {activeGroups?.map((group) => (
        <ActiveGroup groupCall={group} />
      ))}
    </div>
  );
}

export default ActiveGroupCalls;
