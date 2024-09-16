import { useToast } from "@chakra-ui/react";
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  IconButton,
  useEditableControls,
  Input,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { SearchBar } from "./SearchBar";
import {
  Button,
  ButtonGroup,
  cookieStorageManager,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Loading from "./Loading";
import {
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  FiCheck,
  FiChevronDown,
  FiChevronLeft,
  FiEdit,
  FiFile,
  FiPenTool,
  FiTrash,
  FiX,
} from "react-icons/fi";
import { getMatchByUID, updateMatchName } from "../api/match";
import { formatTimeDate } from "../utils/time";
import { useMenteeStore, useMentorStore } from "../store/mem";
import { getMentorByID } from "../api/mentor";
import MenuOptions from "./MenuOptions";
import GroupDetail from "./GroupDetail";
import { useMatchStore } from "../store/match";
import { convertToXlsx } from "../utils/xlsx";
const GroupRow = ({ group }) => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { mentor } = group;

  return (
    <Tr>
      <Td>{mentor.fullName}</Td>
      <Td>{group.mentees.length}</Td>
      <Td>
        <ButtonGroup>
          <Button
            onClick={() => {
              // push
              navigate(`/match/${matchId}/${group.id}`);
              // navigate(`/match/${matchData.uid}`);
            }}
          >
            View group detail
          </Button>
        </ButtonGroup>
      </Td>
    </Tr>
  );
};

function EditableName({ uid, name }) {
  const toast = useToast();
  /* Here's a custom control */
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();
    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<FiCheck />} {...getSubmitButtonProps()} />
        <IconButton icon={<FiX />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<FiEdit />} {...getEditButtonProps()} />
      </Flex>
    );
  }
  const { updateMatchName } = useMatchStore();
  return (
    <Editable
      onSubmit={async (value) => {
        let response = await updateMatchName(uid, value);
        // Update match name in store
        toast({
          title: response.status === "success" ? "Successfully updated match name" : `Error in updating match name`,
          status: response.status,
          isClosable: true,
        });
      }}
      textAlign="center"
      defaultValue={name}
      fontSize="2xl"
      isPreviewFocusable={false}
    >
      <Flex gap={2} alignItems={"center"} justify={"center"}>
        <EditablePreview />
        {/* Here is the custom input */}
        <Input as={EditableInput} />
        <EditableControls />
      </Flex>
    </Editable>
  );
}

