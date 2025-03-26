import { useSelector, useDispatch } from "react-redux";
import { callToUser } from "../utils/wssConnection";
import { setCallState } from "../store/slices/webrtcSlice";
import { callStates } from "../constants";

function ActiveUsers() {
  const dispatch = useDispatch();
  const activeUsers = useSelector((state) => state.user.activeUsers);
  return (
    <div>
      <div>Available users</div>
      {activeUsers?.map((user, i) => (
        <div
          className=" p-2 bg-black inline-block text-white hover:cursor-pointer"
          key={i}
          onClick={() => {
            dispatch(setCallState(callStates.CALL_IN_PROGRESS));
            callToUser({
              callerName: user.username,
              calleSocketId: user.socketId,
            });
          }}
        >
          {user.username}
          {user.socketId}
        </div>
      ))}
    </div>
  );
}

export default ActiveUsers;
