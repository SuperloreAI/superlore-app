// Import React and CSS (optional)
import React, { useEffect, useState } from "react";
import { Input, Space } from "antd";
import { Divider } from "antd";
import { Button } from "antd";
import { fetchVideoInfo, trimStringWithEllipsis } from "@/lib/helpers/preview";

// Define TypeScript interface for the component's props
interface VideoDownloaderComponentProps {
  someProp?: string;
}

const useDebouncedEffect = (
  effect: () => void,
  dependencies: any[],
  delay: number
) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      effect();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [...dependencies, delay]);
};

// Create the functional component
const VideoDownloaderComponent: React.FC<VideoDownloaderComponentProps> = ({
  someProp = "default value",
}) => {
  const [linkToYoutube, setLinkToYoutube] = useState("");
  const [linkToTikTok, setLinkToTikTok] = useState("");

  const [previewTitle, setPreviewTitle] = useState(
    "Google’s search engine “panic,” AI-generated hits, Coinbase considers leaving US market | E1723"
  );
  const [previewImage, setPreviewImage] = useState(
    "https://i.ytimg.com/vi/dgQZKk-6SXA/maxresdefault.jpg"
  );

  useDebouncedEffect(
    () => {
      const fetchInfo = async () => {
        const info = await fetchVideoInfo(linkToYoutube || linkToTikTok);
        if (info) {
          setPreviewTitle(info.title);
          setPreviewImage(info.previewImage);
        }
      };

      fetchInfo();
    },
    [linkToYoutube, linkToTikTok],
    500
  );

  return (
    <section>
      <Divider></Divider>
      <h3 style={{ width: "100%", textAlign: "center" }}>
        Download Video from URL
      </h3>
      <Divider></Divider>
      <div style={{ maxWidth: "700px", display: "flex", flexDirection: "row" }}>
        <div
          className="mb-4"
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "flex-start",
          }}
        >
          <span style={{ fontWeight: "normal", color: "gray" }}>
            {trimStringWithEllipsis(previewTitle, 40)}
          </span>
          <img
            className="w-full h-auto object-cover object-center mt-2 rounded-md"
            src={previewImage}
            alt={previewTitle}
          />
        </div>
        <div style={{ width: "50px" }}></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "flex-start",
          }}
        >
          <Input
            value={linkToYoutube}
            onChange={(e) => {
              setLinkToYoutube(e.target.value);
              setLinkToTikTok("");
            }}
            addonBefore="YouTube"
            placeholder="Link to YouTube Video"
          />
          <Divider orientation="center">
            <span style={{ fontWeight: "lighter", color: "gray" }}>or</span>
          </Divider>
          <Input
            value={linkToTikTok}
            onChange={(e) => {
              setLinkToYoutube("");
              setLinkToTikTok(e.target.value);
            }}
            addonBefore="TikTok"
            placeholder="Link to TikTok Video"
          />
          <Divider></Divider>
          <Button type="primary" block>
            Download
          </Button>
        </div>
      </div>
      <Divider></Divider>
    </section>
  );
};

// Export the component
export default VideoDownloaderComponent;
