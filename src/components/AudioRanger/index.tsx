// AudioRanger.tsx
import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";
import "tailwindcss/tailwind.css";
import { formatTime } from "@/lib/helpers/time";

interface AudioRangerProps {
  audioURL: string;
}

const parseTime = (time: string) => {
  const timeParts = time.split(":");

  if (timeParts.length !== 3) {
    return null;
  }

  const minutes = parseInt(timeParts[0], 10);
  const seconds = parseInt(timeParts[1], 10);
  const milliseconds = parseInt(timeParts[2], 10);

  if (isNaN(minutes) || isNaN(seconds) || isNaN(milliseconds)) {
    return null;
  }

  return minutes * 60 + seconds + milliseconds / 1000;
};

const AudioRanger: React.FC<AudioRangerProps> = ({ audioURL }) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(50);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#6EE7B7",
        progressColor: "#3B82F6",
        cursorColor: "#9333EA",
        barWidth: 3,
        plugins: [
          RegionsPlugin.create({
            dragSelection: {
              slop: 5,
            },
          }),
        ],
      });

      wavesurfer.current.load(audioURL);

      wavesurfer.current.on("ready", () => {
        setEndTime(wavesurfer.current?.getDuration() || 0);
        wavesurfer.current?.setVolume(volume / 100);
      });

      wavesurfer.current.on("region-created", (region) => {
        // Remove all other regions before adding the new one
        Object.keys(wavesurfer.current?.regions.list || {}).forEach((id) => {
          if (id !== region.id) {
            wavesurfer.current?.regions.list[id].remove();
          }
        });

        region.on("update-end", () => {
          setStartTime(region.start);
          setEndTime(region.end);
        });

        region.on("remove", () => {
          if (region === wavesurfer.current?.regions.list[region.id]) {
            setStartTime(0);
            setEndTime(wavesurfer.current?.getDuration() || 0);
          }
        });
      });

      wavesurfer.current.on("finish", () => {
        setIsPlaying(false);
      });
    }

    return () => {
      wavesurfer.current?.destroy();
    };
  }, [audioURL]);

  const handlePlayPause = () => {
    if (isPlaying) {
      wavesurfer.current?.pause();
    } else {
      wavesurfer.current?.play(startTime, endTime);
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    wavesurfer.current?.setVolume(newVolume / 100);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-full">
        <div ref={waveformRef} className="w-full h-24"></div>
      </div>
      <br />
      <br />
      <br />
      <div className="flex space-x-4">
        <label htmlFor="start-time">Start:</label>
        <span>{formatTime(startTime)}</span>
        <label htmlFor="end-time">End:</label>
        <span>{formatTime(endTime)}</span>
        <label htmlFor="duration">Duration:</label>
        <span>{formatTime(endTime - startTime)}</span>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handlePlayPause}
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <div className="flex items-center space-x-2">
          <label htmlFor="volume">Volume:</label>
          <input
            type="range"
            id="volume"
            name="volume"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
          />
          <input
            type="number"
            className="w-16"
            value={volume}
            min="0"
            max="100"
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioRanger;
