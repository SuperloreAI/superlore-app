import { useState, useCallback } from "react";
import { FirebaseConfig } from "@/lib/secrets/secrets";
import useFirebase from "@/lib/firebase/useFirebase";
import {
  EmailAuthProvider,
  fetchSignInMethodsForEmail,
  isSignInWithEmailLink,
  linkWithCredential,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";

type PasswordlessEmailLoginStatus = "idle" | "sending" | "sent" | "error";

interface Props {
  firebaseConfig: FirebaseConfig;
  completeLoginRoute: string;
}

export const usePasswordlessEmailLogin = ({
  firebaseConfig,
  completeLoginRoute,
}: Props) => {
  const { auth } = useFirebase(firebaseConfig);
  const [status, setStatus] = useState<PasswordlessEmailLoginStatus>("idle");
  const [error, setError] = useState<Error | null>(null);

  const sendSignInLink = useCallback(
    async (email: string) => {
      setStatus("sending");
      console.log(`completeLoginRoute = ${completeLoginRoute}`);
      if (!completeLoginRoute) {
        setError(
          new Error("Nothing found in process.env.CONFIRM_LOGIN_ENDPOINT;")
        );
        return;
      }
      const actionCodeSettings = {
        url: completeLoginRoute, // Replace with your desired redirect URL
        handleCodeInApp: true,
      };

      try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        setStatus("sent");
        window.localStorage.setItem("emailForSignIn", email);
      } catch (err) {
        setError(err as Error);
        setStatus("error");
      }
    },
    [auth, completeLoginRoute]
  );

  const signInWithLink = useCallback(
    async (email: string, emailLink: string) => {
      try {
        const result = await signInWithEmailLink(auth, email, emailLink);
        return result;
      } catch (err) {
        setError(err as Error);
        setStatus("error");
        return null;
      }
    },
    [auth]
  );

  const handleEmailLink = async (emailLink: string, email: string) => {
    try {
      const storedEmail = window.localStorage.getItem("emailForSignIn");
      const userEmail = email || storedEmail;

      if (!userEmail) {
        throw new Error("Email not provided or found in local storage.");
      }

      const methods = await fetchSignInMethodsForEmail(auth, userEmail);
      if (methods.length === 0) {
        // User not found, create a new user with email link
        await signInWithEmailLink(auth, userEmail, emailLink);
      } else {
        // User found, link email link to the existing user
        if (auth.currentUser) {
          const credential = EmailAuthProvider.credentialWithLink(
            userEmail,
            emailLink
          );
          await linkWithCredential(auth.currentUser, credential);
        } else {
          await signInWithEmailLink(auth, userEmail, emailLink);
        }
      }

      window.localStorage.removeItem("emailForSignIn");
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return { status, error, sendSignInLink, signInWithLink, handleEmailLink };
};
