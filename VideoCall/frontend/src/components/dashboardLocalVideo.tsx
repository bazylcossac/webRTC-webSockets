import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

function DashboardLocalVideo() {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const localStream = useSelector((state) => state.webrtc.localStream);

  useEffect(() => {
    localVideoRef.current!.srcObject = localStream;
  });

  return (
    <div>
      <video ref={localVideoRef} playsInline autoPlay />
    </div>
  );
}

export default DashboardLocalVideo;
