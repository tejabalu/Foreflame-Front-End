import { Icon } from "@chakra-ui/icons";
import { Button, Center, Flex, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { BsClipboardData, BsShare } from "react-icons/bs";
import { HiOutlineDocumentReport } from "react-icons/hi";

function ResultItem(props: { text: string; icon: any; destination: string }) {
  // TODO: Add callback functions
  return (
    <Button w={"full"} h={"16"}>
      <Link href={props.destination} as={NextLink} target="_blank" textDecoration={"none"}>
        <Center w={"full"}>
          <Flex direction={"column"} alignItems={"center"} justifyContent={"center"}>
            <Icon as={props.icon} h={5} w={5} mb={1} />
            <Text fontSize={"sm"}>{props.text}</Text>
          </Flex>
        </Center>
      </Link>
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
      <ResultItem destination={"http://foreflame.eastus.cloudapp.azure.com/static/ReportJuly25.pdf"} text={"Report"} icon={HiOutlineDocumentReport} />
      <ResultItem
        destination={"https://drive.google.com/drive/u/1/folders/1g3C8qfAnJiIYhbI_Ksi7H5oSeoeQSD79"}
        text={"Datasets"}
        icon={BsClipboardData}
      />
      <ResultItem destination={""} text={"Share"} icon={BsShare} />
    </Stack>
  );
}
