import {
  Query,
  QueryGetMediaArgs,
  QueryGreetingsArgs,
} from "@/lib/graphql/types/types.generated";
import useSocket from "@/lib/hooks/websockets";
import { WebSocketsURI } from "@/lib/types/base.types";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { NextPage, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { UniversalGetServerSideProps } from "@/lib/universal-provider/universal-server-props";
import { withUniversalProvider } from "@/lib/universal-provider/with-universal-provider";
import FullScreenLayout from "@/components/FullScreenLayout";
import VideoClipper from "@/components/VideoClipper";
import SideMenu from "@/components/SideMenu";

interface ClipperPageProps {
  mediaAsset: Query["getMedia"];
  // socketsUri: WebSocketsURI;
}

const ClipperPage: NextPage<ClipperPageProps> = ({
  mediaAsset,
  // socketsUri
}) => {
  // const { connected, error, emit, on } = useSocket(socketsUri);
  // useEffect(() => {
  //   if (connected) {
  //     emit("message", "Hello from the client!");
  //     sayHello();
  //   }
  // }, [connected, emit]);

  // useEffect(() => {
  //   on("message", (message) => {
  //     console.log("Received message:", message);
  //   });

  //   return () => {
  //     on("message", () => {});
  //   };
  // }, [on]);

  // if (error) {
  //   return <div>Error connecting to the server: {error.message}</div>;
  // }
  return (
    <FullScreenLayout>
      <VideoClipper mediaAsset={mediaAsset} />
      {/* <p>
        {connected
          ? "Connected to the websockets server"
          : "Connecting to the websockets server..."}
      </p> */}
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
    query: gql`
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
    `,
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

export default withUniversalProvider(ClipperPage);
