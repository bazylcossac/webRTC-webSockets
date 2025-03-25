import { useEffect } from "react";
import ActiveUsers from "../components/dashboard/activeUsers";
import styles from "../styles/dashboardPage.module.css";
import webRTCHandler from "../utils/webRTCHandler";
import DashboardLocalVideo from "../components/dashboardLocalVideo";

function Dashboard() {
  useEffect(() => {
    webRTCHandler();
  }, []);

  return (
    <section>
      <div className={styles.mainContainerWrapper}>
        <div className={styles.mainContainer}>
          <DashboardLocalVideo />
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
