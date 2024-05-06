/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { fakeAuthProvider } from "../utils/auth";
import { checkAuth } from "../lib/api/auth";

export const AuthContext = createContext(null);
 
export const useAuth = () => {
   const context = useContext(AuthContext);
   if (context === undefined) {
      throw new Error("useAuth must be used within a AuthProvider");
   }
   return context;
};

export function AuthProvider({ children }) {
   let [user, setUser] = useState(null);

   const checkingAuth = async () => {
      try {
         const token = localStorage.getItem("token");
         console.log("token", token);
         if (!token) {
            return signout(() => {});
         }

         const res = await checkAuth();
         setUser(res.user);
      } catch (error) {
         console.log(error);

         localStorage.removeItem("token");
         return signout(() => {});
      }
   };

   useEffect(() => {
      checkingAuth();
   }, []);

   let signin = (newUser, callback) => {
      return fakeAuthProvider.signin(() => {
         setUser(newUser);
         callback();
      });
   };

   let signout = (callback) => {
      return fakeAuthProvider.signout(() => {
         setUser(null);
         callback();
      });
   };

   let value = { user, signin, signout };

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
