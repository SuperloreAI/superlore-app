import { useEffect } from "react";
import { FirebaseConfig } from "@/lib/secrets/secrets";
import { useRouter } from "next/router";
import { useFirebase } from "@/lib/firebase/FirebaseProvider";
import { UniversalGetServerSideProps } from "@/lib/universal-provider/universal-server-props";
import { withUniversalProvider } from "@/lib/universal-provider/with-universal-provider";
import VideoUploader from "@/components/VideoUploader";

interface GuardedDemoPageProps {
  firebaseConfig: FirebaseConfig;
}

const GuardedDemoPage = ({ firebaseConfig }: GuardedDemoPageProps) => {
  console.log(`firebaseConfig`);
  console.log(firebaseConfig);
  const router = useRouter();
  const { user, loading } = useFirebase();
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

      <VideoUploader />
      {/* <p>
        {connected
          ? "Connected to the websockets server"
          : "Connecting to the websockets server..."}
      </p> */}
    </>
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

export default withUniversalProvider(GuardedDemoPage);
