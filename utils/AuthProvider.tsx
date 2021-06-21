import React from "react";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserProp } from "utils/interfaces";
import { auth } from "utils/firebaseClient";

export const AuthContext = createContext<{
  user: UserProp | null;
  error: string | null;
  signIn: (clientId: string, username: string, password: string) => void;
  signOut: () => void;
}>({
  user: null,
  error: null,
  signIn: null,
  signOut: null,
});

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState<UserProp | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const getUser = async (uid: string) => {
    setUser(await (await fetch(`/api/users/${uid}`)).json());
  };

  const signIn = async (
    clientId: string,
    username: string,
    password: string
  ) => {
    try {
      const email = username + "@mail.com";

      await auth().signInWithEmailAndPassword(email, password);
      router.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
      router.push("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  // listen for token changes
  // call setUser and write new token as a cookie
  useEffect(() => {
    return auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        Cookies.remove("token");
      } else {
        const token = await user.getIdToken();
        getUser(user.uid);
        Cookies.set("token", token);
      }
    });
  }, []);

  // Force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // Clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user, error, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
