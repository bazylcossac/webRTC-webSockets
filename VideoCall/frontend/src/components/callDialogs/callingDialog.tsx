import { closeConnection } from "../../utils/webRTCHandler";
import "./callDialot.module.css";

function CallingDialog() {
  return (
    <div className="direct_calling_dialog">
      <p>Calling</p>
      <button onClick={closeConnection}>Cancel</button>
    </div>
  );
}

export default CallingDialog;
