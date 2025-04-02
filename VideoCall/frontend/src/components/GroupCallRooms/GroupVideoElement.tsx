import { useEffect, useRef } from "react";

const style = {
  width: "300px",
  height: "300px",
};

function GroupVideoElement({ stream }: { stream: MediaStream }) {
  console.log("VIDEO ELEMENT");
  console.log(stream);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current!.srcObject = stream;

    videoRef.current!.onloadedmetadata = () => {
      videoRef.current!.play();
    };
  }, [stream]);

  return (
    <div>
      <video ref={videoRef} playsInline autoPlay style={style} />
      <p>{stream.id}</p>
    </div>
  );
}

export default GroupVideoElement;
