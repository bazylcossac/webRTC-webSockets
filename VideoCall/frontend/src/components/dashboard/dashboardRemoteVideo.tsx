import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./dashboard.module.css";

function DashboardRemoteVideo() {
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteStream = useSelector((state) => state.webrtc.remoteStream);

  useEffect(() => {
    remoteVideoRef.current!.srcObject = remoteStream;
    
    remoteVideoRef.current!.onloadedmetadata = () => {
      remoteVideoRef.current!.play();
    };
  }, [remoteStream]);

  return (
    <div className={styles.remotStreamVideoContainer}>
      {/* {remoteStream ? ( */}
      <video
        ref={remoteVideoRef}
        playsInline
        autoPlay
        className={styles.remoteStreamVideo}
      />
      {/* ) : ( */}
      {/* <div className={styles.remoteStreamVideo}></div> */}
      {/* )} */}
    </div>
  );
}

export default DashboardRemoteVideo;
