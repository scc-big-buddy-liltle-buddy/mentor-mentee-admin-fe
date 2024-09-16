import { Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

const Loading = ({ text }) => {
  return (
    <Flex
      height={"100vh"}
      flexDirection={"column"}
      alignItems="center"
      justifyContent="center"
    >
      <Spinner color="scc_blue.100" />
      <Text>{text}</Text>
    </Flex>
  );
};

export default Loading;
