//https://webrtc.github.io/samples/src/content/devices/input-output/
"use strict";
import React, { useEffect, useRef, useState } from "react";

const constraints = {
  video: true,
  audio: true,
};

function App() {
  const [allDevices, setAllDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioOutput, setAudioOutput] = useState([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleOutputDeviceChange = async (outputDeviceId: string) => {
    await videoRef.current?.setSinkId(outputDeviceId);
    // console.log(value);
  };

  useEffect(() => {
    const getAllConectedDevices = async () => {
      const deivces = await navigator.mediaDevices.enumerateDevices();
      console.log(deivces);

      setAllDevices(deivces);
    };

    getAllConectedDevices();
  }, []);

  useEffect(() => {
    const getMediaStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      // const videoTracks = stream.getVideoTracks();
      // const videoElement = document.getElementById("videoEl")!;
      if (videoRef.current === null) {
        alert("no cam");
      }
      videoRef.current!.srcObject = stream;
    };
    getMediaStream();
  }, []);

  return (
    <>
      <p>hello world1</p>
      <div className="flex flex-row gap-2">
        <select
          className="borded-1 border-white focus:outline-none active:outline-none"
          onChange={(e) => handleOutputDeviceChange(e.target.value)}
        >
          {allDevices
            .filter((device) => device.kind === "audiooutput")
            .map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label}
              </option>
            ))}
        </select>

        <select>
          {allDevices
            .filter((device) => device.kind === "audioinput")
            .map((device) => (
              <option key={device.deviceId}>{device.label}</option>
            ))}
        </select>
      </div>

      <video
        id="videoEl"
        ref={videoRef}
        className="rotate-y-180 rounded-xl "
        autoPlay
        playsInline
      />
    </>
  );
}

export default App;
