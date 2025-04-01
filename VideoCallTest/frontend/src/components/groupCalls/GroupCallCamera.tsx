import { useEffect, useRef } from "react";

function GroupCallCamera({ stream }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  console.log(stream);

  useEffect(() => {
    videoRef.current!.srcObject = stream;

    videoRef.current!.onloadedmetadata = () => {
      videoRef.current!.play();
    };
  }, [stream]);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
}

export default GroupCallCamera;
