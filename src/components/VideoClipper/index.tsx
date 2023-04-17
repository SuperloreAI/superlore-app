import React, { useEffect, useRef, useState } from "react";
import "tailwindcss/tailwind.css";
import noUiSlider from "nouislider";
import { formatTime } from "@/lib/helpers/time";

const videoUrl =
  "https://firebasestorage.googleapis.com/v0/b/superlore-dev.appspot.com/o/users%2F5t5JKBpETXdIoNM2wfLsfNsM5m33%2Fvideos%2Fab1a20ad-ca55-4b48-8487-969289cc3da8%2Fall-about-him.mp4?alt=media&token=27d5cfcb-5f5f-4047-b433-932be8d6e2a4";

const VideoClipper: React.FC = () => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(10);
  const [videoDuration, setVideoDuration] = useState(0);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => {
      setVideoDuration(video.duration);
      video.pause(); // Pause video when it's loaded
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    if (sliderContainerRef.current) {
      const slider = noUiSlider.create(sliderContainerRef.current, {
        start: [0, 10],
        connect: true,
        range: {
          min: 0,
          max: videoDuration,
        },
      });

      slider.on("update", (values, handle) => {
        const [start, end] = values.map((value) => parseFloat(value as string));
        setStartTime(start);
        setEndTime(end);
        if (videoRef.current) {
          videoRef.current.currentTime = start; // Update the current time of the video
        }
      });

      return () => {
        slider.destroy();
      };
    }
  }, [videoDuration]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = startTime;

    const onTimeUpdate = () => {
      if (video.currentTime >= endTime) {
        video.pause();
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [startTime, endTime]);

  const clipVideo = async () => {
    try {
      const response = await fetch("https://your-backend-server.com/clip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start: startTime,
          end: endTime,
          videoUrl,
        }),
      });

      if (response.ok) {
        console.log("Video clipped successfully");
      } else {
        console.error("Failed to clip video");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const duration = endTime - startTime;

  return (
    <div className="VideoClipper">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl mb-4">Video Clipper</h1>
        <video ref={videoRef} src={videoUrl} controls className="mb-4"></video>
        <div ref={sliderContainerRef} className={`mb-4`}></div>
        <button
          onClick={clipVideo}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Clip Video
        </button>
      </div>
      <div className="mb-4">
        <p>Start Time: {formatTime(startTime)}</p>
        <p>End Time: {formatTime(endTime)}</p>
        <p>Duration: {formatTime(duration)}</p>
      </div>
    </div>
  );
};

export default VideoClipper;