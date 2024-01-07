/* eslint-disable react/prop-types */
import {
  Flex,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Image,
} from "@chakra-ui/react";
import DashboardIcon from "../../assets/icons/dashboard_blue.png";
import { useLocation } from "react-router-dom";

const Header = ({ children, title }) => {
  const location = useLocation();
  const filtered = location.pathname?.split("/").filter((item) => item !== "");
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex flexDirection="column" gap={1}>
        <Text
          fontSize="1.8rem"
          textTransform="uppercase"
          color="#000"
          fontWeight="700"
        >
          {title}
        </Text>
        <Breadcrumb fontWeight="medium" fontSize="sm">
          <BreadcrumbItem>
            <BreadcrumbLink
              __css={{ display: "flex", alignItems: "center", gap: 1 }}
              _hover={{ textDecoration: "underline" }}
              color="#0D6EFD"
              href="/dashboard"
            >
              <Image src={DashboardIcon} w="12px" h="12px" alt="dashboard" />
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          {filtered.map((item, index) => (
            <BreadcrumbItem
              key={index}
              isCurrentPage={index === filtered.length - 1}
            >
              {index === filtered.length - 1 ? (
                <BreadcrumbLink textTransform="capitalize">
                  {item.replace(/-/g, " ")}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbLink
                  __css={{ display: "flex", alignItems: "center", gap: 1 }}
                  _hover={{
                    textDecoration: item === "master-data" ? "" : "underline",
                  }}
                  color="#0D6EFD"
                  textTransform="capitalize"
                  href={`${item === "master-data" ? "#" : `/${item}`}`}
                >
                  {item.replace(/-/g, " ")}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </Flex>
      {children}
    </Flex>
  );
};

export default Header;
