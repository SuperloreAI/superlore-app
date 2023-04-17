import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
  ApolloProvider as ApolloProviderBase,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useFirebase } from "@/lib/firebase/FirebaseProvider";

interface useApolloProviderProps {
  children: ReactNode;
  graphqlEndpoint: string;
}

const ApolloClientContext =
  createContext<ApolloClient<NormalizedCacheObject> | null>(null);

const ApolloProvider: React.FC<useApolloProviderProps> = ({
  children,
  graphqlEndpoint,
}) => {
  const client = useApollo({ graphqlEndpoint });

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <ApolloProviderBase client={client}>
      <ApolloClientContext.Provider value={client}>
        {children}
      </ApolloClientContext.Provider>
    </ApolloProviderBase>
  );
};

const useApolloClient = (): ApolloClient<NormalizedCacheObject> | null => {
  return useContext(ApolloClientContext);
};

const useApollo = ({
  graphqlEndpoint,
}: {
  graphqlEndpoint: string;
}): ApolloClient<NormalizedCacheObject> | null => {
  const [client, setClient] =
    useState<ApolloClient<NormalizedCacheObject> | null>(null);
  const [gqlEndpoint, setGqlEndpoint] = useState("");
  const { auth } = useFirebase();

  useEffect(() => {
    const setApolloClient = async () => {
      if (!auth || !auth.currentUser) return;
      setGqlEndpoint(graphqlEndpoint);
      const userTokenID = await auth.currentUser?.getIdToken();
      const GRAPHQL_ENDPOINT = graphqlEndpoint;

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

export { ApolloProvider, useApolloClient };
