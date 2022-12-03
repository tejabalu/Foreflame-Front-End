import { Divider, Flex, HStack, Link, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import UserAuth from "./Components/UserAuth";
import Footer from "./Footer";
import HeroContent from "./HeroContent";

const TextContent = (e: any) => <Text py={3}>{e.children}</Text>;

const HomePage = () => {
  return (
    <>
      <Flex direction="column" align={"center"}>
        <Flex
          w="100%"
          mt={4}
          minH={"85vh"}
          backgroundImage={"../Assets/fireImage.jpg"}
          backgroundSize="cover"
          backgroundRepeat={"no-repeat"}
          backgroundBlendMode={"overlay"}
          backgroundPosition={"center center"}
          rounded="lg">
          <Flex w="100%" alignItems={"center"} justifyContent={"space-evenly"}>
            <UserAuth />
            <HeroContent />
          </Flex>
        </Flex>
        <Flex my="16" direction="column" maxW={"4xl"}>
          <Text id="about" fontSize={"4xl"} py={2}>
            About ForeFlame
          </Text>
          <TextContent>
            We are a team of University of Washington graduate students (Global Innovation Exchange) driven to understand the behavior of Wildfires.
            This project is being sponsored by <b>Microsoft</b> and supported by <b>Department of Natural Resources</b>.
          </TextContent>
          <TextContent>
            Our Vision is to Provide a fire management tool to predict the probability of wildfire occurrence and provide a comprehensive data source
            for fire analysts to make informed tactical decisions.
          </TextContent>
          <TextContent>
            Given the complexity of gathering and analyzing data for accreditation and the growing sophistication of technology systems available to
            fire departments, ForeFlame believes a standard visualization for fire analysts is an important next step in mitigating Wildfires.
          </TextContent>
          <Text fontSize={"3xl"} py={2}>
            How it works
          </Text>
          <TextContent>
            ForeFlame uses various data aggregation techniques and machine learning methods to provide the possibility of occurrence of wildfires.
            There are three main components in how it works:
          </TextContent>
          <Text fontSize={"2xl"} py={1}>
            Data Sources and Processing
          </Text>{" "}
          <TextContent>The following are the different data sets currently being used to train and infer from machine learning model.</TextContent>
          <UnorderedList>
            <ListItem>
              Weather data from{" "}
              <Link href="https://www.ncdc.noaa.gov/cdo-web/datasets" color={"green"}>
                NOAA
              </Link>
              .
            </ListItem>
            <ListItem>
              NDVI (Normalized difference vegetation index) from{" "}
              <Link color={"green"} href="https://modis.gsfc.nasa.gov/">
                MODIS
              </Link>
            </ListItem>

            <ListItem>
              Wildfire fuel data from{" "}
              <Link color="green" href="https://landfire.gov/</ListItem>">
                LANDFIRE
              </Link>
              .
            </ListItem>
          </UnorderedList>
          <HStack></HStack>
          <Text fontSize={"2xl"} py={1}>
            Machine Learning
          </Text>
          <TextContent>
            From the datasets above, a DNN model is used to predict the probability of occurrence of wildfires, with another KNN model trained with
            NDVI datasets which acts as a mask to the existing predictions. The machine learning model itself is run in Azure VM using{" "}
            <Link color="green" href="https://github.com/microsoft/farmvibes-ai">
              FarmVibes
            </Link>{" "}
            workflows.
          </TextContent>
          <Text fontSize={"2xl"} py={1}>
            Visualization
          </Text>
          <TextContent>
            The data is displayed through the{" "}
            <Link color="green" href="https://www.foreflame.com/dashboard">
              Webapp
            </Link>{" "}
            built using NextJS and mapping tools from MapBox.
          </TextContent>
          <Divider borderColor="gray.600" my={4} />
          <TextContent>
            ForeFlame is designed for fire analysts to monitor wildfire risks and occurrence that can help users do the wildfire prediction analysis.
            Compared to the existing solutions, ForeFlame aims to integrate more comprehensive datasets to provide the high-accuracy predictions of
            fire occurrence probability. Designed by incorporating real-time feedback from fire-analysts from DNR, and with ML models run using
            FarmVibes, it also provides an intuitive interface with high responsiveness.
          </TextContent>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
};

export default HomePage;
