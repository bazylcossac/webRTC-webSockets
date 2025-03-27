import { useSelector } from "react-redux";
import { callStates } from "../../lib/constants";
import "./callDialot.module.css";
import IncomingCall from "./incomingCall";
import CallingDialog from "./callingDialog";

function CallDialog() {
  const callState = useSelector((state) => state.webrtc.callState);

  if (callState === callStates.CALL_REQUESTED) {
    return (
      <>
        <IncomingCall />
      </>
    );
  }

  if (callState === callStates.CALL_IN_PROGRESS) {
    return (
      <>
        <CallingDialog />
      </>
    );
  }
}

export default CallDialog;
