import { Divider, Flex, Image } from "@chakra-ui/react";

const Footer = () => {
  return (
    <>
      <Divider py={2} borderColor={"gray.600"} />
      <Flex direction="row" my={2} justifyContent={"space-between"}>
        <Image objectFit={"contain"} h={"16"} src={"../Assets/Footer/GIXFooter.png"} />
        <Image objectFit={"contain"} w={"3xs"} src={"../Assets/Footer/MicrosoftLogo.png"} />
        <Image objectFit={"contain"} w={"2xs"} src={"../Assets/Footer/UWLogo.png"} />
      </Flex>
    </>
  );
};

export default Footer;
