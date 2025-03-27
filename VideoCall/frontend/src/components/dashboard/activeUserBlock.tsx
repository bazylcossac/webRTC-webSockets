import { callStates } from "../../lib/constants";
import { setCallIfRejected } from "../../store/slices/webrtcSlice";
import { callToOtherUser } from "../../utils/webRTCHandler";
import styles from "../dashboard/dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";

function ActiveUserBlock({
  socketId,
  name,
}: {
  socketId: number;
  name: string;
}) {
  const dispatch = useDispatch();
  const callState = useSelector((state) => state.webrtc.callState);

  const handleListItemPressed = () => {
    const calleDetails = { socketId, name };
    dispatch(setCallIfRejected({ rejected: false, answer: "" }));
    if (callState === callStates.CALL_AVAILABLE) {
      callToOtherUser(calleDetails);
    }
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
