import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Circle,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useContext } from "react";
import { BsPersonFill } from "react-icons/bs";
import { IoMdLogOut, IoMdSettings } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { UserContext } from "../LoginContext";

const Links = [
  ["Documentation", "https://github.com/tejabalu/Foreflame-Front-End"],
  ["About", "/#about"],
];

const NavLink = ({ children }: { children: string[] }) => (
  <Box /*TODO: Add hover options*/>
    <Link as={NextLink} px={4} py={2} fontWeight={"semibold"} rounded={"md"} bg={"gray.200"} href={children[1]} _hover={{ textDecoration: "None" }}>
      {children[0]}
    </Link>
  </Box>
);

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout } = useContext(UserContext);

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
          <NextLink href="/" passHref>
            <Image src={"../Assets/foreflame_logo.svg"} w={180} />
          </NextLink>
        </HStack>
        <HStack alignItems={"center"}>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }} mr={8}>
            {Links.map((link) => (
              <NavLink key={link[0]}>
                {link[0]}
                {link[1]}
              </NavLink>
            ))}
          </HStack>
          {user && (
            <VStack>
              <Text as={"b"} fontSize="20px" mb={-3}>
                {user.displayName}
              </Text>
              <Text as={"b"} fontSize="sm">
                Fire Analyst
              </Text>
            </VStack>
          )}
          <Box pl={2}>
            <Menu>
              <MenuButton as={Button} variant={"link"} cursor={"pointer"}>
                <Circle size="40px" bg={"gray.300"}>
                  <BsPersonFill fill={"#021C11"} />
                </Circle>
              </MenuButton>
              {user && (
                <MenuList>
                  <MenuItem>
                    <MdManageAccounts width={"100px"} />
                    <Text ml={4}>Account</Text>
                  </MenuItem>
                  <MenuItem>
                    <IoMdSettings />
                    <Text ml={4}>Preferences</Text>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logout();
                    }}>
                    <IoMdLogOut />
                    <Text ml={4}>Logout</Text>
                  </MenuItem>
                </MenuList>
              )}
            </Menu>
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
}
