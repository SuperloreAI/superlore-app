import { Query, QueryGreetingsArgs } from "@/lib/graphql/types/types.generated";
import useSocket from "@/lib/hooks/websockets";
import { WebSocketsURI } from "@/lib/types/base.types";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { sayHello } from "@superlore/helpers";
import { FirebaseConfig, getFirebaseConfig } from "@/lib/secrets/secrets";
import { useRouter } from "next/router";
import useFirebase from "@/lib/firebase/useFirebase";

interface GuardedDemoPageProps {
  firebaseConfig: FirebaseConfig;
}

export default function GuardedDemoPage({
  firebaseConfig,
}: GuardedDemoPageProps) {
  console.log(`firebaseConfig`);
  console.log(firebaseConfig);
  const router = useRouter();
  const { user, loading } = useFirebase(firebaseConfig);
  // Redirect unauthenticated users to the login page
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [loading, user, router]);
  return (
    <>
      <h1>Demo Guarded Page</h1>
      <p>You must be logged in to see this page</p>
      <button>Go Home</button>
      {/* <p>
        {connected
          ? "Connected to the websockets server"
          : "Connecting to the websockets server..."}
      </p> */}
    </>
  );
}

export const getServerSideProps = async () => {
  const firebaseConfig = await getFirebaseConfig();
  return {
    props: {
      firebaseConfig,
    },
  };
};
