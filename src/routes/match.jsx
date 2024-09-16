import { SearchBar } from "../component/SearchBar";
import MenuOptions from "../component/MenuOptions";
import NewMatch from "../component/NewMatch";
import GroupDetail from "../component/GroupDetail";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiDelete,
  FiPlus,
  FiTrash,
} from "react-icons/fi";
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
import {
  Route,
  Routes,
  useMatches,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Button, ButtonGroup } from "@chakra-ui/react";
import MatchDetail from "../component/MatchDetail";
import { formatTimeDate } from "../utils/time";

const Match = () => {
  const [matchData, setMatchData] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const [currentDelete, setCurrentDelete] = React.useState(null);
  const getMatchNameByUID = (uid) => {
    let match = matchData.find((match) => match.uid === uid);
    return match ? match.matchName : "";
  };

  const OpenDeleteModal = (matchId) => {
    setCurrentDelete(matchId);
    onOpen();
  };
  const confirmDelete = () => {
    fetch(process.env.REACT_APP_API_URL + "/match/delete/" + currentDelete, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setMatchData(
            matchData.filter((match) => match.uid !== currentDelete)
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL + "/match/list"
        );
        const data = await response.json();
        setMatchData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    }
    fetchData();
  }, []);

  const [selectedMatch, setSelectedMatch] = React.useState(null);

  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");
  const { matchId } = useParams();
  let matches = useMatches();
  let crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) => Boolean(match.handle?.crumb))
    // now map them into an array of elements, passing the loader
    // data to each one
    .map((match) => match.handle.crumb(match.data));
  return (
    <Box color="gray.900">
      {/* <Breadcrumb spacing="8px" separator={<FiChevronRight color="gray.500" />}>
        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={() => {
              navigate("/match");
            }}
          >
            Match
          </BreadcrumbLink>
        </BreadcrumbItem>

        {matchData && matchId && (
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{getMatchNameByUID(matchId)}</BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb> */}

      <Routes>
        <Route path="/:matchId/*" element={<MatchDetail />}></Route>
        <Route
          path="/"
          element={
            <>
              <>
                <Modal
                  finalFocusRef={finalRef}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Do you want to delete</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <div>{getMatchNameByUID(currentDelete)}</div>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        colorScheme="yellow"
                        mr={3}
                        onClick={() => {
                          confirmDelete();
                        }}
                      >
                        Delete
                      </Button>
                      <Button variant="ghost" onClick={onClose}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </>
              <div>
                <Flex gap={2} justifyContent={"space-between"} mt={5} mb={5}>
                  <Flex width={"100%"} gap={2}>
                    <SearchBar
                      placeholder={"Search match"}
                      onChange={(value) => setSearch(value)}
                    />{" "}
                    <MenuOptions
                      onChange={(value) => {
                        // Switch_case
                        switch (value) {
                          case "name_asc":
                            setMatchData(
                              matchData.sort((a, b) => {
                                return a.matchName.localeCompare(b.matchName);
                              })
                            );
                            break;
                          case "name_desc":
                            setMatchData(
                              matchData.sort((a, b) => {
                                return b.matchName.localeCompare(a.matchName);
                              })
                            );
                            break;
                          case "date_asc":
                            setMatchData(
                              matchData.sort((a, b) => {
                                return (
                                  new Date(b.createdAt) - new Date(a.createdAt)
                                );
                              })
                            );
                            break;
                          case "date_desc":
                            setMatchData(
                              matchData.sort((a, b) => {
                                return (
                                  new Date(a.createdAt) - new Date(b.createdAt)
                                );
                              })
                            );
                            break;
                          default:
                            break;
                        }
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
                  <Button
                    colorScheme="blue"
                    variant="solid"
                    onClick={() => {
                      navigate("/match/new");
                    }}
                  >
                    <Flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      gap={2}
                    >
                      <Text>New match</Text>

                      <FiPlus />
                    </Flex>
                  </Button>
                </Flex>

                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th color="scc_blue.100">Name</Th>
                        <Th color="scc_blue.100">Date</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {matchData && matchData.length > 0 ? (
                        matchData
                          .filter((item) => item.matchName.includes(search))
                          .map((match, index) => {
                            return (
                              <>
                                <Tr key={index}>
                                  <Td>{match.matchName}</Td>
                                  <Td>{formatTimeDate(match.createdAt)}</Td>
                                  <Td>
                                    <ButtonGroup gap={2}>
                                      <Button
                                        onClick={() => {
                                          navigate("/match/" + match.uid);
                                        }}
                                      >
                                        View detail
                                      </Button>
                                      <Button
                                        colorScheme="yellow"
                                        onClick={() => {
                                          OpenDeleteModal(match.uid);
                                        }}
                                      >
                                        <FiTrash />
                                      </Button>
                                    </ButtonGroup>
                                  </Td>
                                </Tr>
                              </>
                            );
                          })
                      ) : isFetching ? (
                        <Flex
                          w="100%"
                          p={4}
                          justifyContent={"start"}
                          alignItems={"center"}
                          height={"100%"}
                        >
                          <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                          />
                        </Flex>
                      ) : (
                        <Tr>
                          <Td colSpan={3}>No data</Td>
                        </Tr>
                      )}
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
              </div>
            </>
          }
        />
        <Route path="/new" element={<NewMatch />} />
      </Routes>
    </Box>
  );
};

export default Match;
