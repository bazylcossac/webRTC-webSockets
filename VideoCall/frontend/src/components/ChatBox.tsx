import { useSelector } from "react-redux";

function ChatBox() {
  const messages = useSelector((state) => state.webrtc.messages);

  return (
    <div>
      {messages.map((message, i) => {
        return (
          <div key={i}>
            <p>{message.name}</p>
            <p>{message.message}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ChatBox;
