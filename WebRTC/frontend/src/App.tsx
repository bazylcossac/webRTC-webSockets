//https://webrtc.github.io/samples/src/content/devices/input-output/
"use strict";
import React, { useEffect, useRef, useState } from "react";

const constraints = {
  video: true,
  audio: true,
};

function App() {
  const [allDevices, setAllDevices] = useState<MediaDeviceInfo[]>([]);
  const [isSharingScreen, setIsSharingScreen] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoSharingContainer = useRef(null);

  // Change outut device source
  const handleOutputDeviceChange = async (outputDeviceId: string) => {
    await videoRef.current?.setSinkId(outputDeviceId);
  };

  // Change input device source
  const handleInputDeviceChange = async (inputDeviceId: string) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId: { exact: inputDeviceId } },
      video: true,
    });
    videoRef.current!.srcObject = stream;
  };

  const handleSharingScreen = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
    if (isSharingScreen) {
      stream.getVideoTracks()[0].enabled = false;
      return;
    }
    videoSharingContainer.current!.srcObject = stream;
  };

  useEffect(() => {
    const getAllConectedDevices = async () => {
      const deivces = await navigator.mediaDevices.enumerateDevices();
      console.log(deivces);
      setAllDevices(deivces);
    };

    getAllConectedDevices();
  }, []);

  // starts audio & video
  useEffect(() => {
    const getMediaStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current === null) {
        alert("no cam");
      }
      videoRef.current!.srcObject = stream;
    };
    getMediaStream();
  }, []);

  return (
    <>
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

        <select onChange={(e) => handleInputDeviceChange(e.target.value)}>
          {allDevices
            .filter((device) => device.kind === "audioinput")
            .map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label}
              </option>
            ))}
        </select>
        <button
          className="border-1 border-white p-1 rounded-lg hover:bg-white hover:text-black hover:cursor-pointer transition"
          onClick={() => {
            handleSharingScreen();
            setIsSharingScreen(true);
          }}
        >
          {isSharingScreen ? "stop" : "start"} sharing screen
        </button>
      </div>

      <video
        ref={videoRef}
        className="rotate-y-180 rounded-xl "
        autoPlay
        playsInline
      />
      <video
        className="w-full h-[1080px]"
        ref={videoSharingContainer}
        autoPlay
        playsInline
      />
    </>
  );
}

export default App;
