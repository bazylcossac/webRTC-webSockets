import ActiveGroupCallsContainer from "./ActiveGroupCallsContainer";
import GroupCallCreateBtn from "./GroupCallCreateBtn";

function GroupCall() {
  return (
    <div>
      <div>{/* group call cameras */}</div>

      <GroupCallCreateBtn />

      <div>
        <ActiveGroupCallsContainer />
      </div>
    </div>
  );
}

export default GroupCall;
