import React from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import VideoGrid from "@/components/VideoGrid";
import {
  QueryListVideosArgs,
  Query,
} from "@/lib/graphql/types/types.generated";
import { UniversalGetServerSideProps } from "@/lib/universal-provider/universal-server-props";
import FullScreenLayout from "@/components/FullScreenLayout";
import Link from "next/link";
import { Button } from "antd";
import { withUniversalProvider } from "@/lib/universal-provider/with-universal-provider";

interface VideoLibraryProps {
  initialVideos: any[];
  graphqlEndpoint: string;
}

const VideoLibrary: React.FC<VideoLibraryProps> = ({
  initialVideos,
  graphqlEndpoint,
}) => (
  <FullScreenLayout>
    <div style={{ padding: "20px", width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <h1>Video Library</h1>

        <Link href="/videos/create" rel="noopener noreferrer">
          <Button type="primary">New Video</Button>
        </Link>
      </div>
      <VideoGrid
        initialVideos={initialVideos}
        graphqlEndpoint={graphqlEndpoint}
      />
    </div>
  </FullScreenLayout>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const universalServerProps = await UniversalGetServerSideProps();
  const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;

  const client = new ApolloClient({
    uri: GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query<
    Pick<Query, "listVideos">,
    QueryListVideosArgs
  >({
    query: gql`
      query ListVideos(
        $searchString: String
        $limit: Int
        $cursorStart: String
      ) {
        listVideos(
          searchString: $searchString
          limit: $limit
          cursorStart: $cursorStart
        ) {
          id
          title
          thumbnail
          url
        }
      }
    `,
    variables: {
      searchString: "",
      limit: 30,
      cursorStart: "",
    },
  });

  const { listVideos } = data;

  return {
    props: {
      ...universalServerProps.props,
      initialVideos: listVideos || [],
    },
  };
};

export default withUniversalProvider(VideoLibrary);
