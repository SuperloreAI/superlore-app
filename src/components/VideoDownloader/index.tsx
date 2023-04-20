import React, { useCallback, useEffect, useState } from "react";
import { Input, Space } from "antd";
import { Divider } from "antd";
import { Button } from "antd";
import { fetchVideoInfo, trimStringWithEllipsis } from "@/lib/helpers/preview";
import { gql, useMutation } from "@apollo/client";
import { notification } from "antd";
import Link from "next/link";

interface VideoDownloaderComponentProps {
  someProp?: string;
}

const EXTRACT_VIDEO_MUTATION = gql`
  mutation ExtractVideo($url: String!, $type: VideoType!) {
    extractVideo(url: $url, type: $type)
  }
`;

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

const VideoDownloaderComponent: React.FC<VideoDownloaderComponentProps> = ({
  someProp = "default value",
}) => {
  const [api, contextHolder] = notification.useNotification();

  const [linkToYoutube, setLinkToYoutube] = useState("");
  const [linkToTikTok, setLinkToTikTok] = useState("");

  const [previewTitle, setPreviewTitle] = useState(
    "Google’s search engine “panic,” AI-generated hits, Coinbase considers leaving US market | E1723"
  );
  const [previewImage, setPreviewImage] = useState(
    "https://i.ytimg.com/vi/dgQZKk-6SXA/maxresdefault.jpg"
  );

  const [extractVideo] = useMutation(EXTRACT_VIDEO_MUTATION);

  const openNotification = useCallback(
    (path: string) => {
      const key = `open-${path}`;
      const btn = (
        <Space>
          <Link href={path}>
            <Button type="primary" size="small">
              View Asset
            </Button>
          </Link>
        </Space>
      );
      api.open({
        message: "Media Downloaded!",
        description: "The media has been added to your asset library",
        btn,
        key,
      });
    },
    [api]
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

  const handleDownload = async () => {
    const videoType = linkToYoutube ? "YOUTUBE" : "TIKTOK";
    const videoUrl = linkToYoutube || linkToTikTok;

    try {
      const { data } = await extractVideo({
        variables: { url: videoUrl, type: videoType },
      });
      console.log("Extracted Video:", data);
      const id = data.extractVideo[0];
      console.log("ID:", id);
      openNotification(`/assets/media/${id}`);
    } catch (error) {
      console.error("Error extracting video:", error);
    }
  };

  return (
    <section>
      {contextHolder}
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
          <Button type="primary" block onClick={handleDownload}>
            Download
          </Button>
        </div>
      </div>
      <Divider></Divider>
    </section>
  );
};

export default VideoDownloaderComponent;
