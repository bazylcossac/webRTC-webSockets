import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const constraints = {
  video: true,
  audio: false,
};

function RoomPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  // const [constants, setConstants] = useState({ vide: true, audio: false });
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
    const getMediaStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current!.srcObject = stream;
    };
    getMediaStream();
  }, []);

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
      <video
        ref={videoRef}
        style={{ width: "300px", margin: "10px" }}
        autoPlay
        playsInline
      />
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