const MatchDetail = () => {
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();
  const { getMentorByID } = useMentorStore();
  const { getMenteeByID } = useMenteeStore();
  const { getMatchByID } = useMatchStore();
  const { matchId } = useParams();

  const [matchData, setMatchData] = React.useState(null);
  useEffect(() => {
    function fetchData() {
      let data = getMatchByID(matchId);
      setMatchData(data);
    }
    fetchData();
  }, []);

  const customFilter = (groups) => {
    if (currentFilter === MENTOR_NAME) {
      return groups.filter((group) =>
        group.mentor.fullName.toLowerCase().includes(search.toLowerCase())
      );
    }

    return groups.filter((group) =>
      group.mentees.some((mentee) =>
        mentee.menteeData.fullName.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const MENTOR_NAME = "Mentor name";
  const MENTEE_NAME = "Mentee name";
  const [currentFilter, setCurrentFilter] = React.useState(MENTOR_NAME);
  return (
    <div>
      {matchData ? (
        <>
          <Flex gap={2} alignItems={"center"}>
            <Button onClick={() => navigate(-1)}>
              <Flex gap={2}>
                <FiChevronLeft />
                <Text>Back</Text>
              </Flex>
            </Button>
            <Flex alignItems={"center"} gap={2}>
              <EditableName uid={matchData.uid} name={matchData.matchName} />
            </Flex>
          </Flex>

          <Routes>
            <Route path=":groupId/*" element={<GroupDetail />} />
            <Route
              path="/"
              element={
                <>
                  <Flex gap={2} justifyContent={"space-between"} mt={5} mb={5}>
                    <Flex width={"100%"} gap={2}>
                      <SearchBar
                        placeholder={"Search for " + currentFilter}
                        onChange={(value) => setSearch(value)}
                      />{" "}
                      <MenuOptions
                        parent={"group"}
                        onChange={(value) => {
                          // Switch_case
                          switch (value) {
                            case "gr_dec":
                              setMatchData({
                                ...matchData,
                                groups: matchData.groups.sort(
                                  (a, b) => b.mentees.length - a.mentees.length
                                ),
                              });
                              break;

                            case "gr_asc":
                              setMatchData({
                                ...matchData,
                                groups: matchData.groups.sort(
                                  (a, b) => a.mentees.length - b.mentees.length
                                ),
                              });
                              break;
                            default:
                              break;
                          }
                        }}
                        options={[
                          {
                            group: "Number of mentees",
                            options: [
                              { label: "Largest", value: "gr_dec" },
                              { label: "Smallest", value: "gr_asc" },
                            ],
                          },
                        ]}
                        title={"Sort by"}
                      />
                      <Menu>
                        <MenuButton as={Button} rightIcon={<FiChevronDown />}>
                          Search by {currentFilter}
                        </MenuButton>
                        <MenuList>
                          {[MENTOR_NAME, MENTEE_NAME].map((filter, index) => {
                            return (
                              <MenuItem
                                defaultChecked={filter === currentFilter}
                                key={index}
                                onClick={() => {
                                  setCurrentFilter(filter);
                                }}
                              >
                                {filter}
                              </MenuItem>
                            );
                          })}
                        </MenuList>
                      </Menu>
                      <Menu>
                        <MenuButton
                          colorScheme="yellow"
                          as={Button}
                          rightIcon={<FiFile />}
                        >
                          <Flex>Export</Flex>
                        </MenuButton>
                        <MenuList>
                          {["XLSX File"].map((filter, index) => {
                            const ListAllGroupDetail = (groups) => {
                              let result = [];
                              groups.forEach((group) => {
                                group.mentees.forEach((mentee) => {
                                  result.push({
                                    "Group ID": group.id,
                                    "Mentee ID": mentee.menteeId,
                                    "Mentor ID": group.mentorId,
                                    "Mentee name": getMenteeByID(
                                      mentee.menteeId
                                    ).fullName,
                                    "Mentor name": getMentorByID(group.mentorId)
                                      .fullName,
                                    "Match rate": mentee.matchRate,
                                    "Mentee email": getMenteeByID(
                                      mentee.menteeId
                                    ).email,
                                    "Mentor email": getMentorByID(
                                      group.mentorId
                                    ).email,
                                  });
                                });
                              });
                              return result;
                            };
                            return (
                              <MenuItem
                                key={index}
                                onClick={() => {
                                  convertToXlsx(
                                    {
                                      groups: matchData.groups.map((group) => {
                                        return {
                                          groupId: group.id,
                                          mentorName: getMentorByID(
                                            group.mentorId
                                          ).fullName,
                                          mentorId: group.mentorId,
                                          numberOfMentees: group.mentees.length,
                                        };
                                      }),
                                      "Group Details": ListAllGroupDetail(
                                        matchData.groups
                                      ),
                                    },
                                    matchData.matchName +
                                      "_" +
                                      new Date().getTime()
                                  );
                                }}
                              >
                                {filter}
                              </MenuItem>
                            );
                          })}
                        </MenuList>
                      </Menu>
                    </Flex>
                  </Flex>

                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th color="scc_blue.100">Mentor name</Th>
                          <Th color="scc_blue.100">Number of mentees</Th>
                          <Th></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {matchData ? (
                          customFilter(matchData.groups).map((group, index) => {
                            return <GroupRow key={index} group={group} />;
                          })
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
                </>
              }
            />
          </Routes>
        </>
      ) : (
        <Loading text={"Loading match data..."} />
      )}
    </div>
  );
};

export default MatchDetail;
