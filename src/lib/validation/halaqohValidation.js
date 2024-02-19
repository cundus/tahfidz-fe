import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
   nama_halaqoh: yup.string().required("Nama halaqah wajib di isi "),
   tahun_ajaran: yup.object().required('Tahun ajaran harus dipilih'),
   guruId: yup.object().required('Nama guru harus dipilih'),
   siswaIds: yup.array().of(yup.object()).required("Siswa wajib di isi"),
   status: yup.boolean(),
});

export const useHalaqohValidation = () => {
   const initialValues = {
      nama_halaqoh: "",
      tahun_ajaran: null,
      guruId: null,
      siswaIds: null,
      status: false,
   };

   return useForm({
      defaultValues: initialValues,
      resolver: yupResolver(schema),
      mode: "all",
   });
};
