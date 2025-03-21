import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function RoomPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();

  const handleInputChange = (message: string) => {
    setInputValue(message);
  };

  const submitSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("send-message", [inputValue, roomId]);
    setInputValue("");
  };

  const leaveRoom = (event: string, roomId: string | undefined) => {
    if (!roomId) {
      alert("No room id");
      return;
    }
    socket.emit(event, roomId);
    navigate("/");
  };

  const copyToClipboard = (roomId: string | undefined) => {
    if (!roomId) {
      alert("No roomId");
      return;
    }
    const roomUrl = "http://localhost:5173" + location.pathname;
    navigator.clipboard.writeText(roomUrl);
    alert("Url copied!");
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
      <button onClick={() => copyToClipboard(roomId)}>Invite to room</button>
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

      <button onClick={() => leaveRoom("leave-room", roomId)}>Leave</button>
    </>
  );
}

export default RoomPage;
