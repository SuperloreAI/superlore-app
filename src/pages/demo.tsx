import { Query, QueryGreetingsArgs } from "@/lib/graphql/types/types.generated";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { NextPage } from "next";
import Link from "next/link";

interface DemoPageProps {
  message: string;
}

const DemoPage: NextPage<DemoPageProps> = ({ message }) => {
  return (
    <>
      <h1>Demo Page</h1>
      <p>{message}</p>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
};

export const getStaticProps = async () => {
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

export default DemoPage;
