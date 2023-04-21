import { usePasswordlessEmailLogin } from "@/lib/firebase/usePasswordlessLogin";
import { FirebaseConfig, getFirebaseConfig } from "@/lib/secrets/secrets";
import { UniversalGetServerSideProps } from "@/lib/universal-provider/universal-server-props";
import { withUniversalProvider } from "@/lib/universal-provider/with-universal-provider";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

interface Props {
  firebaseConfig: FirebaseConfig;
  completeLoginRoute: string;
}

const CompleteLogin: React.FC<Props> = ({
  firebaseConfig,
  completeLoginRoute,
}) => {
  const router = useRouter();
  const { handleEmailLink } = usePasswordlessEmailLogin({
    firebaseConfig,
    completeLoginRoute,
  });
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const completeLogin = useCallback(async () => {
    if (email && submitted) {
      setLoading(true);
      try {
        const emailLink = window.location.href;
        await handleEmailLink(emailLink, email);
        window.localStorage.removeItem("emailForSignIn");
        router.push("/");
      } catch (err) {
        console.log(err);
        setError("Error signing in. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  }, [email, submitted]);

  useEffect(() => {
    const storedEmail = window.localStorage.getItem("emailForSignIn");
    if (storedEmail) {
      setEmail(storedEmail);
      setSubmitted(true);
    }
  }, []);

  useEffect(() => {
    if (email && submitted) {
      completeLogin();
    }
  }, [completeLogin, email, submitted]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    completeLogin();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500">
      <div className="w-full max-w-md bg-white rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4">Verify Login</h1>
        {email && submitted ? (
          <p className="text-lg">Verifying login...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full py-2 px-4 text-center bg-blue-600 rounded-md text-white font-bold hover:bg-blue-700 focus:outline-none"
            >
              Submit
            </button>
          </form>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const universalServerProps = await UniversalGetServerSideProps();
  const completeLoginRoute = process.env.CONFIRM_LOGIN_ENDPOINT;
  return {
    props: {
      ...universalServerProps.props,
      completeLoginRoute,
    },
  };
};

export default withUniversalProvider(CompleteLogin);
