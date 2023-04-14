import useFirebase from "@/lib/firebase/useFirebase";
import { FirebaseConfig, getFirebaseConfig } from "@/lib/secrets/secrets";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  firebaseConfig: FirebaseConfig;
}

const Logout: React.FC<Props> = ({ firebaseConfig }) => {
  const router = useRouter();
  const { auth } = useFirebase(firebaseConfig);
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
  const firebaseConfig = await getFirebaseConfig();
  return {
    props: {
      firebaseConfig,
    },
  };
};

export default Logout;
