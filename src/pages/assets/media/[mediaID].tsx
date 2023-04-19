import { Query, QueryGreetingsArgs } from "@/lib/graphql/types/types.generated";
import useSocket from "@/lib/hooks/websockets";
import { WebSocketsURI } from "@/lib/types/base.types";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { NextPage } from "next";
import Link from "next/link";
import { UniversalGetServerSideProps } from "@/lib/universal-provider/universal-server-props";
import { withUniversalProvider } from "@/lib/universal-provider/with-universal-provider";
import FullScreenLayout from "@/components/FullScreenLayout";

interface MediaAssetPageProps {
  message: string;
  // socketsUri: WebSocketsURI;
}

const MediaAssetPage: NextPage<MediaAssetPageProps> = ({ message }) => {
  return (
    <FullScreenLayout>
      <h1>Asset Page</h1>
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

export default withUniversalProvider(MediaAssetPage);
