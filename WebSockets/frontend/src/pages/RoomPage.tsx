import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function RoomPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const { roomId } = useParams();

  const handleInputChange = (message: string) => {
    setInputValue(message);
  };

  const submitSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("send-message", [inputValue, roomId]);
    setInputValue("");
  };

  const leaveRoom = () => {
    socket.emit("leave-room", roomId);
    navigate("/");
  };

  useEffect(() => {
    socket.emit("join-room", roomId);
  }, [roomId]);

  useEffect(() => {
    socket.on("send-message", (message) => {
      console.log(message);
      setMessages((prev) => [...prev, message]);
    });
    return () => {
      socket.off("send-message");
    };
  }, []);

  return (
    <>
      <p>Room: {roomId}</p>
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

      <button onClick={leaveRoom}>Leave</button>
    </>
  );
}

export default RoomPage;
