import { useState } from "react";
import { sendMessage } from "../utils/webRTCHandler";

function ChatInput() {
  const [message, setMessage] = useState("");

  const sendMessageSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  return (
    <div>
      <form onSubmit={sendMessageSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button>send</button>
      </form>
    </div>
  );
}

export default ChatInput;
