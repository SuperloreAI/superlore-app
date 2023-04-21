import {
  Query,
  QueryGetMediaArgs,
  QueryGreetingsArgs,
} from "@/lib/graphql/types/types.generated";
import useSocket from "@/lib/hooks/websockets";
import { WebSocketsURI } from "@/lib/types/base.types";
import { ApolloClient, gql, InMemoryCache, useMutation } from "@apollo/client";
import { NextPage, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { UniversalGetServerSideProps } from "@/lib/universal-provider/universal-server-props";
import { withUniversalProvider } from "@/lib/universal-provider/with-universal-provider";
import FullScreenLayout from "@/components/FullScreenLayout";
import { MediaAssetStatus, MediaAssetType } from "@/lib/db/types";
import { useState } from "react";
import { Divider, Input, Button, Space, message } from "antd";
import { renderAssetStatusTag, renderAssetTypeTag } from "@/lib/helpers/tags";

interface MediaAssetPageProps {
  message: string;
  mediaAsset: Query["getMedia"];
  // socketsUri: WebSocketsURI;
}

const GET_MEDIA = gql`
  query GetMedia($id: ID!) {
    getMedia(id: $id) {
      id
      title
      notes
      thumbnail
      status
      assetType
      url
    }
  }
`;

const UPDATE_MEDIA = gql`
  mutation UpdateMedia($id: ID!, $title: String, $notes: String) {
    updateMedia(id: $id, title: $title, notes: $notes)
  }
`;

const MediaAssetPage: NextPage<MediaAssetPageProps> = ({ mediaAsset }) => {
  const [title, setTitle] = useState(mediaAsset?.title || "");
  const [notes, setNotes] = useState(mediaAsset?.notes || "");

  const [updateMedia] = useMutation(UPDATE_MEDIA, {
    refetchQueries: [
      {
        query: GET_MEDIA,
        variables: { id: mediaAsset?.id || "" },
      },
    ],
    onCompleted: () => {
      success();
    },
  });

  const [messageApi, contextHolder] = message.useMessage();

  if (!mediaAsset) return <p>Missing Media Asset</p>;

  const handleUpdateClick = () => {
    updateMedia({
      variables: {
        id: mediaAsset.id,
        title,
        notes,
      },
    });
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Updated Media Asset",
    });
  };

  const renderMedia = () => {
    if (!mediaAsset) return null;

    const url = mediaAsset.url; // Replace with the actual media URL

    switch (mediaAsset.assetType) {
      case MediaAssetType.VIDEO:
        return <video src={url} controls style={{ maxWidth: "400px" }} />;
      case MediaAssetType.IMAGE:
        return (
          <img src={url} alt={mediaAsset.title} style={{ maxWidth: "400px" }} />
        );
      case MediaAssetType.AUDIO:
        return <audio src={url} controls style={{ maxWidth: "400px" }} />;
      default:
        return null;
    }
  };

  return (
    <FullScreenLayout>
      {contextHolder}
      <h1>Asset Page</h1>
      <Divider />
      <div
        style={{
          maxWidth: "700px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className="media-container">
          <div>
            {mediaAsset?.assetType &&
              renderAssetTypeTag(mediaAsset.assetType as MediaAssetType)}
            {mediaAsset?.status &&
              renderAssetStatusTag(mediaAsset.status as MediaAssetStatus)}
          </div>
          <div>{renderMedia()}</div>
          <div>
            {mediaAsset && (
              <Link href={`/assets/clipper/${mediaAsset.id}`}>
                {" "}
                <Button type="primary">Clip</Button>
              </Link>
            )}
            {mediaAsset && (
              <a href={mediaAsset.url} download target="_blank">
                <Button>Download</Button>
              </a>
            )}
          </div>
        </div>
        <div style={{ width: "50px" }}></div>
        <div className="info-container">
          <Space direction="vertical" size="middle">
            <div>
              <label>Title</label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label>Notes</label>
              <Input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <Button onClick={handleUpdateClick}>Update</Button>
          </Space>
        </div>
      </div>
    </FullScreenLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const universalServerProps = await UniversalGetServerSideProps();
  const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
  // const WEBSOCKETS_ENDPOINT = process.env.WEBSOCKETS_ENDPOINT;
  const client = new ApolloClient({
    uri: GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  });

  const mediaAssetID = context.params?.mediaID;

  // Ensure mediaAssetID is a string, otherwise return a 404 error
  if (typeof mediaAssetID !== "string") {
    return {
      notFound: true,
    };
  }
  const { data } = await client.query<
    Pick<Query, "getMedia">,
    QueryGetMediaArgs
  >({
    query: GET_MEDIA,
    variables: {
      id: mediaAssetID,
    },
  });

  const { getMedia } = data;

  return {
    props: {
      ...universalServerProps.props,
      mediaAsset: getMedia,
      // socketsUri: WEBSOCKETS_ENDPOINT,
    },
  };
};

export default withUniversalProvider(MediaAssetPage);
