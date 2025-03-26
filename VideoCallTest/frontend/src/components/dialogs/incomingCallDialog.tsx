import { callStates } from "../../constants";
import { setCallState } from "../../store/slices/webrtcSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptIncomingCall,
  declineIncomingCall,
} from "../../utils/webRTCHandler";

function IncomingCall() {
  const dispatch = useDispatch();
  const callerUsername = useSelector((state) => state.webrtc.callerUsername);

  const handleAcceptCall = () => {
    acceptIncomingCall();
    /// make that when users is in thecall there is no chance to call to him
  };
  const handleRejectCall = () => {
    declineIncomingCall();
    dispatch(setCallState(callStates.CALL_AVAILABLE));
  };

  return (
    <div className="direct_call_dialog">
      <p className="direct_call_dialog_caller_name">{callerUsername}</p>
      <div className="direct_call_dialog_button_container">
        <button
          className="border-1 border-black rounded-lg p-2 cursor-pointer hover:bg-black hover:text-white"
          onClick={handleAcceptCall}
        >
          Accept
        </button>
        <button
          className="border-1 border-black rounded-lg p-2 cursor-pointer hover:bg-black hover:text-white"
          onClick={handleRejectCall}
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default IncomingCall;
