import styles from "../dashboard/dashboard.module.css";

function ActiveUserBlock({
  socketId,
  name,
}: {
  socketId: number;
  name: string;
}) {
  return (
    <div id={socketId.toString()} className={styles.activeUserBlock}>
      <p>{name}</p>
    </div>
  );
}

export default ActiveUserBlock;
