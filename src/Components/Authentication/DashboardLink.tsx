import { Box, Flex, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

export default function DashboardLink() {
  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} width={"xl"} py={12} px={6}>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack align={"center"}>
            <Heading fontSize={"3xl"}>ForeFlame Dashboard</Heading>
            <Link href="/">
              <Text color={"green"}>Dashboard</Text>
            </Link>
          </Stack>
          <Stack spacing={4}></Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
