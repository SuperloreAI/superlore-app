import { useFirebase } from "@/lib/firebase/FirebaseProvider";
import { FirebaseConfig, getFirebaseConfig } from "@/lib/secrets/secrets";
import { UniversalGetServerSideProps } from "@/lib/universal-provider/universal-server-props";
import { withUniversalProvider } from "@/lib/universal-provider/with-universal-provider";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {}

const Logout: React.FC<Props> = () => {
  const router = useRouter();
  const { auth } = useFirebase();
  useEffect(() => {
    if (!auth) {
      console.log("No auth loaded yet");
      return;
    }
    const signOut = async () => {
      try {
        await auth.signOut();
        router.push("/");
      } catch (err) {
        console.error("Error signing out:", err);
      }
    };
    signOut();
  }, [router, auth]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Logging out...</h1>
    </div>
  );
};

export const getServerSideProps = async () => {
  const universalServerProps = await UniversalGetServerSideProps();
  return {
    props: {
      ...universalServerProps.props,
    },
  };
};

export default withUniversalProvider(Logout);
