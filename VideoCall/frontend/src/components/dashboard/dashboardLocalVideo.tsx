import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./dashboard.module.css";

function DashboardLocalVideo() {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const localStream = useSelector((state) => state.webrtc.localStream);

  useEffect(() => {
    localVideoRef.current!.srcObject = localStream;

    localVideoRef.current!.onloadedmetadata = () => {
      localVideoRef.current!.play();
    };
  }, [localStream]);

  return (
    <div className={styles.localStreamVideoContainer}>
      <video
        ref={localVideoRef}
        playsInline
        autoPlay
        muted
        className={styles.localStreamVideo}
      />
    </div>
  );
}

export default DashboardLocalVideo;
