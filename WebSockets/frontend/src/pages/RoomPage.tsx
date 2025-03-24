import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { Peer } from "https://esm.sh/peerjs@1.5.4?bundle-deps";

const socket = io("http://localhost:3000");

const peer = new Peer(undefined, {
  host: "localhost",
  port: 3001,
  path: "/peerjs",
  // debug: 3,
});

const constraints = {
  video: true,
  audio: false,
};

function RoomPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const peers = {};
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

  const connectToNewUser = (userId, stream) => {
    const call = peer.call(userId, stream);
    const videoDiv = document.createElement("div");
    const myVideo = document.createElement("video");
    call.on("stream", (remoteStream) => {
      addVideoStream(videoDiv, myVideo, remoteStream);
    });

    call.on("close", () => {
      myVideo.remove();
    });
  };

  const addVideoStream = (videoDiv, userVideo, userStream) => {
    if (!userStream.active) return;
    const audio = document.createElement("audio");

    const idParagraph = document.createElement("p");
    const activeP = document.createElement("p");
    idParagraph.textContent = userStream.id;
    activeP.textContent = userStream.active;
    if (!otherVideoRefsContainer.current) return;
    videoDiv.id = userStream.id;
    userVideo.srcObject = userStream;
    audio.srcObject = userStream;
    userVideo.autoplay = true;
    userVideo.playsInline = true;

    userVideo.style.width = "300px";
    userVideo.style.margin = "10px";
    userVideo.style.borderWidth = "10px";
    videoDiv.appendChild(userVideo);
    videoDiv.appendChild(audio);
    videoDiv.appendChild(idParagraph);
    videoDiv.appendChild(activeP);
    otherVideoRefsContainer.current?.appendChild(videoDiv);
  };
  console.log(otherVideoRefsContainer.current);
  useEffect(() => {
    const getMediaStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const videoDiv = document.createElement("div");
      const myVideo = document.createElement("video");

      addVideoStream(videoDiv, myVideo, stream);
      peer.on("call", (call) => {
        call.answer(stream);

        const videoDiv = document.createElement("div");
        const userVideo = document.createElement("video");
        call.on("stream", (userUserStream) => {
          addVideoStream(videoDiv, userVideo, userUserStream);
        });
      });

      socket.on("user-connected", (id) => {
        connectToNewUser(id, stream);
      });
    };
    getMediaStream();
  }, []);

  useEffect(() => {
    peer.on("open", (id: string) => {
      socket.emit("join-room", roomId, id);
    });
  }, [roomId]);

  useEffect(() => {
    socket.on("user-disconnected", (id) => {
      if (peers[id]) {
        peers[id].close();
      }
      console.log(peers);
    });
  }, []);

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
      <p>Room: {roomId}</p>
      <video
        ref={videoRef}
        style={{ width: "300px", margin: "10px" }}
        autoPlay
        playsInline
      />
      <div
        ref={otherVideoRefsContainer}
        style={{ width: "100%", display: "flex", flexDirection: "row" }}
      ></div>
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
