import { useSelector } from "react-redux";
import CallingDialog from "./callingDialog";
import RejectedDialog from "./callRejectedDialog";
import IncomingCall from "./incomingCallDialog";
import { callStates } from "../../constants";

function CallDialog() {
  const callState = useSelector((state) => state.webrtc.callState);
  const callIfRejected = useSelector((state) => state.webrtc.callIfRejected);

  if (callState === callStates.CALL_REQUESTED) {
    return <IncomingCall />;
  }

  if (callState === callStates.CALL_IN_PROGRESS) {
    return <CallingDialog />;
  }
  if (callIfRejected.rejected) {
    return <RejectedDialog reason={callIfRejected.answer} />;
  }
}

export default CallDialog;
