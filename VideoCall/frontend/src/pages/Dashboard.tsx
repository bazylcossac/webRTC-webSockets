import { useEffect } from "react";
import ActiveUsers from "../components/dashboard/activeUsers";
import styles from "../styles/dashboardPage.module.css";
import { getLocalStream } from "../utils/webRTCHandler";
import DashboardLocalVideo from "../components/dashboard/dashboardLocalVideo";
import DashboardRemoteVideo from "../components/dashboard/dashboardRemoteVideo";
import CallDialog from "../components/callDialogs/callDialog";

function Dashboard() {
  useEffect(() => {
    getLocalStream();
  }, []);

  return (
    <section>
      <div className={styles.mainContainerWrapper}>
        <div className={styles.mainContainer}>
          <DashboardLocalVideo />
          <DashboardRemoteVideo />
          <CallDialog />
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
