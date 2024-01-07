/* eslint-disable react/prop-types */

import SideNavs from "../components/molekuls/SideNavs";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import Profile from "../components/molekuls/Profile";

export function ProtectedPage({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <Flex>
      <SideNavs />
      <Flex flexDirection="column" w="100%" maxW="100%">
        <Profile />
        <Box paddingLeft={8} paddingY={10} paddingRight={16}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}

export function UnProtectedPage({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (auth.user) {
    // back to previous page
    return <Navigate to={location.state?.from || "/"} replace />;
  }

  return children;
}
