import { callToOtherUser } from "../../utils/webRTCHandler";
import styles from "../dashboard/dashboard.module.css";

function ActiveUserBlock({
  socketId,
  name,
}: {
  socketId: number;
  name: string;
}) {
  const handleListItemPressed = () => {
    const calleDetails = { socketId, name };
    callToOtherUser(calleDetails);
  };

  return (
    <div
      id={socketId.toString()}
      className={styles.activeUserBlock}
      onClick={handleListItemPressed}
    >
      <p>{name}</p>
    </div>
  );
}

export default ActiveUserBlock;
