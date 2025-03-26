import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function LocalStreamContainer() {
  const localStream = useSelector((state) => state.webrtc.localStream);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (localStream) {
      localVideoRef.current!.srcObject = localStream;
    }
  }, [localStream]);

  return (
    <>
      <video
        ref={localVideoRef}
        muted
        autoPlay
        playsInline
        className="size-100 rounded-xl"
      />
    </>
  );
}

export default LocalStreamContainer;
