import { Query, QueryGreetingsArgs } from "@/lib/graphql/types/types.generated";
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
  message: string;
  // socketsUri: WebSocketsURI;
}

const AssetLibraryPage: NextPage<AssetLibraryPageProps> = ({
  message,
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
      <div style={{ overflowY: "scroll", padding: "20px" }}>
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
            <Button type="text">Upload</Button>
            <Link href="/assets/downloader" rel="noopener noreferrer">
              <Button type="primary">Extract YouTube/TikTok</Button>
            </Link>
          </div>
        </div>
        <br />
        <MediaGrid />
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
  // const WEBSOCKETS_ENDPOINT = process.env.WEBSOCKETS_ENDPOINT;
  const client = new ApolloClient({
    uri: GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query<
    Pick<Query, "greetings">,
    QueryGreetingsArgs
  >({
    query: gql`
      query Greetings($input: String!) {
        greetings(input: $input)
      }
    `,
    variables: {
      input: "Hello World",
    },
  });

  const { greetings } = data;

  return {
    props: {
      ...universalServerProps.props,
      message: greetings,
      // socketsUri: WEBSOCKETS_ENDPOINT,
    },
  };
};

export default withUniversalProvider(AssetLibraryPage);
