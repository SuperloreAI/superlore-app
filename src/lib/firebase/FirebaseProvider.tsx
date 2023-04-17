// Import React and Firebase dependencies
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { FirebaseConfig } from "@/lib/secrets/secrets";

// Initialize Firebase app and auth
let app: ReturnType<typeof initializeApp>;
let auth: ReturnType<typeof getAuth>;

// Define the FirebaseState interface
interface FirebaseState {
  user: User | null;
  loading: boolean;
  auth: ReturnType<typeof getAuth>;
}

// Create a Firebase context
const FirebaseContext = createContext<FirebaseState | undefined>(undefined);

// Define the useFirebase hook
export function useFirebase(): FirebaseState {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
}

// Define the FirebaseProviderProps interface
interface FirebaseProviderProps {
  children: ReactNode;
  firebaseConfig: FirebaseConfig;
}

// Define the FirebaseProvider component
export function FirebaseProvider({
  children,
  firebaseConfig,
}: FirebaseProviderProps) {
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
  }, [firebaseConfig]);

  const value = useMemo(() => ({ user, loading, auth }), [user, loading, auth]);

  return loading ? (
    <p>loading firebase...</p>
  ) : (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}
