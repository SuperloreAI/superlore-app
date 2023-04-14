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

export const usePasswordlessEmailLogin = (firebaseConfig: FirebaseConfig) => {
  const { auth } = useFirebase(firebaseConfig);
  const [status, setStatus] = useState<PasswordlessEmailLoginStatus>("idle");
  const [error, setError] = useState<Error | null>(null);

  const sendSignInLink = useCallback(
    async (email: string) => {
      setStatus("sending");

      const actionCodeSettings = {
        url: "http://localhost:3000/complete-login", // Replace with your desired redirect URL
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
    [auth]
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

  const handleEmailLink = useCallback(
    async (emailLink: string) => {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = prompt("Please provide your email for confirmation");
      }

      if (email && isSignInWithEmailLink(auth, emailLink)) {
        const methods = await fetchSignInMethodsForEmail(auth, email);
        if (methods.length === 0) {
          // User is not registered, sign in with email link
          await signInWithLink(email, emailLink);
        } else {
          // User is registered, link email link to the user
          const currentUser = auth.currentUser;
          if (currentUser) {
            const credential = EmailAuthProvider.credentialWithLink(
              email,
              emailLink
            );
            await linkWithCredential(currentUser, credential);
          } else {
            throw new Error("No current user to link the email link to.");
          }
        }
        window.localStorage.removeItem("emailForSignIn");
      }
    },
    [auth, signInWithLink]
  );

  return { status, error, sendSignInLink, signInWithLink, handleEmailLink };
};
