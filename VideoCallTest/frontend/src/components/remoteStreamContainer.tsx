import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function LocalStreamContainer() {
  const remoteStream = useSelector((state) => state.webrtc.remoteStream);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  console.log(remoteStream);
  useEffect(() => {
    if (remoteStream) {
      remoteVideoRef.current!.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <>
      {remoteStream ? (
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="size-100 rounded-xl"
        />
      ) : (
        <div></div>
      )}
    </>
  );
}

export default LocalStreamContainer;
