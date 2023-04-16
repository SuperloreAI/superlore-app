import { Query, QueryGreetingsArgs } from "@/lib/graphql/types/types.generated";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { NextPage } from "next";
import ChatVideoBlock from "@/components/ChatVideoBlock";
import Link from "next/link";

interface CanvasPageProps {
  message: string;
}
const CanvasPage: NextPage<CanvasPageProps> = ({ message }) => {
  return (
    <div id="canvas-page" className="min-h-screen bg-gray-100">
      <div
        id="static-control-bar"
        className="flex justify-between items-center bg-gray-800 text-white p-4"
      >
        <div className="font-bold">
          <Link href="/">
            <b>Superlore</b>
          </Link>
        </div>
        <div className="row-of-options flex space-x-4">
          <p className="cursor-pointer">Save</p>
          <p className="cursor-pointer">Settings</p>
          <p className="cursor-pointer">Export</p>
        </div>
      </div>

      <div
        id="center-onto-page,and-scrollable-vertical"
        className="flex flex-col items-center mt-6 space-y-4 max-h-screen overflow-y-auto p-4"
      >
        <ChatVideoBlock />
        <ChatVideoBlock />
        <ChatVideoBlock />
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
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
      message: greetings,
    },
  };
};

export default CanvasPage;
