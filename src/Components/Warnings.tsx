import { Text, Flex, Stack, StackDivider } from "@chakra-ui/react";

export function Warnings() {
  return (
    <Flex
      flex={1}
      direction={"column"}
      p={2}
      mt={1}
      borderRadius={"lg"}
      border={"1px"}
      borderColor={"gray.400"}
      alignItems={"center"}
      color={"darkgreen"}>
      <Text fontWeight={"semibold"} fontSize={"lg"} mb={4}>
        Warnings ⚠
      </Text>
      <Stack divider={<StackDivider borderColor={"gray.400"} />}>
        <Text fontSize={"sm"}>Temperature increased 10% compared to last week</Text>
        <Text fontSize={"sm"}>Humidity decreased 10% compared to last week</Text>
      </Stack>
    </Flex>
  );
}
