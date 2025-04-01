import { useSelector } from "react-redux";
import ActiveGroup from "./ActiveGroup";

function ActiveGroupCalls() {
  const activeGroups = useSelector((state) => state.webrtc.groupCalls);
  console.log(activeGroups);

  return (
    <div>
      <p>Active groups</p>
      {activeGroups?.map((group) => (
        <ActiveGroup groupCall={group} key={group.groupId} />
      ))}
    </div>
  );
}

export default ActiveGroupCalls;
