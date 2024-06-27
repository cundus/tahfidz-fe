import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
   username: yup.string().required("Username wajib diisi!"),
   password: yup.string().required("Password wajib diisi!"),
   role: yup.string().required("Role wajib diisi!"),
});

export const useLoginValidation = () => {
   const initialValues = {
      username: "",
      password: "",
      role: "",
   };

   return useForm({
      defaultValues: initialValues,
      resolver: yupResolver(schema),
      mode: "all",
   });
};
