import { Query, QueryGreetingsArgs } from "@/lib/graphql/types/types.generated";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { NextPage } from "next";
import ChatVideoBlock from "@/components/ChatVideoBlock";
import Link from "next/link";
import FullScreenLayout from "@/components/FullScreenLayout";
import { Input } from "antd";

interface CanvasPageProps {
  message: string;
}
const CanvasPage: NextPage<CanvasPageProps> = ({ message }) => {
  return (
    <FullScreenLayout>
      <div
        id="static-control-bar"
        className="flex justify-between items-center bg-gray-800 text-white p-4"
        style={{ width: "100%" }}
      >
        <div className="font-bold">
          <Input value="Video Title" />
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
    </FullScreenLayout>
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
