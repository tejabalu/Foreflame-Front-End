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
import { collection, CollectionReference, doc, DocumentData, getDocs, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase-config";

interface UserContextTypes {
  user: User | null;
  colRef: CollectionReference<DocumentData> | null;
  registerWithEmail(name: string, email: string, password: string): Promise<void>;
  login(email: string, password: string): Promise<void>;
  loginWithGoogle(): Promise<void>;
  logout(): Promise<void>;
}

const UserContextDefault: UserContextTypes = {
  user: null,
  colRef: null,
  registerWithEmail: async () => {},
  login: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
};

export const UserContext = React.createContext<UserContextTypes>(UserContextDefault);

export const UserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);
  const [colRef, setColRef] = useState<CollectionReference<DocumentData> | null>(null);

  const AuthChange = () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser, " logged in.");
        setUser(currentUser);
        setColRef(collection(db, currentUser.uid.toString()));
        if (colRef) addUserToFirestore(colRef);
      } else {
        console.log("Firebase logged out.");
        setUser(null);
        setColRef(null);
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
        alert("The user with this email already exists.");
      });
  };

  const addUserToFirestore = async (colRef: CollectionReference<DocumentData>) => {
    getDocs(colRef)
      .then((querySnap) => {
        if (querySnap.empty) {
          setDoc(doc(colRef, "drawFeatures"), {})
            .then((e) => {
              console.log("Writing user data.");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("User aready has data.");
        }
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
        colRef,
        registerWithEmail,
        login,
        logout,
        loginWithGoogle,
      }}>
      {children}
    </UserContext.Provider>
  );
};
