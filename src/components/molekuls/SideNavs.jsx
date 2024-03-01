/* eslint-disable react/prop-types */
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import DashboardIcon from "../../assets/icons/dashboard.png";
import HafalanIcon from "../../assets/icons/hafalan.png";
import HalaqohIcon from "../../assets/icons/halaqoh.png";
import MasterDataIcon from "../../assets/icons/master-data.png";
import UjianHafalanIcon from "../../assets/icons/ujian_hafalan.png";
import UjianHafalanWhite from "../../assets/icons/ujian_hafalan_white.png";
import Logo from "../../assets/logo.png";
import LogoNoText from "../../assets/logo_notext.png";
import { nav } from "../../constans/nav";
import UjianHafalanWhite from "../../assets/icons/ujian_hafalan_white.png";
import RaportTahfidzWhite from "../../assets/icons/rapor_tahfidz_white.png";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { AccessControl } from "../../utils/accessControl";
import { SideNavWithArrow } from "../atoms/SideNav";

const SideNavs = ({ isShow }) => {
   const auth = useAuth();

   return (
      <>
         <Box
            maxW="18rem"
            h="100vh"
            overflowY="auto"
            overflowX="hidden"
            paddingX={8}
            paddingY="24px"
            __css={{
               backgroundColor: "#F8F9FA",
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
            }}
            position="fixed"
         >
            {/* Hamburger */}

            <Image
               objectFit="cover"
               width={isShow ? "100%" : "6rem"}
               marginBottom="1rem"
               src={!isShow ? LogoNoText : Logo}
               alt="logo"
            />
            <Flex w="100%" flexDirection="column">
               <Link
                  w="100%"
                  as={RouterLink}
                  to="/dashboard"
                  padding={2}
                  _hover={{ textDecoration: "none" }}
               >
                  <Flex alignItems="center" gap={2}>
                     <Image
                        src={DashboardIcon}
                        w="16px"
                        h="16px"
                        alt="dashboard"
                     />
                     <Text fontSize="15px" textAlign="left" opacity="0.5">
                        Dashboard
                     </Text>
                  </Flex>
               </Link>

               {/* Master Data */}
               <AccessControl
                  allowedRoles={["admin", "operator"]}
                  currentRole={auth.user.role}
               >
                  <Text
                     padding={2}
                     textAlign="left"
                     fontSize="12px"
                     opacity="0.5"
                  >
                     MASTER
                  </Text>
                  <SideNavWithArrow
                     icon={MasterDataIcon}
                     title="Master Data"
                     listNav={nav.masterData}
                  />
               </AccessControl>

               {/* Halaqoh */}
               <AccessControl
                  allowedRoles={["admin", "guru", "siswa"]}
                  currentRole={auth.user.role}
               >
                  <Text
                     padding={2}
                     textAlign="left"
                     fontSize="12px"
                     opacity="0.5"
                  >
                     MANAJEMEN HALAQOH
                  </Text>
                  <SideNavWithArrow
                     icon={HalaqohIcon}
                     title="Halaqoh"
                     listNav={nav.halaqoh}
                  />

                  {/* KBM */}
                  <Text
                     padding={2}
                     textAlign="left"
                     fontSize="12px"
                     opacity="0.5"
                  >
                     MANAJEMEN KBM/TASMI’
                  </Text>
                  <SideNavWithArrow
                     icon={HafalanIcon}
                     title="Hafalan"
                     listNav={nav.hafalan}
                  />
                  <SideNavWithArrow
                     singleLink
                     icon={UjianHafalanIcon}
                     title="Ujian Hafalan"
                     singleLinkTo={nav.ujian_hafalan}
                     IconSingle={UjianHafalanWhite}
                  />
               </AccessControl>
               {/*  MANAJEMEN REKAPITULASI DATAM */}
               {/* <Text padding={2} textAlign="left" fontSize="12px" opacity="0.5">
                  MANAJEMEN REKAPITULASI DATA
               </Text>
               <SideNavWithArrow
                  singleLink
                  IconSingle={RaportTahfidzWhite}
                  icon={RaporHafalanIcon}
                  title="Rapor Tahfidz"
                  singleLinkTo={nav.rapor_tahfidz}
               /> */}
            </Flex>
         </Box>
      </>
   );
};

export default SideNavs;
