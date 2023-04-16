// import { Query, QueryGreetingsArgs } from "@/lib/graphql/types/types.generated";
// import useSocket from "@/lib/hooks/websockets";
// import { WebSocketsURI } from "@/lib/types/base.types";
// import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
// import { NextPage } from "next";
// import Link from "next/link";
// import { useEffect } from "react";
// import { sayHello } from "@superlore/helpers";

// interface DemoPageProps {
//   message: string;
//   socketsUri: WebSocketsURI;
// }

// const DemoPage: NextPage<DemoPageProps> = ({ message, socketsUri }) => {
//   const { connected, error, emit, on } = useSocket(socketsUri);
//   useEffect(() => {
//     if (connected) {
//       emit("message", "Hello from the client!");
//       sayHello();
//     }
//   }, [connected, emit]);

//   useEffect(() => {
//     on("message", (message) => {
//       console.log("Received message:", message);
//     });

//     return () => {
//       on("message", () => {});
//     };
//   }, [on]);

//   if (error) {
//     return <div>Error connecting to the server: {error.message}</div>;
//   }
//   return (
//     <>
//       <h1>Demo Page</h1>
//       <p>{message}</p>
//       <h2>
//         <Link href="/">Back to home</Link>
//       </h2>
//       <p>
//         {connected
//           ? "Connected to the websockets server"
//           : "Connecting to the websockets server..."}
//       </p>
//     </>
//   );
// };

// export const getServerSideProps = async () => {
//   const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
//   const WEBSOCKETS_ENDPOINT = process.env.WEBSOCKETS_ENDPOINT;
//   const client = new ApolloClient({
//     uri: GRAPHQL_ENDPOINT,
//     cache: new InMemoryCache(),
//   });

//   const { data } = await client.query<
//     Pick<Query, "greetings">,
//     QueryGreetingsArgs
//   >({
//     query: gql`
//       query Greetings($input: String!) {
//         greetings(input: $input)
//       }
//     `,
//     variables: {
//       input: "Hello World",
//     },
//   });

//   const { greetings } = data;

//   return {
//     props: {
//       message: greetings,
//       socketsUri: WEBSOCKETS_ENDPOINT,
//     },
//   };
// };

// export default DemoPage;
