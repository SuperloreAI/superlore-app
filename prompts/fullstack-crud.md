Please generate code for the following items:

- update the graphql resolver
- update the schema.graphql
- update the library.tsx page with the new query


// schema.sql (for reference)
CREATE TABLE media_assets (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    asset_type VARCHAR(50) NOT NULL,
    url VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    notes TEXT,
    prompt TEXT,
    thumbnail TEXT,
    metadata JSONB,
    archived BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


// schema.graphql
type Query {
  listMedia(searchString: String, limit: Int, cursorStart: String): [Media]
}
type Media {
  id: ID!
  title: String!
  notes: String
  thumbnail: String!
  status: MediaStatus!
  assetType: AssetType!
  url: String!
}


// resolver.ts (use this as a reference)
export async function getMediaAsset(mediaAssetID: string) {
  await initializePool();
  const { pool } = getPool();
  const query = "SELECT * FROM media_assets WHERE id = $1";
  const values = [mediaAssetID];
  console.log(`getMediaAsset: ${mediaAssetID}`);
  console.log(query);
  try {
    const res = await pool.query(query, values);
    const mediaAsset = res.rows[0];
    console.log(`--- mediaAsset ---`);
    console.log(mediaAsset);
    if (!mediaAsset) {
      return null;
    }

    return {
      id: mediaAsset.id,
      title: mediaAsset.title,
      assetType: mediaAsset.asset_type,
      url: mediaAsset.url,
      prompt: mediaAsset.prompt,
      thumbnail: mediaAsset.thumbnail,
      metadata: mediaAsset.metadata,
      archived: mediaAsset.archived,
      createdAt: mediaAsset.created_at,
      updatedAt: mediaAsset.updated_at,
      status: mediaAsset.status,
    };
  } catch (err) {
    console.error("Error fetching media asset:", err);
    throw err;
  }
}

// graphql-resolvers.ts

const resolvers = {
  Query: {
    getMedia: (
      _parent: any,
      args: QueryGetMediaArgs,
      _context: CustomContext,
      _info: any
    ) => { /** reference only */ },
  },
}


// library.tsx
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
