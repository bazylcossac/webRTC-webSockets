//https://webrtc.github.io/samples/src/content/devices/input-output/
// https://webrtc.github.io/samples/

/* TODO
 *
 *  HANDLE NO CAMERA MIC ONLY CASEd
 *  CREATE REDUX STORE
 *  MOVE STUFF TO ITS OWN COMPONENTd
 */

"use strict";
import { useEffect, useRef, useState } from "react";

const constraints = {
  video: true,
  audio: false,
};

function App() {
  const [allDevices, setAllDevices] = useState<MediaDeviceInfo[]>([]);

  const [isSharingScreen, setIsSharingScreen] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoSharingScreenContainer = useRef<HTMLVideoElement | null>(null);
  const videoSharingScreenStream = useRef<MediaStream | null>(null);

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
    if (isSharingScreen) {
      stopSharingScreen();
      return;
    }
    // get display media stream
    const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
    videoSharingScreenStream.current = stream;

    // set stream to it's video container
    if (videoSharingScreenStream.current)
      videoSharingScreenContainer.current!.srcObject =
        videoSharingScreenStream.current;
    setIsSharingScreen(true);
  };

  const stopSharingScreen = () => {
    videoSharingScreenStream
      .current!.getVideoTracks()
      .forEach((track) => track.stop());

    videoSharingScreenStream.current = null;
    setIsSharingScreen(false);
  };
  // get all conected media devices (mics, speakers etc.)
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
          className="border-1 border-white p-1 rounded-lg hover:bg-white hover:text-black hover:cursor-pointer disabled:bg-gray-500 transition"
          onClick={() => {
            handleSharingScreen();
          }}
        >
          {isSharingScreen ? "stop" : "start"} sharing screen
        </button>
      </div>

      <video
        ref={videoRef}
        className="rotate-y-180 rounded-xl w-[500px] m-10"
        autoPlay
        playsInline
      />

      {videoSharingScreenStream.current ? (
        <video
          className="w-[1000px] aspect-video "
          ref={videoSharingScreenContainer}
          autoPlay
          playsInline
        />
      ) : (
        <video ref={videoSharingScreenContainer}></video>
      )}
    </>
  );
}

export default App;
