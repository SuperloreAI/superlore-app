import { Query, QueryGreetingsArgs } from "@/lib/graphql/types/types.generated";
import useSocket from "@/lib/hooks/websockets";
import { WebSocketsURI } from "@/lib/types/base.types";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { sayHello } from "@superlore/helpers";
import useFirebase from "@/lib/firebase/useFirebase";
import { FirebaseConfig, getFirebaseConfig } from "@/lib/secrets/secrets";
import useApollo from "@/lib/graphql/useApollo";

interface CreateMascotProps {
  firebaseConfig: FirebaseConfig;
}

const CreateMascot: NextPage<CreateMascotProps> = ({ firebaseConfig }) => {
  const apolloClient = useApollo({ firebaseConfig });
  const { user, loading } = useFirebase(firebaseConfig);

  const [name, setName] = useState("");

  console.log(`apolloClient`);
  console.log(apolloClient);

  console.log(`user`);
  console.log(user?.email);

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
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold mb-4">Create Mascot</h1>
          <h2 className="text-xl mb-6">
            <Link className="text-blue-500 hover:text-blue-600" href="/">
              Back to home
            </Link>
          </h2>
          <label htmlFor="mascot-name" className="text-lg font-semibold">
            Mascot Name
          </label>
          <input
            id="mascot-name"
            className="block w-full p-2 border border-gray-300 rounded mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
            onClick={() => console.log("Create Mascot")}
          >
            Create Mascot
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const firebaseConfig = await getFirebaseConfig();
  return {
    props: {
      firebaseConfig,
    },
  };
};

export default CreateMascot;
