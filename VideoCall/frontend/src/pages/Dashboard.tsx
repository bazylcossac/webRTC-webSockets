import { useEffect } from "react";
import ActiveUsers from "../components/dashboard/activeUsers";
import styles from "../styles/dashboardPage.module.css";
import { getLocalStream } from "../utils/webRTCHandler";
import DashboardLocalVideo from "../components/dashboard/dashboardLocalVideo";
import DashboardRemoteVideo from "../components/dashboard/dashboardRemoteVideo";

import { useSelector } from "react-redux";
import CallingDialog from "../components/callDialogs/callingDialog";
import RejectedDialog from "../components/callDialogs/rejectedDialog";
import { callStates } from "../lib/constants";
import IncomingCall from "../components/callDialogs/incomingCall";
import ConversationButtons from "../components/ConversationButtons/ConversationButtons";

function Dashboard() {
  const callState = useSelector((state) => state.webrtc.callState);
  const callRejected = useSelector((state) => state.webrtc.callRejected);
  const callingDialogVisible = useSelector(
    (state) => state.webrtc.callingDialogVisible
  );
  useEffect(() => {
    getLocalStream();
  }, []);

  console.log(callRejected);

  return (
    <section>
      <div className={styles.mainContainerWrapper}>
        <div className={styles.mainContainer}>
          <DashboardLocalVideo />
          <DashboardRemoteVideo />
          {callState === callStates.CALL_IN_PROGRESS && <ConversationButtons />}
          {callingDialogVisible && <CallingDialog />}
          {callRejected.rejected && <RejectedDialog />}
          {callState === callStates.CALL_REQUESTED && <IncomingCall />}
        </div>

        <div className={styles.usersListRight}>
          <ActiveUsers />
        </div>
      </div>
      <div className={styles.usersListBottom}></div>
    </section>
  );
}

export default Dashboard;
