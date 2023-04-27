import React, { useCallback, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Form, Input, Space, notification } from "antd";
import gql from "graphql-tag";
import FullScreenLayout from "@/components/FullScreenLayout";
import { withUniversalProvider } from "@/lib/universal-provider/with-universal-provider";
import { GetServerSideProps } from "next";
import { UniversalGetServerSideProps } from "@/lib/universal-provider/universal-server-props";
import { generateScreenplay } from "../../lib/graphql/types/videos/resolvers/Mutation/generateScreenplay";
import {
  ScreenPlay,
  ScreenPlayScene,
  SuggestedRaw,
} from "@/lib/graphql/types/types.generated";
import ChatVideoBlock from "@/components/ChatVideoBlock";
import ReelBar from "@/components/ReelBar";

const GENERATE_SCREENPLAY_MUTATION = gql`
  mutation GenerateScreenplay($synopsis: String!) {
    generateScreenplay(synopsis: $synopsis) {
      title
      scenes {
        sid
        textOverlay
        visualDescription
        raws {
          id
          url
          thumbnail
        }
      }
    }
  }
`;

const COMPILE_VIDEO_FROM_RAWS_MUTATION = gql`
  mutation CompileVideoFromRaws($title: String!, $urlOfRaws: [String!]!) {
    compileVideoFromRaws(title: $title, urlOfRaws: $urlOfRaws)
  }
`;

const GenerateScreenplay: React.FC = () => {
  const [synopsis, setSynopsis] = useState("");
  const [title, setTitle] = useState("");
  const [raws, setRaws] = useState<ScreenPlayScene[]>([]);
  const [chosenRaws, setChosenRaws] = useState<SuggestedRaw[]>([]);
  const [zipFilePath, setZipFilePath] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const [generateScreenplay, { data, error }] = useMutation(
    GENERATE_SCREENPLAY_MUTATION
  );
  const [
    compileVideosFromRaws,
    { data: compileRawsData, error: compileRawsError },
  ] = useMutation(COMPILE_VIDEO_FROM_RAWS_MUTATION);

  const addRaw = (raw: SuggestedRaw) => {
    setChosenRaws([...chosenRaws, raw]);
  };
  const removeRaw = (raw: SuggestedRaw) => {
    setChosenRaws(chosenRaws.filter((r) => r.id !== raw.id));
  };

  const openNotification = useCallback(
    (downloadUrl: string) => {
      const key = `download-${downloadUrl}`;
      const btn = (
        <Space>
          <a href={downloadUrl} download target="_blank">
            <Button size="small">Download</Button>
          </a>
        </Space>
      );
      api.open({
        message: "Exported to ZIP",
        description: "Download the file now",
        btn,
        key,
        duration: null,
      });
    },
    [api]
  );

  const compileAndZip = async () => {
    console.log("Compiling and zipping...");
    try {
      const { data } = await compileVideosFromRaws({
        variables: {
          title,
          urlOfRaws: chosenRaws.map((raw) => raw.url),
        },
      });
      console.log(data);
      const { compileVideoFromRaws: outputUrl } = data;
      setZipFilePath(outputUrl);
      openNotification(outputUrl);
    } catch (e) {
      console.error("Error compiling and zipping:", e);
    }
  };

  const handleGenerateScreenplay = async () => {
    console.log("Generating screenplay...");
    try {
      const { data } = await generateScreenplay({
        variables: {
          synopsis,
        },
      });
      const screenplay = data.generateScreenplay;
      console.log(screenplay);
      setTitle(screenplay.title);
      setRaws(screenplay.scenes);
    } catch (err) {
      console.error("Error generating screenplay:", error);
    }
  };

  return (
    <FullScreenLayout>
      {contextHolder}
      <div>
        <textarea
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
          placeholder="Enter synopsis"
        />
        <button onClick={handleGenerateScreenplay}>Generate</button>
      </div>
      <div
        id="center-onto-page,and-scrollable-vertical"
        className="flex flex-col items-center mt-6 space-y-4 max-h-screen overflow-y-auto p-4"
      >
        {raws.map((raw) => (
          <ChatVideoBlock key={raw.sid} scene={raw} addRaw={addRaw} />
        ))}
      </div>
      <ReelBar
        raws={chosenRaws}
        removeRaw={removeRaw}
        compileAndZip={compileAndZip}
      />
    </FullScreenLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const universalServerProps = await UniversalGetServerSideProps();
  return {
    props: {
      ...universalServerProps.props,
    },
  };
};

export default withUniversalProvider(GenerateScreenplay);
