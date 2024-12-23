import { Avatar, Badge, Input, Link, useDisclosure } from "@chakra-ui/react";
import { removeNullElements } from "../../utils/array";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
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
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { FiHome, FiPackage, FiStar } from "react-icons/fi";
import { currentAge } from "../../utils/time";
import ContactInfo from "../ContactInfo";
import TextLimiter from "../TextLimiter";

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
const OccupationPresent = (occupation) => {
  let order = ["position", "employmentLevel"];
  let occupationList = order.map((key) => {
    if (!occupation[key]) return null;
    return occupation[key];
  });
  return removeNullElements(occupationList).join(" | ");
};

const MentorDetail = ({ mentor }) => {
  const {
    isOpen: isOpenContactInfo,
    onOpen: onOpenContactInfo,
    onClose: onCloseContactInfo,
  } = useDisclosure();

  return (
    <Card w={"100%"} h={"100%"}>
      <Modal onClose={onCloseContactInfo} isOpen={isOpenContactInfo} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contact info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ContactInfo
              {...{
                phoneNumber: mentor.phoneNumber,
                email: mentor.email,
                address: mentor.homeTown,
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseContactInfo}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <CardBody>
        <Stack mt="2" spacing="2">
          <Box overflow={"auto"} maxHeight={"65vh"}>
            <Text color="scc_blue.100" fontSize="2xl" as="b">
              Mentor
            </Text>
            <Heading size="md">{mentor.fullName}</Heading>
            <Box>
              <Text>
                {OccupationPresent(mentor.occupation)}
                {mentor.occupation.companyName &&
                  " at " + mentor.occupation.companyName}
              </Text>
              <Flex gap={"2"}>
                <Text color={"gray"}>
                  {[
                    mentor.currentLocation.district ?? null,
                    mentor.currentLocation.province,
                  ]
                    .filter((item) => item)
                    .join(", ")}
                </Text>
                <Link
                  color={"scc_blue.100"}
                  onClick={() => onOpenContactInfo()}
                >
                  Contact info
                </Link>
              </Flex>
            </Box>
            <Divider />
            <Stack spacing={4} mt={2}>
              <Box maxHeight={"150px"} overflow={"auto"}>
                <Heading
                  size="xs"
                  color={"scc_blue.100"}
                  textTransform="uppercase"
                >
                  Basic information
                </Heading>
                <Flex gap={2} alignContent={"center"}>
                  <Text>Hometown: {mentor.homeTown}</Text>
                </Flex>
                <Flex gap={2} alignContent={"center"}>
                  <Text>Age: {currentAge(mentor.birthYear)} years old</Text>
                </Flex>
                <Flex gap={2} alignItems={"center"}>
                  <Text>Gender: {mentor.gender}</Text>
                </Flex>
              </Box>
            </Stack>
            <Divider />
            <Stack spacing={4} mt={2}>
              <Box maxHeight={"150px"} overflow={"auto"}>
                <Heading
                  color={"scc_blue.100"}
                  size="xs"
                  textTransform="uppercase"
                >
                  Bio
                </Heading>
                <Text pt="2" fontSize="sm">
                  {/* If selfIntroduction is longer than 100 chars */}
                  <TextLimiter
                    text={mentor?.bio?.selfIntroduction || ""}
                    limit={100}
                  />
                </Text>
              </Box>
            </Stack>
            <Divider />
            <Stack spacing={4} mt={2}>
              <Box maxHeight={"150px"} overflow={"auto"}>
                <Heading
                  color={"scc_blue.100"}
                  size="xs"
                  textTransform="uppercase"
                >
                  Mentoring
                </Heading>

                <Flex alignItems={"center"} gap={2}>
                  <Text>Soft skills:</Text>
                  <Flex gap={2} flexWrap={"wrap"}>
                    {mentor.mentor.softSkills.map((industry) => (
                      <Badge key={industry} colorScheme="green">
                        {industry}
                      </Badge>
                    ))}
                  </Flex>
                </Flex>

                <Flex alignItems={"center"} gap={2}>
                  <Text>Industries:</Text>
                  <Flex gap={2} flexWrap={"wrap"}>
                    {mentor.mentor.industries.map((industry) => (
                      <Badge key={industry} colorScheme="blue">
                        {industry}
                      </Badge>
                    ))}
                  </Flex>
                </Flex>
              </Box>
            </Stack>
            <Divider />
            <Stack spacing={4} mt={2}>
              <Box maxHeight={"150px"} overflow={"auto"}>
                <Heading
                  color={"scc_blue.100"}
                  size="xs"
                  textTransform="uppercase"
                >
                  PREFER MENTEE
                </Heading>
              </Box>

              <Box alignItems={"center"} gap={2}>
                <Text>Gender: {mentor.mentor.preferredMenteeGender}</Text>
                <Text>
                  College Year: {mentor.mentor.preferredMenteeCollegeYear}
                </Text>
                <Text>
                  Number of Mentees: {mentor.mentor.preferredNumberOfMentees}
                </Text>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default MentorDetail;
