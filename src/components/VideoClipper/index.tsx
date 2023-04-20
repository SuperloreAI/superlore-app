import React, { useCallback, useEffect, useRef, useState } from "react";
import "tailwindcss/tailwind.css";
import noUiSlider from "nouislider";
import { formatTime } from "@/lib/helpers/time";
import { Button, Divider, Input, Space, notification } from "antd";
import { Query } from "@/lib/graphql/types/types.generated";
import { gql, useMutation } from "@apollo/client";
import Link from "next/link";
import { clipVideo } from "../../lib/graphql/types/assets/resolvers/Mutation/clipVideo";

export const CLIP_VIDEO = gql`
  mutation ClipVideo(
    $id: ID!
    $startTime: Float!
    $endTime: Float!
    $url: String!
  ) {
    clipVideo(id: $id, startTime: $startTime, endTime: $endTime, url: $url) {
      id
      url
    }
  }
`;

interface VideoClipperProps {
  mediaAsset: Query["getMedia"];
}

const VideoClipper: React.FC<VideoClipperProps> = ({ mediaAsset }) => {
  const [clipTitle, setClipTitle] = useState(`Clip of ${mediaAsset?.title}`);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(10);
  const [videoDuration, setVideoDuration] = useState(0);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => {
      setVideoDuration(video.duration);
      const halfDuration = video.duration / 2;
      setEndTime(halfDuration);
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
        start: [startTime, endTime],
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

  const [clipVideoMutation] = useMutation(CLIP_VIDEO);

  const openNotification = useCallback(
    (path: string, downloadUrl: string) => {
      const key = `open-${path}`;
      const btn = (
        <Space>
          <a href={downloadUrl} download target="_blank">
            <Button size="small">Download</Button>
          </a>
          <Link href={path} target="_blank">
            <Button type="primary" size="small">
              View Asset
            </Button>
          </Link>
        </Space>
      );
      api.open({
        message: "Media Clipped!",
        description: "The media has been added to your asset library",
        btn,
        key,
      });
    },
    [api]
  );

  const clipVideo = async () => {
    if (!mediaAsset || !mediaAsset.url) {
      throw new Error("No media asset found");
      return;
    }
    try {
      console.log(`mediaAsset.url=${mediaAsset.url}`);
      const response = await clipVideoMutation({
        variables: {
          id: mediaAsset.id,
          startTime,
          endTime,
          url: mediaAsset.url,
        },
      });
      console.log(response);
      if (response.data && response.data.clipVideo) {
        const clippedVideoResult = response.data.clipVideo;
        console.log("Video clipped successfully");
        const id = clippedVideoResult.id;
        openNotification(`/assets/media/${id}`, clippedVideoResult.url);
      } else {
        console.error("Failed to clip video");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const duration = endTime - startTime;

  if (!mediaAsset || !mediaAsset.url)
    return <p>Loading... no media asset found yet</p>;

  return (
    <section>
      {contextHolder}
      <Divider></Divider>
      <h3 style={{ width: "100%", textAlign: "center" }}>
        Clip Video from URL
      </h3>
      <Divider></Divider>
      <div style={{ maxWidth: "700px", display: "flex", flexDirection: "row" }}>
        <video
          ref={videoRef}
          src={mediaAsset.url}
          controls
          className="mb-4"
          style={{ width: "300px", height: "auto" }}
        ></video>
        <div style={{ width: "50px" }}></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "flex-start",
            width: "300px",
          }}
        >
          <div className="mb-4">
            <p>Start Time: {formatTime(startTime)}</p>
            <p>End Time: {formatTime(endTime)}</p>
            <p>Duration: {formatTime(duration)}</p>
          </div>
          <Input
            value={clipTitle}
            onChange={(e) => {
              setClipTitle(e.target.value);
            }}
            placeholder="Title of Clip"
          />
          <button
            onClick={clipVideo}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Clip Video
          </button>
        </div>
      </div>
      <div ref={sliderContainerRef} className={`mb-4`}></div>
    </section>
  );
};

export default VideoClipper;
