import { Box, Flex, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { ComponentTitle } from "./ComponentTitle";

export function BookmarkFeatures({ bookmarks }: { bookmarks: [] }) {
  const heading = "Bookmark Features";
  const popOverContent =
    "The following are all the bookmarks made on the map interface. Selecting a bookmark will ensure the parameters and 5 day high risk areas are relevant to this location alone.";

  console.log(bookmarks, "bookmarks");

  return (
    <Flex direction={"column"} flex={2} p={2} bg={"green"} w={"100%"} rounded={"xl"} mb={1}>
      <Box borderRadius={"lg"} bg={"graygreen"} flex={1} p={2}>
        {ComponentTitle({
          heading,
          popOverContent,
        })}

        <Box p={2}>
          <RadioGroup color="white">
            <Stack direction="column">
              {bookmarks.map((bookmark, i) => (
                <Radio key={bookmark["id"]} value={bookmark["id"]}>
                  {bookmark["featureName"]}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Box>
      </Box>
    </Flex>
  );
}
