import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { FirebaseConfig } from "@/lib/secrets/secrets";

let app: ReturnType<typeof initializeApp>;
let auth: ReturnType<typeof getAuth>;

interface FirebaseState {
  user: User | null;
  loading: boolean;
  auth: ReturnType<typeof getAuth>;
}

function useFirebase(firebaseConfig: FirebaseConfig): FirebaseState {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initFirebase = async () => {
      if (!app) {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
      }

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });

      return () => {
        unsubscribe();
      };
    };

    initFirebase();
  }, []);

  return { user, loading, auth };
}

export default useFirebase;
