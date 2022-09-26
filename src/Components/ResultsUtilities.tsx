import { Button, Center, Flex, Stack, Text } from "@chakra-ui/react";
import { BsBookmarkPlus, BsClipboardData, BsShare } from "react-icons/bs";
import { Icon } from "@chakra-ui/icons";
import { HiOutlineDocumentReport } from "react-icons/hi";

function ResultItem(props: { text: string; icon: any }) {
  // TODO: Add callback functions
  return (
    <Button w={"full"} h={"16"}>
      <Center w={"full"}>
        <Flex direction={"column"} alignItems={"center"} justifyContent={"center"}>
          <Icon as={props.icon} h={5} w={5} mb={1} />
          <Text fontSize={"sm"}>{props.text}</Text>
        </Flex>
      </Center>
    </Button>
  );
}

export function ResultsUtilities() {
  return (
    <Stack
      direction={"row"}
      border={"1px"}
      borderColor={"gray.400"}
      borderRadius={"xl"}
      alignItems={"center"}
      justifyContent={"center"}
      mb={1}
      p={1}
      bg={"gray.100"}>
      <ResultItem text={"Bookmark"} icon={BsBookmarkPlus} />
      <ResultItem text={"Report"} icon={HiOutlineDocumentReport} />
      <ResultItem text={"Datasets"} icon={BsClipboardData} />
      <ResultItem text={"Share"} icon={BsShare} />
    </Stack>
  );
}
