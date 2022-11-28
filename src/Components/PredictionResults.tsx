import { Flex } from "@chakra-ui/react";
import { BookmarkFeatures } from "./BookmarkFeatures";
import { ResultsUtilities } from "./ResultsUtilities";
import { Warnings } from "./Warnings";

export function PredictionResults() {
  return (
    <Flex direction={"column"} flex={1} minH={0} borderRadius={"xl"} m={1}>
      <ResultsUtilities />
      <BookmarkFeatures />
      <Warnings />
    </Flex>
  );
}
