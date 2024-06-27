import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
    tanggal: yup.string().required("Tanggal absensi wajib di isi"),
    status: yup.string(),
    meet: yup.string()
});

export const useAbsensiValidation = () => {
  const initialValues = {
    tanggal: "",
    status: "",
    meet: "Meet 1"
  };

  return useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
    mode: "all",
  });
};
