import { useEffect, useRef } from "react";

const cameraStyle = {
  width: "300px",
  height: "300px",
};

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
      <video ref={videoRef} autoPlay playsInline style={cameraStyle} />
    </div>
  );
}

export default GroupCallCamera;
