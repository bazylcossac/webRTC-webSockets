import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { Peer } from "https://esm.sh/peerjs@1.5.4?bundle-deps";

const socket = io("http://localhost:3000");

const peer = new Peer(undefined, {
  host: "/",
  port: "3001",
});

const constraints = {
  video: true,
  audio: false,
};

function RoomPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const otherVideoRefsContainer = useRef<HTMLDivElement | null>(null);
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

  const addVideoStream = (userVideo, userUserStream) => {
    userVideo.srcObject = userUserStream;
    userVideo.style.width = "300px";
    userVideo.style.margin = "10px";
    otherVideoRefsContainer.current?.appendChild(userVideo);
  };

  const connectToNewUser = (userId, stream) => {
    const call = peer.call(userId, stream);
    const userVideo = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      addVideoStream(userVideo, userVideoStream);
    });

    call.on("close", () => {
      userVideo.remove();
    });
  };

  useEffect(() => {
    const getMediaStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const myVideo = document.createElement("video");
      addVideoStream(myVideo, stream);
      peer.on("call", (call) => {
        call.answer(stream);
        const userVideo = document.createElement("video");
        call.on("stream", (userUserStream) => {
          addVideoStream(userVideo, userUserStream);
        });
      });

      socket.on("user-connected", (userId) => {
        connectToNewUser(userId, stream);
      });
    };
    getMediaStream();
  });

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
      <div ref={otherVideoRefsContainer} style={{ width: "100%" }}></div>
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
