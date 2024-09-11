import React, { ReactElement, ReactNode } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

export const SearchBar = ({ placeholder, onChange }) => {
  return (
    <>
      <InputGroup width={"50%"}>
        <InputLeftElement color="scc_blue.100" pointerEvents="none">
          <FiSearch />
        </InputLeftElement>
        <Input
          type="tel"
          placeholder={placeholder || "Search"}
          onChange={(e) => onChange(e.target.value)}
        />
      </InputGroup>
    </>
  );
};
