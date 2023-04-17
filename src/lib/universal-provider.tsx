// import { ApolloProvider } from '@/lib/graphql/ApolloProvider';
import { ReactNode } from "react";
import { FirebaseConfig } from "@/lib/secrets/secrets";
import { ApolloProvider } from "@/lib/graphql/ApolloProvider";
import { FirebaseProvider } from "@/lib/firebase/FirebaseProvider";

interface UniversalProviderProps {
  children: ReactNode;
  firebaseConfig: FirebaseConfig;
  graphqlEndpoint: string;
}

export const UniversalProvider: React.FC<UniversalProviderProps> = ({
  children,
  firebaseConfig,
  graphqlEndpoint,
}) => {
  return (
    <FirebaseProvider firebaseConfig={firebaseConfig}>
      <ApolloProvider graphqlEndpoint={graphqlEndpoint}>
        {children}
      </ApolloProvider>
    </FirebaseProvider>
  );
};
