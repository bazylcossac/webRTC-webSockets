import { useDispatch, useSelector } from "react-redux";
import { callStates } from "../../lib/constants";
import "./callDialot.module.css";
import IncomingCall from "./incomingCall";

function CallDialog() {
  const disptach = useDispatch();
  const callState = useSelector((state) => state.webrtc.callState);

  if (callState === callStates.CALL_UNAVILABLE) return;

  if (callState === callStates.CALL_REQUESTED) {
    return (
      <>
        <IncomingCall />
      </>
    );
  }
  // if (callState === callStates.) {

  // }

  //   return <div>callDialog</div>;
}

export default CallDialog;
