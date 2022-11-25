import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../../LoginContext";
import { OAuthButtonGroup } from "./OAuthButtonGroup";

export default function SignIn({ setSignInGreeting }: { setSignInGreeting: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { login, user } = useContext(UserContext);

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} width={"xl"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"3xl"}>Sign in to your account</Heading>
          <Button
            colorScheme={"whiteAlpha"}
            onClick={() => {
              console.log("asdf");
              setSignInGreeting(false);
            }}>
            <Text color={"green"}>Don't have an account? Create a new one.</Text>
          </Button>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={(value) => {
                login(value.email, value.password)
                  .then(() => {})
                  .catch((err) => {
                    console.log(err);
                  });
              }}>
              {(props) => (
                <Form>
                  <Field name="email">
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl>
                        <FormLabel>Email address</FormLabel>
                        <Input {...field} type="email" />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input {...field} type="password" />
                      </FormControl>
                    )}
                  </Field>
                  <Stack spacing={10}>
                    <Stack direction={{ base: "column", sm: "row" }} align={"start"} justify={"space-between"}>
                      <Checkbox>Remember me</Checkbox>
                      <Link href="/">
                        <Text color={"green"}>Forgot password?</Text>
                      </Link>
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
            </Formik>{" "}
            <Stack spacing="6">
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  or sign up with
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
