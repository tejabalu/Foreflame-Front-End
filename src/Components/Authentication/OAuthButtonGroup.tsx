import { Button, ButtonGroup, VisuallyHidden } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../../LoginContext";
import { GoogleIcon } from "./ProviderIcons";

const providers = [{ name: "Google", icon: <GoogleIcon boxSize="5" /> }];

export const OAuthButtonGroup = () => {
  const { loginWithGoogle } = useContext(UserContext);

  return (
    <ButtonGroup variant="outline" spacing="4" width="full">
      {providers.map(({ name, icon }) => (
        <Button
          key={name}
          width="full"
          onClick={() => {
            loginWithGoogle();
            console.log("clicked");
          }}>
          <VisuallyHidden>Sign in with {name}</VisuallyHidden>
          {icon}
        </Button>
      ))}
    </ButtonGroup>
  );
};
