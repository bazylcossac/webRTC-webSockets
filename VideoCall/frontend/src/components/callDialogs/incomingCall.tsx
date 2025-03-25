import { useSelector } from "react-redux";
import "./callDialot.module.css";
import {
  acceptIncomingCall,
  declineIncomingCall,
} from "../../utils/webRTCHandler";

function IncomingCall() {
  const callingUsername = useSelector((state) => state.webrtc.callingUsername);
  const handleAcceptCall = () => {
    acceptIncomingCall();
  };
  const handleRejectCall = () => {
    declineIncomingCall();
  };

  return (
    <div className="direct_call_dialog">
      <p className="direct_call_dialog_caller_name">{callingUsername}</p>
      <div className="direct_call_dialog_button_container">
        <button
          className=".irect_call_dialog_accept_button"
          onClick={handleAcceptCall}
        >
          Accept
        </button>
        <button
          className="direct_call_dialog_reject_button"
          onClick={handleRejectCall}
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default IncomingCall;
