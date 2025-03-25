import { useDispatch, useSelector } from "react-redux";
import { callStates } from "../../lib/constants";
import "./callDialot.module.css";

function CallDialog() {
  const disptach = useDispatch();
  const callState = useSelector((state) => state.webrtc.callState);

  if (callState === callStates.CALL_UNAVILABLE) return;

  if (callState === callStates.CALL_REQUESTED) {
    return (
      <div className="direct_calling_dialog">
        <span>Calling</span>
      </div>
    );
  }
  if (callState === callStates.) {

  }

//   return <div>callDialog</div>;
}

export default CallDialog;
