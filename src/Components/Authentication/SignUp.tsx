import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useContext } from "react";
import { UserContext } from "../../LoginContext";
import { OAuthButtonGroup } from "./OAuthButtonGroup";

export default function SignUp({ setSignInGreeting }: { setSignInGreeting: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { registerWithEmail, user } = useContext(UserContext);

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} width={"xl"} py={12} px={6}>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack align={"center"} pb={12}>
            <Heading fontSize={"3xl"}>Sign up for a new account</Heading>
            <Button
              colorScheme={"whiteAlpha"}
              onClick={() => {
                console.log("clicked");
                setSignInGreeting(true);
              }}>
              <Text color={"green"}>Already have an account? Sign in.</Text>
            </Button>
          </Stack>
          <Stack spacing={4}>
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              onSubmit={(value) => {
                console.log(value);
                registerWithEmail(value.name, value.email, value.password)
                  .then()
                  .catch((err) => {
                    console.log(err);
                  });
              }}>
              {(props) => (
                <Form>
                  <Field name="name">
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl id="name">
                        <FormLabel>Name</FormLabel>
                        <Input {...field} type="text" />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="email">
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input {...field} type="email" />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input {...field} type="password" />
                      </FormControl>
                    )}
                  </Field>
                  <Stack spacing={10}>
                    <Stack direction={{ base: "column", sm: "row" }} align={"start"} justify={"space-between"}>
                      <Checkbox>Remember me</Checkbox>
                    </Stack>
                    <Button
                      bg={"darkgreen"}
                      color={"white"}
                      _hover={{
                        bg: "green",
                      }}
                      type="submit">
                      Sign in
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
            <Stack spacing="6">
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>
              <OAuthButtonGroup />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
