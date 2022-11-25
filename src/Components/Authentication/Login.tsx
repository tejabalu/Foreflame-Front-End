import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { auth } from "../../firebase-config";

const Login = () => {
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

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

  const registerWithEmail = async () => {
    createUserWithEmailAndPassword(auth, regEmail, regPassword)
      .then(() => {
        AuthChange();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const login = async () => {
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
    <>
      {user != null && <p>{user.email}</p>}
      <Formik initialValues={{ username: "", password: "", email: "" }} onSubmit={registerWithEmail}>
        {(props) => (
          <Form>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                onChange={(e) => {
                  setRegEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => {
                  setRegPassword(e.target.value);
                }}
              />
            </FormControl>
            <Button mt={4} isLoading={props.isSubmitting} type="submit">
              Register
            </Button>
          </Form>
        )}
      </Formik>

      <Formik initialValues={{ username: "", password: "", email: "" }} onSubmit={login}>
        {(props) => (
          <Form>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }}
              />
            </FormControl>
            <Button mt={4} isLoading={props.isSubmitting} type="submit">
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <Button onClick={logout}>Sign out</Button>
      <Button onClick={loginWithGoogle}>Login with Google</Button>
    </>
  );
};

export default Login;
