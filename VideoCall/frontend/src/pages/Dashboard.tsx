import ActiveUsers from "../components/dashboard/activeUsers";
import styles from "../styles/dashboardPage.module.css";
function Dashboard() {
  return (
    <section>
      <div className={styles.mainContainerWrapper}>
        <div className={styles.mainContainer}>Main</div>

        <div className={styles.usersListRight}>
          <ActiveUsers />
        </div>
      </div>
      <div className={styles.usersListBottom}></div>
    </section>
  );
}

export default Dashboard;
