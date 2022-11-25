import { useContext, useState } from "react";
import { UserContext } from "../LoginContext";
import DashboardLink from "./Authentication/DashboardLink";
import SignIn from "./Authentication/Signin";
import SignUp from "./Authentication/SignUp";

const Greeting = () => {
  const { user } = useContext(UserContext);
  const [signInGreeting, setSignInGreeting] = useState<boolean>(true);

  function toggleSignInGreeting() {
    console.log("toggle clicked");
    setSignInGreeting(!signInGreeting);
    console.log(signInGreeting);
  }

  if (user != null) {
    return <DashboardLink />;
  }

  if (signInGreeting) {
    return <SignIn setSignInGreeting={setSignInGreeting} />;
  }

  return <SignUp setSignInGreeting={toggleSignInGreeting} />;
};

export default Greeting;
