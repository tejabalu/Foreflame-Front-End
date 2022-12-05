import { Button, Center, Popover, PopoverBody, PopoverContent, PopoverTrigger, Text } from "@chakra-ui/react";
import { IoHelpCircleSharp } from "react-icons/io5";

export function LayerPopOver({ popOverContent }: { popOverContent: String }) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button backgroundColor={"transparent"} colorScheme={"green"} variant={"ghost"}>
          <IoHelpCircleSharp color="white" fontSize={"1.3em"} />
        </Button>
      </PopoverTrigger>
      <PopoverContent backgroundColor={"gray.100"}>
        <PopoverBody>{popOverContent}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export function ComponentTitle({ heading, popOverContent }: { heading: String; popOverContent: String }) {
  return (
    <Center justifyContent={"space-between"}>
      <Text justifyContent={"center"} align="center" alignContent="center" size={"sm"} px={2} color={"white"}>
        {heading}
      </Text>
      <LayerPopOver popOverContent={popOverContent} />
    </Center>
  );
}
