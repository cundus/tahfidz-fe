import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  tanggal: yup.string().required("Tanggal wajib di isi"),
  juz: yup.string().required("Juz wajib di isi"),
  kesalahan_hafalan: yup.number().nullable(),
  kesalahan_tajwid: yup.number().nullable(),
  keterangan:yup.object().required("Keterangan wajib di isi"),
  nilai_hafalan: yup.number().nullable(),
  nilai_tajwid: yup.number().nullable(),
  total_nilai: yup.number().nullable(),
  penguji: yup.object().required("Penguji wajib di isi"),
});

export const useUjianValidation = () => {
  const initialValues = {
    tanggal: "",
    juz: "",
    kesalahan_hafalan: 0,
    kesalahan_tajwid: 0,
    keterangan: null,
    nilai_hafalan: 0,
    nilai_tajwid: 0,
    total_nilai: 0,
    penguji: null,
  };

  return useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
    mode: "all",
  });
};
