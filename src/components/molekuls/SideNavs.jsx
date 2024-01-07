import { Box, Image, Link, Text, Flex } from "@chakra-ui/react";
import Logo from "../../assets/logo.png";
import LogoNoText from "../../assets/logo_notext.png";
import { useState } from "react";
import DashboardIcon from "../../assets/icons/dashboard.png";
import MasterDataIcon from "../../assets/icons/master-data.png";
import HalaqohIcon from "../../assets/icons/halaqoh.png";
import HafalanIcon from "../../assets/icons/hafalan.png";
import UjianHafalanIcon from "../../assets/icons/ujian_hafalan.png";
import RaporHafalanIcon from "../../assets/icons/rapor_tahfidz.png";
import { SideNavWithArrow } from "../atoms/SideNav";
import { nav } from "../../constans/nav";
import { HamburgerIcon } from "@chakra-ui/icons";

const SideNavs = () => {
  const [isShow, setIsShow] = useState(true);

  return (
    <Box
      maxW="18rem"
      h="100vh"
      overflowY="auto"
      paddingX={8}
      paddingY="24px"
      __css={{
        backgroundColor: "#F8F9FA",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Hamburger */}
      <HamburgerIcon
        __css={{
          position: "absolute",
          top: "1.5rem",
          left: !isShow ? "16.8rem" : "20rem",
          cursor: "pointer",
        }}
        w={6}
        h={6}
        color="#212529"
        onClick={() => setIsShow(!isShow)}
      />

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
          href="/dashboard"
          padding={2}
          _hover={{ textDecoration: "none" }}
        >
          <Flex alignItems="center" gap={2}>
            <Image src={DashboardIcon} w="16px" h="16px" alt="dashboard" />
            <Text fontSize="15px" textAlign="left" opacity="0.5">
              Dashboard
            </Text>
          </Flex>
        </Link>

        {/* Master Data */}
        <Text padding={2} textAlign="left" fontSize="12px" opacity="0.5">
          MASTER
        </Text>
        <SideNavWithArrow
          icon={MasterDataIcon}
          title="Master Data"
          listNav={nav.masterData}
        />

        {/* Halaqoh */}
        <Text padding={2} textAlign="left" fontSize="12px" opacity="0.5">
          MANAJEMEN HALAQOH
        </Text>
        <SideNavWithArrow
          icon={HalaqohIcon}
          title="Halaqoh"
          listNav={nav.halaqoh}
        />

        {/* KBM */}
        <Text padding={2} textAlign="left" fontSize="12px" opacity="0.5">
          MANAJEMEN KBM/TASMI’
        </Text>
        <SideNavWithArrow icon={HafalanIcon} title="Hafalan" />
        <SideNavWithArrow icon={UjianHafalanIcon} title="Ujian Hafalan" />

        {/*  MANAJEMEN REKAPITULASI DATAM */}
        <Text padding={2} textAlign="left" fontSize="12px" opacity="0.5">
          MANAJEMEN REKAPITULASI DATA
        </Text>
        <SideNavWithArrow icon={RaporHafalanIcon} title="Rapor Tahfidz" />
      </Flex>
    </Box>
  );
};

export default SideNavs;
