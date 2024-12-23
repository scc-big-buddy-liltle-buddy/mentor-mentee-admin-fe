import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { matchByFile } from "../api/match";
import { useNavigate } from "react-router-dom";
import { useMatchStore } from "../store/match";

const NewMatch = () => {
  const [matchName, setMatchName] = useState("");
  const [file, setFile] = useState(null);
  const { isOpen, onOpen, onClose: closeBox } = useDisclosure();
  const toast = useToast();

  let loadMatchData = useMatchStore((state) => state.loadMatchData);
  const navigate = useNavigate();
  const onClose = () => {
    closeBox();
    loadMatchData();
    navigate("/match");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await matchByFile(file, matchName);

      if (response.ok) {
        toast({
          title: "Success",
          description: "Match created successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onOpen();
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating the match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <FormControl id="matchName" isRequired>
          <FormLabel>Match Name</FormLabel>
          <Input
            type="text"
            value={matchName}
            onChange={(e) => setMatchName(e.target.value)}
          />
        </FormControl>
        <FormControl id="file" isRequired mt={4}>
          <FormLabel>Upload File</FormLabel>
          <div style={{ marginTop: "10px" }}>
            <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Create Match
        </Button>
      </form>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success</ModalHeader>
          <ModalCloseButton />
          <ModalBody>The match has been created successfully!</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default NewMatch;
