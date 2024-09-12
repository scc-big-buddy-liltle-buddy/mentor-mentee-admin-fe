import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

const MatchDetail = () => {
  return (
    <Grid
      p={4}
      h="80vh"
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
    >
      <GridItem colSpan={2} bg="papayawhip" />
      <GridItem colSpan={3} bg="tomato" />
    </Grid>
  );
};

export default MatchDetail;
