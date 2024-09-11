import { SearchBar } from "../component/SearchBar";
import MenuOptions from "../component/MenuOptions";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FiChevronDown, FiChevronRight, FiPlus } from "react-icons/fi";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
const Match = () => {
  const [search, setSearch] = React.useState("");
  return (
    <Box color="gray.900">
      <Breadcrumb spacing="8px" separator={<FiChevronRight color="gray.500" />}>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="#">About</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">Contact</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex gap={2} justifyContent={"space-between"} mt={5} mb={5}>
        <Flex width={"100%"} gap={2}>
          <SearchBar
            placeholder={"Search match"}
            onChange={(value) => setSearch(value)}
          />{" "}
          <MenuOptions
            onChange={(value) => {
              // Sort value changed
            }}
            options={[
              {
                group: "Name",
                options: [
                  { label: "A - Z", value: "name_asc" },
                  { label: "Z - A", value: "name_desc" },
                ],
              },
              {
                group: "Date",
                options: [
                  { label: "Newest", value: "date_asc" },
                  { label: "Oldest", value: "date_desc" },
                ],
              },
            ]}
            title={"Sort by"}
          />
        </Flex>
        <Button colorScheme="blue" variant="solid">
          <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
            <Text>New match</Text>

            <FiPlus />
          </Flex>
        </Button>
      </Flex>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color="scc_blue.100">ID</Th>
              <Th color="scc_blue.100">Name</Th>
              <Th color="scc_blue.100">Date</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>Matching #1</Td>
              <Td>Matching #1</Td>
              <Td>
                <Button>View detail</Button>
              </Td>
            </Tr>
            <Tr>
              <Td>1</Td>
              <Td>
                Matching ssMatching ssMatching ssMatching ssMatching ssMatching
                ssMatching ss#1
              </Td>
              <Td>Matching #1</Td>
              <Td>
                <Button>View detail</Button>
              </Td>
            </Tr>
          </Tbody>
          <Tfoot>
            {/* <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr> */}
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Match;
