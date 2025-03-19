import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { v4 as uuid } from "uuid";
const socket = io("http://localhost:3000");

function MainPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (message: string) => {
    setInputValue(message);
  };

  const submitSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    socket.emit("send-message", [inputValue, "all"]);
    setInputValue("");
  };

  // generate new room
  const generateRoom = () => {
    const roomId = uuid();
    socket.emit("join-room", 10);
    navigate(`/room/${10}`);
  };

  useEffect(() => {
    socket.emit("join-room", "all");
  }, []);

  useEffect(() => {
    socket.on("send-message", (message) => {
      console.log(message);
      setMessages((prev) => [...prev, message]);
    });
    return () => {
      socket.off("send-message");
      // socket.disconnect();
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

      <button onClick={generateRoom}>generate room</button>
    </>
  );
}

export default MainPage;
