import "./callDialot.module.css";

function IncomingCall() {
  const handleAcceptCall = () => {
    /// actions
  };
  const handleRejectCall = () => {
    /// actions
  };

  return (
    <div className="direct_call_dialog">
      <p className="direct_call_dialog_caller_name">Caller</p>
      <div className="direct_call_dialog_button_container">
        <button
          className="direct_call_dialog_accept_button"
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
