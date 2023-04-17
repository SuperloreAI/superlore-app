// lib/withUniversalProvider.tsx
import { NextPage } from "next";
import { UniversalProvider } from "@/lib/universal-provider";
import { FirebaseConfig } from "@/lib/secrets/secrets";

interface WithUniversalProviderOptions {
  firebaseConfig: FirebaseConfig;
}

export function withUniversalProvider<P extends object>(
  WrappedComponent: NextPage<P>,
  options?: WithUniversalProviderOptions
): NextPage<P> {
  const WithUniversalProvider: NextPage<
    P & Partial<WithUniversalProviderOptions>
  > = (props) => {
    if (!props.firebaseConfig) return null;
    return (
      <UniversalProvider firebaseConfig={props.firebaseConfig}>
        <WrappedComponent {...props} />
      </UniversalProvider>
    );
  };

  return WithUniversalProvider;
}
