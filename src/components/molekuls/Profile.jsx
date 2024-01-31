import { Flex, Avatar, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAuth } from "../../contexts/AuthContext";

// eslint-disable-next-line react/prop-types
const Profile = ({ isShow, setIsShow }) => {
   const auth = useAuth();

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
                  {auth.user?.profile?.nama_lengkap}
               </Text>
               <Text fontSize="12px" color="#000" opacity="0.5">
                  {auth.user?.role[0].toUpperCase() + auth.user?.role.slice(1)}
               </Text>
            </Flex>
            <Avatar
               size="sm"
               name={auth.user?.profile?.nama_lengkap}
               src={auth.user?.profile?.foto}
            />
         </Flex>
      </Flex>
   );
};

export default Profile;
