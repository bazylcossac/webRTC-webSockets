import React, { useState, useEffect, useRef } from "react";

const constraints = {
  video: true,
  audio: false,
};

function App() {
  // const [videoSrc, setVideoSrc] = useState<MediaStream | undefined>();
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const getMediaStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      // const videoTracks = stream.getVideoTracks();
      // const videoElement = document.getElementById("videoEl")!;
      // videoElement.srcObject = stream;
      if (videoRef.current === null) {
        alert("no");
      }
      videoRef.current.srcObject = stream;
      // setVideoSrc(stream);
    };
    getMediaStream();
  }, []);

  return (
    <>
      <p>hello world1</p>

      <video
        id="videoEl"
        ref={videoRef}
        className="rotate-y-180 rounded-xl"
        // src={videoSrc}
        autoPlay
        playsInline
      />
    </>
  );
}

export default App;
