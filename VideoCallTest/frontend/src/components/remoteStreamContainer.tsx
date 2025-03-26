import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function LocalStreamContainer() {
  const remoteStream = useSelector((state) => state.webrtc.remoteStream);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current!.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <>
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="size-100 rounded-xl"
      />
    </>
  );
}

export default LocalStreamContainer;
