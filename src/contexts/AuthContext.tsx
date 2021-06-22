import {
  useEffect, useState, createContext, ReactNode,
} from 'react';

import { auth, firebase } from '../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextData = {
  user: User | undefined;
  signInWithGoogle(): Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({ } as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    auth.onAuthStateChanged((userFirebase) => {
      if (userFirebase) {
        const { displayName, photoURL, uid } = userFirebase;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from google account');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const response = await auth.signInWithPopup(provider);

    if (response.user) {
      const { displayName, photoURL, uid } = response.user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from google account');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      signInWithGoogle,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}
function unsubscribe() {
  throw new Error('Function not implemented.');
}
