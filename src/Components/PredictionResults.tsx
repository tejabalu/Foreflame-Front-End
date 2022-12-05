import { Flex } from "@chakra-ui/react";
import { BookmarkFeatures } from "./BookmarkFeatures";
import { ResultsUtilities } from "./ResultsUtilities";
import { Warnings } from "./Warnings";

interface PredictionResultsInterface {
  bookmarks: any;
  setSelectedBookmarks: any;
}

export function PredictionResults({ bookmarks, setSelectedBookmarks }: PredictionResultsInterface) {
  return (
    <Flex direction={"column"} flex={0.8} minH={0} borderRadius={"xl"} m={1}>
      <ResultsUtilities />
      <BookmarkFeatures bookmarks={bookmarks} setSelectedBookmarks={setSelectedBookmarks} />
      <Warnings />
    </Flex>
  );
}
