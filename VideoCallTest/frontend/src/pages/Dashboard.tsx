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
import CallButtons from "../components/CallButtons.tsx/CallButtons";
function Dashboard() {
  const callState = useSelector((state) => state.webrtc.callState);
  const callIfRejected = useSelector((state) => state.webrtc.callIfRejected);
  const callingDialogVisible = useSelector(
    (state) => state.webrtc.callingDialogVisible
  );

  console.log(callIfRejected);
  useEffect(() => {
    getLocalStream();
  }, []);

  return (
    <div>
      {callState === callStates.CALL_REQUESTED && <IncomingCall />}
      {callingDialogVisible && <CallingDialog />}
      {callIfRejected.reject && (
        <RejectedDialog reason={callIfRejected.answer} />
      )}

      <LocalStreamContainer />
      <RemoteStreamContainer />
      {callState === callStates.CALL_IN_PROGRESS && <CallButtons />}
      <ActiveUsers />
    </div>
  );
}

export default Dashboard;
