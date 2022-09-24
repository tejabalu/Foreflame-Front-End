import logo from "../Assets/foreflame_logo.svg";
import { ReactNode } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
  Image,
  Text,
  VStack,
  Circle,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { BsPersonFill } from "react-icons/bs";
import { MdManageAccounts } from "react-icons/md";
import { IoMdSettings, IoMdLogOut } from "react-icons/io";

const Links = ["Documentation", "About"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Box /*TODO: Add hover options*/>
    <Link
      px={4}
      py={2}
      fontWeight={"semibold"}
      rounded={"md"}
      bg={"gray.300"}
      href={"#"}
      _hover={{ textDecoration: "None" }}>
      {children}
    </Link>
  </Box>
);

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"end"}>
          <Image src={logo} w={180} />
        </HStack>
        <HStack alignItems={"center"}>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }} mr={8}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
          <VStack>
            <Text as={"b"} fontSize="20px" mb={-3}>
              John Doe
            </Text>
            <Text as={"b"} fontSize="sm">
              Fire Analyst
            </Text>
          </VStack>
          <Box pl={2}>
            <Menu>
              <MenuButton as={Button} variant={"link"} cursor={"pointer"}>
                <Circle size="40px" bg={"gray.300"}>
                  <BsPersonFill fill={"#021C11"} />
                </Circle>
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <MdManageAccounts width={"100px"} />
                  <Text ml={4}>Account</Text>
                </MenuItem>
                <MenuItem>
                  <IoMdSettings />
                  <Text ml={4}>Preferences</Text>
                </MenuItem>
                <MenuItem>
                  <IoMdLogOut />
                  <Text ml={4}>Logout</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
