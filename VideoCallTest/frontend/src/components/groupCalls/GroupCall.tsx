import ActiveGroupCallsContainer from "./ActiveGroupCallsContainer";
import GroupCallCamerasContainer from "./GroupCallCamerasContainer";
import GroupCallCreateBtn from "./GroupCallCreateBtn";

function GroupCall() {
  return (
    <div>
      <div>
        <GroupCallCamerasContainer />
      </div>

      <GroupCallCreateBtn />

      <div>
        <ActiveGroupCallsContainer />
      </div>
    </div>
  );
}

export default GroupCall;
