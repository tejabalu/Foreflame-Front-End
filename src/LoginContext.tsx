import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "./firebase-config";

interface UserContextTypes {
  user: User | null;
  registerWithEmail(name: string, email: string, password: string): Promise<void>;
  login(email: string, password: string): Promise<void>;
  loginWithGoogle(): Promise<void>;
  logout(): Promise<void>;
}

const UserContextDefault: UserContextTypes = {
  user: null,
  registerWithEmail: async () => {},
  login: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
};

export const UserContext = React.createContext<UserContextTypes>(UserContextDefault);

export const UserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);

  const AuthChange = () => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log("auth changed");
      if (currentUser) {
        console.log(currentUser, " logged in.");
        setUser(currentUser);
      } else {
        console.log("Firebase logged out.");
        setUser(null);
      }
    });
  };

  useEffect(() => {
    AuthChange();
  }, []);

  const registerWithEmail = async (regName: string, regEmail: string, regPassword: string) => {
    createUserWithEmailAndPassword(auth, regEmail, regPassword)
      .then(async ({ user }) => {
        updateProfile(user, { displayName: regName })
          .then()
          .catch((err) => {
            console.log(err);
          });
        AuthChange();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const login = async (loginEmail: string, loginPassword: string) => {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then(() => {
        AuthChange();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = async () => {
    console.log("logout clicked");
    signOut(auth)
      .then(() => {
        AuthChange();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginWithGoogle = async () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user);
        setUser(response.user);
        AuthChange();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        registerWithEmail,
        login,
        logout,
        loginWithGoogle,
      }}>
      {children}
    </UserContext.Provider>
  );
};
