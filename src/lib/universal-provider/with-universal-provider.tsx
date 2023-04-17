// lib/withUniversalProvider.tsx
import { NextPage } from "next";
import { UniversalProvider } from "@/lib/universal-provider/UniversalProvider";
import { FirebaseConfig } from "@/lib/secrets/secrets";

interface WithUniversalProviderOptions {
  firebaseConfig: FirebaseConfig;
  graphqlEndpoint: string;
}

export function withUniversalProvider<P extends object>(
  WrappedComponent: NextPage<P>,
  options?: WithUniversalProviderOptions
): NextPage<P> {
  const WithUniversalProvider: NextPage<
    P & Partial<WithUniversalProviderOptions>
  > = (props) => {
    if (!props.firebaseConfig || !props.graphqlEndpoint) return null;
    return (
      <UniversalProvider
        firebaseConfig={props.firebaseConfig}
        graphqlEndpoint={props.graphqlEndpoint}
      >
        <WrappedComponent {...props} />
      </UniversalProvider>
    );
  };

  return WithUniversalProvider;
}
