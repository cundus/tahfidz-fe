import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  baris: yup.string().required("Baris hafalan wajib di isi"),
  ayat_awal: yup.string().required("Ayat awal wajib di isi"),
  ayat_akhir: yup.string().required("Ayat akhir wajib di isi"),
  surat_awal: yup.object().required("Surat awal harus dipilih"),
  surat_akhir: yup.object().required("SUrat akhir harus dipilih"),
  nilai_hafalan: yup.string().required("Nilai hafalan wajib di isi"),
  nilai_tajwid: yup.string().required("Nilai tajwid wajib di isi"),
  tanggal: yup.string().required("Tanggal wajib di isi"),
});

export const useHafalanValidation = () => {
  const initialValues = {
    baris: "",
    ayat_awal: "",
    ayat_akhir: "",
    surat_awal: "",
    surat_akhir: "",
    nilai_hafalan: "",
    nilai_tajwid: "",
    tanggal: ""
  };

  return useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
    mode: "all",
  });
};
