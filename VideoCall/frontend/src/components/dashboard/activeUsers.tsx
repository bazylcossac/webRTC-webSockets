import ActiveUserBlock from "./activeUserBlock";
import styles from "./dashboard.module.css";
import { useSelector } from "react-redux";

function ActiveUsers() {
  const activeUsers = useSelector((state) => state.user.activeUsers);
  return (
    <div className={styles.activeUsersContainer}>
      {activeUsers.map((user) => (
        <ActiveUserBlock
          socketId={user.socketId}
          name={user.username}
          key={user.socketId}
        />
      ))}
    </div>
  );
}

export default ActiveUsers;
