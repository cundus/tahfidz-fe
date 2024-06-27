import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schemaTahunAjaran = yup.object({
  nama_tahun_ajaran: yup.string().required("Harap masukan nilai yang valid"),
  status: yup.boolean()
});

export const useTahunAjaranValidation = () => {
  const intialValues = {
    nama_tahun_ajaran: "",
    status: false
  };

  return useForm({
    defaultValues: intialValues,
    resolver: yupResolver(schemaTahunAjaran),
    mode: "all",
  });
};
