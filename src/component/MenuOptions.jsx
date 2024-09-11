import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { FiChevronDown } from "react-icons/fi";

const MenuOptions = ({ options, onChange, title }) => {
  const handleSelect = (option) => {
    onChange(option);
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} colorScheme="blue">
        {title}
      </MenuButton>
      <MenuList minWidth="240px">
        {options.map((option, index) => (
          <>
            <MenuOptionGroup
              onChange={(value) => onChange(value)}
              defaultValue="asc"
              title={option.group}
              type="radio"
            >
              {option.options.map((opt, index) => (
                <MenuItemOption key={index} value={opt.value}>
                  {opt.label}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
            <MenuDivider />
          </>
        ))}
      </MenuList>
    </Menu>
  );
};

export default MenuOptions;
