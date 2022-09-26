import { Flex } from "@chakra-ui/react";
import React from "react";
import { ResultsUtilities } from "./ResultsUtilities";
import { PredictionOverview } from "./PredictionOverview";
import { Warnings } from "./Warnings";

export function PredictionResults() {
  return (
    <Flex direction={"column"} flex={1} borderRadius={"xl"} m={1}>
      <ResultsUtilities />
      <PredictionOverview />
      <Warnings />
    </Flex>
  );
}
