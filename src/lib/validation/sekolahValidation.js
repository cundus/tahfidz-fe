import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  nama_sekolah: yup.string(),
  nomor_telepon: yup.number().required("Nomor Telepon wajib diisi!"),
  email: yup.string(),
  website: yup.string(), 
  alamat: yup.string(),
  logo:yup.mixed()
});
 
export const useSekolahValidation = () => {
  const initialValues = {
    nama_sekolah: "",
    nomor_telepon: null,
    email: "",
    website: "",
    alamat: "",
    logo: null
  };

  return useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
    mode: "all",
  });
};
