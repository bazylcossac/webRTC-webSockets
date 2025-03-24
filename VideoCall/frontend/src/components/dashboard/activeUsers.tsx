import ActiveUserBlock from "./activeUserBlock";
import styles from "./dashboard.module.css";
const users = [
  {
    socketId: 123,
    name: "Michal",
  },
  {
    socketId: 568,
    name: "Berni",
  },
  {
    socketId: 133,
    name: "Nicola",
  },
];

function ActiveUsers() {
  return (
    <div className={styles.activeUsersContainer}>
      {users.map((user) => (
        <ActiveUserBlock
          socketId={user.socketId}
          name={user.name}
          key={user.socketId}
        />
      ))}
    </div>
  );
}

export default ActiveUsers;
