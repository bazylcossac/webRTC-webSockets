import { useEffect } from "react";

import { getLocalStream } from "../utils/webRTCHandler";
import LocalStreamContainer from "../components/localStreamContainer";
import RemoteStreamContainer from "../components/remoteStreamContainer";
import ActiveUsers from "../components/activeUsers";
function Dashboard() {
  useEffect(() => {
    getLocalStream();
  }, []);

  return (
    <div>
      <LocalStreamContainer />
      <RemoteStreamContainer />
      <ActiveUsers />
    </div>
  );
}

export default Dashboard;
