import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

function Example() {
  let [value, setValue] = React.useState("");

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };
  return (
    <>
      <Text mb="8px">Value: {value}</Text>
      <Textarea
        value={value}
        onChange={handleInputChange}
        placeholder="Here is a sample placeholder"
        size="sm"
      />
    </>
  );
}

const MatchDetail = () => {
  return (
    <Grid
      p={4}
      h="80vh"
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
    >
      <GridItem
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        colSpan={2}
        bg="tomato"
      >
        <Card maxW="sm">
          <CardBody>
            <Stack mt="6" spacing="3">
              <Heading size="md">Name</Heading>
              <Text>Location</Text>
              <Text>
                <Example />
              </Text>
              <Text>Price</Text>
            </Stack>
          </CardBody>
          <Divider />
        </Card>
      </GridItem>
      <GridItem colSpan={3} bg="tomato" />
    </Grid>
  );
};

export default MatchDetail;
