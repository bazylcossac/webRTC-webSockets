import { useSelector } from "react-redux";
import { callToUser } from "../utils/wssConnection";

function ActiveUsers() {
  const activeUsers = useSelector((state) => state.user.activeUsers);
  return (
    <div>
      <div>Available users</div>
      {activeUsers?.map((user, i) => (
        <div
          className=" p-2 bg-black inline-block text-white hover:cursor-pointer"
          key={i}
          onClick={() =>
            callToUser({
              callerName: user.username,
              calleSocketId: user.socketId,
            })
          }
        >
          {user.username}
          {user.socketId}
        </div>
      ))}
    </div>
  );
}

export default ActiveUsers;
