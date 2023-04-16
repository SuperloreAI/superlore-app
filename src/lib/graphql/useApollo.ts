import { useState, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { FirebaseConfig } from "@/lib/secrets/secrets";
import useFirebase from "@/lib/firebase/useFirebase";

interface useApolloProps {
  firebaseConfig: FirebaseConfig;
}
const useApollo = ({
  firebaseConfig,
}: useApolloProps): ApolloClient<NormalizedCacheObject> | null => {
  const [client, setClient] =
    useState<ApolloClient<NormalizedCacheObject> | null>(null);

  const { auth } = useFirebase(firebaseConfig);

  useEffect(() => {
    const setApolloClient = async () => {
      if (!auth || !auth.currentUser) return;
      const userTokenID = await auth.currentUser?.getIdToken();
      const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;

      const link = createHttpLink({
        uri: GRAPHQL_ENDPOINT,
        credentials: "same-origin",
      });

      const authLink = setContext((_, { headers }) => {
        const token = userTokenID || localStorage.getItem("token");
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
          },
        };
      });

      const apolloClient = new ApolloClient<NormalizedCacheObject>({
        cache: new InMemoryCache(),
        link: authLink.concat(link),
      });

      setClient(apolloClient);
    };
    setApolloClient();
  }, [auth?.currentUser]);

  return client;
};

export default useApollo;
