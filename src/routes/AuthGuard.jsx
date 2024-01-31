/* eslint-disable react/prop-types */

import SideNavs from "../components/molekuls/SideNavs";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import Profile from "../components/molekuls/Profile";
import { useState } from "react";

export function ProtectedPage({ children }) {
   let auth = useAuth();
   let location = useLocation();

   const [isShow, setIsShow] = useState(true);

   console.log("auth", auth);

   if (auth.user === null) {
      return <Navigate to="/login" state={{ from: location }} replace />;
   }

   return (
      <Flex>
         <SideNavs isShow={isShow} setIsShow={setIsShow} />
         <Flex
            flexDirection="column"
            marginLeft={isShow ? "18rem" : "16rem"}
            w={isShow ? "calc(100% - 18rem)" : "calc(100% - 16rem)"}
            maxW="100%"
         >
            <Profile isShow={isShow} setIsShow={setIsShow} />
            <Box
               paddingLeft={8}
               paddingY={10}
               paddingRight={16}
               overflowY="auto"
            >
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
