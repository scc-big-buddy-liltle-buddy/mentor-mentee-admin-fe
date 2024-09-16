import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { FiMail, FiMap, FiPhone } from "react-icons/fi";

const ContactInfo = ({ phoneNumber, email, address }) => {
  return (
    <Box>
      {[
        {
          label: "Phone",
          value: phoneNumber,
          icon: <FiPhone />,
        },
        {
          label: "Email",
          value: email,
          icon: <FiMail />,
        },
        {
          label: "Address",
          value: address,
          icon: <FiMap />,
        },
      ].map(({ label, value, icon }) => {
        return (
          <Flex key={label} mb={2} alignItems={"center"} gap={4}>
            <Box color={"scc_blue.100"} fontSize={"2xl"}>
              {icon}
            </Box>
            <Text ml={2}>
              <Text color="gray">{label}</Text> {value}
            </Text>
          </Flex>
        );
      })}
    </Box>
  );
};

export default ContactInfo;
