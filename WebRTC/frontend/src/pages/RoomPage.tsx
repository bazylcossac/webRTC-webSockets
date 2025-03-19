import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io(process.env.SERVER_URL);

function MainPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { roomId } = useParams();

  const handleInputChange = (message: string) => {
    setInputValue(message);
  };

  const submitSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("send-message", [inputValue, roomId]);
    setInputValue("");
  };

  useEffect(() => {
    socket.on("join-room", (args) => {
      console.log(args);
    });
  });

  useEffect(() => {
    socket.on("send-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => {
      socket.off("send-message");
    };
  }, []);

  return (
    <>
      <p>home page</p>
      <form onSubmit={submitSendMessage}>
        <input
          type="text"
          placeholder="send message"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <button type="submit">send message</button>
      </form>
      {messages.map((message, i) => (
        <p key={i}>{message}</p>
      ))}
    </>
  );
}

export default MainPage;
