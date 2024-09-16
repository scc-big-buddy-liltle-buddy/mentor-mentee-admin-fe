import {
  Button,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import MenteeDetail from "./MenteeDetail";
const MenteeList = ({ mentees }) => {
  const [menteeList, setMenteeList] = React.useState(mentees);

  const sortMenteeList = (sortType) => {
    let sortedMenteeList = menteeList.sort((a, b) => {
      switch (sortType) {
        case "mr_dec":
          return b.matchRate - a.matchRate;
        case "mr_inc":
          return a.matchRate - b.matchRate;
        case "mt_name_dec":
          return b.menteeName.localeCompare(a.menteeName);
        case "mt_name_inc":
          return a.menteeName.localeCompare(b.menteeName);
        default:
          return 0;
      }
    });

    setMenteeList([...sortedMenteeList]);
  };

  const {
    isOpen: isOpenModalMenteeDetail,
    onOpen: onOpenMenteeDetail,
    onClose: onCloseMenteeDetail,
  } = useDisclosure();
  const {
    isOpen: isOpenChangeGroup,
    onOpen: onOpenChangeGroup,
    onClose: onCloseChangeGroup,
  } = useDisclosure();
  const navigate = useNavigate();
  const [selectedMentee, setSelectedMentee] = React.useState(null);
  return (
    <>
      <Modal
        isCentered
        size={"2xl"}
        isOpen={isOpenModalMenteeDetail}
        onClose={onCloseMenteeDetail}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mentee Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MenteeDetail selectedMentee={selectedMentee} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="" onClick={onCloseMenteeDetail}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isCentered isOpen={isOpenChangeGroup} onClose={onCloseChangeGroup}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseChangeGroup}>
              Change
            </Button>
            <Button colorScheme="yellow" onClick={onCloseChangeGroup}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Menu>
        <Menu>
          <MenuButton as={Button} colorScheme="blue">
            Sort by
          </MenuButton>
          <MenuList>
            <MenuGroup title="Match rate">
              <MenuItem onClick={() => sortMenteeList("mr_dec")}>
                Decreasing
              </MenuItem>
              <MenuItem onClick={() => sortMenteeList("mr_inc")}>
                Increasing
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Mentee name">
              <MenuItem onClick={() => sortMenteeList("mt_name_dec")}>
                Decreasing
              </MenuItem>
              <MenuItem onClick={() => sortMenteeList("mt_name_inc")}>
                Increasing
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Menu>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color="scc_blue.100">Mentee name</Th>
              <Th color="scc_blue.100">Match rate</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {menteeList.map((mentee, index) => (
              <Tr key={index}>
                <Td>{mentee.menteeName}</Td>
                <Td>{mentee.matchRate}</Td>
                <Td>
                  <ButtonGroup>
                    <Button
                      color={"scc_blue.100"}
                      onClick={() => {
                        setSelectedMentee(mentee);
                        onOpenMenteeDetail();
                      }}
                    >
                      Detail
                    </Button>
                    <Button
                      color={"yellow.400"}
                      onClick={() => {
                        onOpenChangeGroup();
                      }}
                    >
                      Change group
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MenteeList;
