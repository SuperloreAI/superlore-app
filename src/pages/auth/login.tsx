import { usePasswordlessEmailLogin } from "@/lib/firebase/usePasswordlessLogin";
import { FirebaseConfig, getFirebaseConfig } from "@/lib/secrets/secrets";
import React, { useState } from "react";

interface Props {
  firebaseConfig: FirebaseConfig;
  completeLoginRoute: string;
}

const Login: React.FC<Props> = ({ firebaseConfig, completeLoginRoute }) => {
  const { sendSignInLink, status, error } = usePasswordlessEmailLogin({
    firebaseConfig,
    completeLoginRoute,
  });
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendSignInLink(email);
  };

  const renderButton = () => {
    const getButtonClass = () => {
      switch (status) {
        case "idle":
          return "bg-blue-600 hover:bg-blue-700";
        case "sending":
          return "bg-yellow-400 hover:bg-yellow-500 cursor-not-allowed";
        case "sent":
          return "bg-green-600 hover:bg-green-700 cursor-not-allowed";
        case "error":
          return "bg-red-600 hover:bg-red-700";
        default:
          return "bg-blue-600 hover:bg-blue-700";
      }
    };

    const buttonText = () => {
      switch (status) {
        case "idle":
          return "Send Login Link";
        case "sending":
          return "Sending...";
        case "sent":
          return "Sent!";
        case "error":
          return "Try Again";
        default:
          return "Send Login Link";
      }
    };

    return (
      <button
        type="submit"
        className={`w-full py-2 px-4 text-center rounded-md text-white font-bold focus:outline-none ${getButtonClass()}`}
        disabled={status === "sending" || status === "sent"}
      >
        {buttonText()}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold mb-4">Launch Superlore</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {renderButton()}
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const firebaseConfig = await getFirebaseConfig();
  const completeLoginRoute = process.env.CONFIRM_LOGIN_ENDPOINT;
  return {
    props: {
      firebaseConfig,
      completeLoginRoute,
    },
  };
};

export default Login;
