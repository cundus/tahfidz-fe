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
   let [user, setUser] = useState({
      username: "john_doe3",
      password: "secure_password3",
      role: "siswa",
      profile: {
         nama_lengkap: "John Doe234",
         alamat: "123 Main Street2",
         email: "john.doe@example.com2",
         jenis_kelamin: "male2",
         nomor_induk: "1234562",
         nomor_telepon: "123-456-78902",
         posisi: "Student",
         tanggal_bergabung: "2022-01-01",
         tanggal_lahir: "1990-01-01",
         tempat_lahir: "City",
         foto: "base64_encoded_image", // replace with the actual base64 encoded image data
         status: true,
         nama_ayah: "John Doe Sr.",
         nama_ibu: "Jane Doe",
         nomor_telepon_ayah: "123-456-7891",
         nomor_telepon_ibu: "123-456-7892",
         pekerjaan_ayah: "Engineer",
         pekerjaan_ibu: "Teacher",
      },
   });

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
      // checkingAuth();
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
