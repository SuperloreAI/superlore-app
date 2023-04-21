import {
  Media,
  Query,
  QueryGreetingsArgs,
  QueryListMediaArgs,
} from "@/lib/graphql/types/types.generated";
import useSocket from "@/lib/hooks/websockets";
import { WebSocketsURI } from "@/lib/types/base.types";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { NextPage } from "next";
import Link from "next/link";
import { UniversalGetServerSideProps } from "@/lib/universal-provider/universal-server-props";
import { withUniversalProvider } from "@/lib/universal-provider/with-universal-provider";
import FullScreenLayout from "@/components/FullScreenLayout";
import MediaGrid from "@/components/MediaGrid";
import { Space, Button } from "antd";

interface AssetLibraryPageProps {
  initialMedia: Query["listMedia"];
  graphqlEndpoint: string;
}

const AssetLibraryPage: NextPage<AssetLibraryPageProps> = ({
  initialMedia,
  graphqlEndpoint,
}) => {
  console.log(`initialMedia`, initialMedia);
  if (!initialMedia || initialMedia.length === 0) {
    return <p>No media found</p>;
  }
  return (
    <FullScreenLayout>
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <h1>Asset Library</h1>
          <div>
            <Button type="text" disabled>
              Upload
            </Button>
            <Link href="/assets/downloader" rel="noopener noreferrer">
              <Button type="primary">Extract YouTube/TikTok</Button>
            </Link>
          </div>
        </div>
        <br />
        <MediaGrid
          initialMedia={initialMedia.filter((x) => x) as Media[]}
          graphqlEndpoint={graphqlEndpoint}
        />
      </div>
      {/* <p>
        {connected
          ? "Connected to the websockets server"
          : "Connecting to the websockets server..."}
      </p> */}
    </FullScreenLayout>
  );
};

export const getServerSideProps = async () => {
  const universalServerProps = await UniversalGetServerSideProps();
  const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;

  const client = new ApolloClient({
    uri: GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query<
    Pick<Query, "listMedia">,
    QueryListMediaArgs
  >({
    query: gql`
      query ListMedia(
        $searchString: String
        $limit: Int
        $cursorStart: String
      ) {
        listMedia(
          searchString: $searchString
          limit: $limit
          cursorStart: $cursorStart
        ) {
          id
          title
          thumbnail
          status
          assetType
          url
          metadata {
            ... on VideoMetadata {
              width
              height
              duration
              aspectRatio
              frameRate
              videoCodec
              audioCodec
              originalSource
            }
            ... on AudioMetadata {
              duration
              audioCodec
              originalSource
            }
          }
        }
      }
    `,
    variables: {
      searchString: "",
      limit: 30,
      cursorStart: "",
    },
  });
  const { listMedia } = data;

  return {
    props: {
      ...universalServerProps.props,
      initialMedia: listMedia || [],
    },
  };
};

export default withUniversalProvider(AssetLibraryPage);
