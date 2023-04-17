// AudioRanger.tsx
import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";
import "tailwindcss/tailwind.css";

interface AudioRangerProps {
  audioURL: string;
}

const AudioRanger: React.FC<AudioRangerProps> = ({ audioURL }) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

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
      });

      wavesurfer.current.on("region-created", (region) => {
        region.on("update-end", () => {
          setStartTime(region.start);
          setEndTime(region.end);
        });
      });
    }

    return () => {
      wavesurfer.current?.destroy();
    };
  }, [audioURL]);

  const handlePlay = () => {
    wavesurfer.current?.play(startTime, endTime);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-full">
        <div ref={waveformRef} className="w-full h-24"></div>
      </div>
      <div className="flex space-x-4">
        <span>Start: {startTime.toFixed(2)}s</span>
        <span>End: {endTime.toFixed(2)}s</span>
      </div>
      <button
        onClick={handlePlay}
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Play Selected Range
      </button>
    </div>
  );
};

export default AudioRanger;
