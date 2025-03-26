import { useEffect } from "react";

import { getLocalStream } from "../utils/webRTCHandler";
import LocalStreamContainer from "../components/localStreamContainer";
import RemoteStreamContainer from "../components/remoteStreamContainer";
import ActiveUsers from "../components/activeUsers";

import { useSelector } from "react-redux";
import { callStates } from "../constants";
import CallingDialog from "../components/dialogs/callingDialog";
import IncomingCall from "../components/dialogs/incomingCallDialog";
import RejectedDialog from "../components/dialogs/callRejectedDialog";
function Dashboard() {
  const callState = useSelector((state) => state.webrtc.callState);
  const callIfRejected = useSelector((state) => state.webrtc.callIfRejected);

  console.log(callIfRejected);
  useEffect(() => {
    getLocalStream();
  }, []);

  return (
    <div>
      {callState === callStates.CALL_REQUESTED && <IncomingCall />}
      {callState === callStates.CALL_IN_PROGRESS && <CallingDialog />}
      {callIfRejected.reject && (
        <RejectedDialog reason={callIfRejected.answer} />
      )}

      <LocalStreamContainer />
      <RemoteStreamContainer />
      <ActiveUsers />
    </div>
  );
}

export default Dashboard;
