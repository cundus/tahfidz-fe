/* eslint-disable react/prop-types */
import ArrowLeft from "../../assets/icons/arrow_left.png";
import { Image, Text, Flex, Box, Collapse } from "@chakra-ui/react";
import ArrowDown from "../../assets/icons/arrow_down.png";
import { useDisclosure } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const SideNavWithArrow = ({
   icon,
   title,
   listNav, 
   singleLinkTo,
   IconSingle,
}) => {
   const { isOpen, onToggle } = useDisclosure();
   const auth = useAuth();
   const location = useLocation();
   const router = useNavigate();
   return (
      <>
         {!singleLinkTo ? (
            <>
               <Flex
                  padding={2}
                  alignItems="center"
                  justifyContent="space-between"
               >
                  <Flex alignItems="center" gap={2}>
                     <Image src={icon} w="16px" h="16px" alt="master data" />
                     <Text textAlign="left" fontSize="15px" opacity="0.5">
                        {title}
                     </Text>
                  </Flex>

                  <Image
                     cursor="pointer"
                     onClick={onToggle}
                     src={isOpen ? ArrowDown : ArrowLeft}
                     w="16px"
                     h="16px"
                     alt="arrow_down"
                  />
               </Flex>
               <Collapse in={isOpen} animateOpacity>
                  <Flex gap={1} flexDirection="column" marginBottom={1}>
                     {listNav?.map((item, idx) =>
                        item.label.toLowerCase().includes("operator") &&
                        auth.user.role === "operator" ? null : (
                           <Box
                              w="100%"
                              key={idx}
                              _hover={{ textDecoration: "none" }}
                              padding={2}
                              onClick={() => router(item.to)}
                              cursor="pointer"
                              backgroundColor={
                                 location.pathname.includes(item.to)
                                    ? "#343A40"
                                    : "transparent"
                              }
                              color={
                                 location.pathname.includes(item.to)
                                    ? "#fff"
                                    : "#343A40"
                              }
                              opacity={
                                 location.pathname.includes(item.to)
                                    ? "1"
                                    : "0.5"
                              }
                           >
                              <Flex alignItems="center" gap={2}>
                                 <Box
                                    __css={{
                                       borderRadius: "100%",
                                       border: location.pathname.includes(
                                          item.to
                                       )
                                          ? "1px solid #fff"
                                          : "1px solid #343A40",
                                    }}
                                    w="6px"
                                    h="6px"
                                    marginLeft={10}
                                 />
                                 <Text fontSize="14px">{item.label}</Text>
                              </Flex>
                           </Box>
                        )
                     )}
                  </Flex>
               </Collapse>
            </>
         ) : (
            <>
               <Flex
                  backgroundColor={
                     location.pathname.includes(singleLinkTo)
                        ? "#343A40"
                        : "transparent"
                  }
                  color={
                     location.pathname.includes(singleLinkTo)
                        ? "#F8F9FA"
                        : "#343A40"
                  }
                  cursor="pointer"
                  padding={2}
                  alignItems="center"
                  gap={2}
                  onClick={() => router(singleLinkTo)}
                  opacity={
                     location.pathname.includes(singleLinkTo) ? "1" : "0.5"
                  }
               >
                  <Image
                     src={
                        location.pathname.includes(singleLinkTo)
                           ? IconSingle
                           : icon
                     }
                     w="16px"
                     h="16px"
                     alt="master data"
                  />
                  <Text textAlign="left" fontSize="15px">
                     {title}
                  </Text>
               </Flex>
            </>
         )}
      </>
   );
};
