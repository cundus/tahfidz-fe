import { Flex, Avatar, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

// eslint-disable-next-line react/prop-types
const Profile = ({ isShow, setIsShow }) => {
  return (
    <Flex
      w="100%"
      boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.08)"
      justifyContent="space-between"
      paddingY={4}
      paddingRight={16}
      paddingLeft={8}
      alignItems="center"
      gap={3}
    >
      <HamburgerIcon
        w={6}
        h={6}
        color="#212529"
        cursor="pointer"
        onClick={() => setIsShow(!isShow)}
      />
      <Flex alignItems="center" gap={3}>
        <Flex flexDirection="column">
          <Text fontSize="14px" color="#212529" fontWeight="bold">
            Reza Hidayat
          </Text>
          <Text fontSize="12px" color="#000" opacity="0.5">
            Admin
          </Text>
        </Flex>
        <Avatar
          size="sm"
          name="Rizki Ashari"
          src="https://bit.ly/dan-abramov"
        />
      </Flex>
    </Flex>
  );
};

export default Profile;
