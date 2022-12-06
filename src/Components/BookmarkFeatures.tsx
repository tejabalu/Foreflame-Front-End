import { Box, Flex, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { ComponentTitle } from "./ComponentTitle";

interface BookmarkFeaturesInterface {
  bookmarks: [];
  setSelectedBookmarks: any;
}

export function BookmarkFeatures({ bookmarks, setSelectedBookmarks }: BookmarkFeaturesInterface) {
  const heading = "Bookmarks";
  const popOverContent = "The following are all the bookmarks made on the map interface. Selecting one moves the map bounds to that bookmark.";

  return (
    <Flex direction={"column"} flex={2} p={2} bg={"green"} w={"100%"} rounded={"xl"} mb={1}>
      <Box borderRadius={"lg"} bg={"graygreen"} flex={1} p={2}>
        {ComponentTitle({
          heading,
          popOverContent,
        })}

        <Box p={2}>
          <RadioGroup
            color="white"
            onChange={(e) => {
              if (e) setSelectedBookmarks(e);
            }}>
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
