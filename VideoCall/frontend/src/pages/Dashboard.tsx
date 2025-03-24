import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserName } from "../store/slices/userSlice";
function Dashboard() {
  const dispatch = useDispatch();
  const userCurrentName = useSelector((state) => state.user.name);

  return (
    <div>
      {userCurrentName}
      <input
        type="text"
        onChange={(e) => dispatch(setUserName(e.target.value))}
      />
    </div>
  );
}

export default Dashboard;
