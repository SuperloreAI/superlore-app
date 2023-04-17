import React, { useState, useCallback } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";

const YouTubeAudioPlayer: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const videoId = extractVideoId(videoUrl);
    setVideoId(videoId);
  };

  const extractVideoId = (url: string) => {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/watch\?v=)([\w\-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const onPlayerReady = useCallback((event: YouTubeEvent) => {
    const player = event.target;
    setVideoTitle(player.getVideoData().title);
    setVideoDuration(formatDuration(player.getDuration()));
  }, []);

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      playsinline: 1,
    },
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="videoUrl">Enter YouTube video URL:</label>
        <input
          type="url"
          id="videoUrl"
          value={videoUrl}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Load Audio</button>
      </form>
      {videoId && (
        <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
      )}
      {videoTitle && <div>Title: {videoTitle}</div>}
      {videoDuration && <div>Duration: {videoDuration}</div>}
    </div>
  );
};

export default YouTubeAudioPlayer;
