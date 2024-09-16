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

const MenuOptions = ({
  parent,
  options,
  onChange,
  title,
  customColorScheme = "blue",
}) => {
  const handleSelect = (option) => {
    onChange(option);
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} colorScheme={customColorScheme}>
        {title}
      </MenuButton>
      <MenuList minWidth="240px">
        {options.map((option, index) => (
          <>
            <MenuOptionGroup
              key={`${parent}_${index}_group`}
              onChange={(value) => onChange(value)}
              defaultValue="asc"
              title={option.group}
              type="radio"
            >
              {option.options.map((opt, index) => (
                <MenuItemOption key={`${parent}_${index}`} value={opt.value}>
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
