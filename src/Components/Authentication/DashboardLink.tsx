import { Box, Button, Flex, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

export default function DashboardLink() {
  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} width={"xl"} py={12} px={6}>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack align={"center"}>
            <Heading fontSize={"3xl"}>Welcome!</Heading>
            <Text>Please go to the following link to start using ForeFlame.</Text>
            <Link href="/dashboard">
              <Button
                color={"white"}
                bg={"darkgreen"}
                _hover={{
                  bg: "green",
                }}
                w={"fit-content"}
                px={8}
                my={4}>
                <Text>Dashboard</Text>
              </Button>
            </Link>
          </Stack>
          <Stack spacing={4}></Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
