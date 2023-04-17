import { FirebaseConfig, getFirebaseConfig } from "@/lib/secrets/secrets";

export interface UniversalServerSidePropsInterface {
  firebaseConfig: FirebaseConfig;
}
export const UniversalGetServerSideProps = async () => {
  // https://stackoverflow.com/a/72325973
  const firebaseConfig = await getFirebaseConfig();
  const graphqlEndpoint = process.env.GRAPHQL_ENDPOINT;
  return {
    props: {
      firebaseConfig,
      graphqlEndpoint,
    },
  };

  /**
   * 
   * How to use:
   * 
   * import {UniversalGetServerSideProps,UniversalServerSidePropsInterface} from "@/lib/universal-server-props";
   * 
   * interface MyPageProps extends UniversalServerSidePropsInterface {}
   * 
   * export async function getServerSideProps(ctx) {
  // do custom page stuff...
  return {
    ...await UniversalGetServerSideProps(ctx),
    ...{
      // pretend this is what you put inside
      // the return block regularly, e.g.
      props: { junk: 347 }
    }
  };
}
   * 
   */
};
