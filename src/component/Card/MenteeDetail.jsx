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

const OccupationPresent = (occupation) => {
  let order = ["position", "employmentLevel"];
  let occupationList = order.map((key) => {
    if (!occupation[key]) return null;
    return occupation[key];
  });
  return removeNullElements(occupationList).join(" | ");
};

const MenteeDetail = ({
  selectedMentee: { menteeData: mentee, matchRate },
}) => {
  const {
    isOpen: isOpenContactInfo,
    onOpen: onOpenContactInfo,
    onClose: onCloseContactInfo,
  } = useDisclosure();

  return (
    mentee && (
      <Card w={"100%"} h={"100%"}>
        <Modal
          onClose={onCloseContactInfo}
          isOpen={isOpenContactInfo}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Contact info</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ContactInfo
                {...{
                  phoneNumber: mentee.phoneNumber,
                  email: mentee.email,
                  address: mentee.homeTown,
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onCloseContactInfo}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <CardBody overflow={"auto"} maxHeight={"60vh"}>
          <Stack mt="2" spacing="2">
            <Box overflow={"auto"} maxHeight={"65vh"}>
              <Text color="scc_blue.100" fontSize="2xl" as="b">
                Mentee
              </Text>
              <Heading size="md">{mentee.fullName}</Heading>
              <Text color="green.500" fontSize="sm" as="b">
                Match rate: {matchRate}0%
              </Text>
            </Box>
            <Box>
              <Text>
                {OccupationPresent(mentee.occupation)}
                {mentee.occupation.companyName &&
                  " at " + mentee.occupation.companyName}
              </Text>
              <Flex gap={"2"}>
                <Text color={"gray"}>
                  {[
                    mentee.currentLocation.district ?? null,
                    mentee.currentLocation.province,
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
                  <Text>Hometown: {mentee.homeTown}</Text>
                </Flex>
                <Flex gap={2} alignContent={"center"}>
                  <Text>Age: {currentAge(mentee.birthYear)} years old</Text>
                </Flex>
                <Flex gap={2} alignItems={"center"}>
                  <Text>Gender: {mentee.gender}</Text>
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
                  Education
                </Heading>
                <Flex gap={2} alignContent={"center"}>
                  <Text>
                    University/School: {mentee.education.currentSchool}
                  </Text>
                </Flex>
                <Flex gap={2} alignContent={"center"}>
                  <Text>Major: {mentee.education.major}</Text>
                </Flex>
                <Flex gap={2} alignContent={"center"}>
                  <Text>GPA: {mentee.education.latestGPA}</Text>
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
                  <TextLimiter text={mentee.bio.selfIntroduction} limit={100} />
                </Text>
                <Flex alignItems={"center"} gap={2}>
                  <Text>Hobbies:</Text>
                  <Flex gap={2} flexWrap={"wrap"}>
                    {mentee.bio.hobbies.map((hobby) => (
                      <Badge key={hobby} colorScheme="green">
                        {hobby}
                      </Badge>
                    ))}
                  </Flex>
                </Flex>

                <Flex gap={2}>
                  Quote: <Text as="i">{mentee.bio.favoriteQuote}</Text>
                </Flex>

                <Flex gap={2}>
                  Book: <Text as="i">{mentee.bio.favoriteBook}</Text>
                </Flex>
                <Flex gap={2}>
                  Movie: <Text as="i">{mentee.bio.favoriteMovie}</Text>
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
                  Mentee details
                </Heading>

                <Flex alignItems={"center"} gap={2}>
                  <Text>Soft skills:</Text>
                  <Flex gap={2} flexWrap={"wrap"}>
                    {mentee.mentee.softSkills.map((industry) => (
                      <Badge key={industry} colorScheme="green">
                        {industry}
                      </Badge>
                    ))}
                  </Flex>
                </Flex>

                <Flex alignItems={"center"} gap={2}>
                  <Text>Industries:</Text>
                  <Flex gap={2} flexWrap={"wrap"}>
                    {mentee.mentee.industries.map((industry) => (
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
                <Text>Gender: {mentee.mentee.preferredMentorGender}</Text>
              </Box>
            </Stack>
          </Stack>
        </CardBody>
      </Card>
    )
  );
};

export default MenteeDetail;
