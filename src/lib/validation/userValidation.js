import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const useSiswaValidation = (mode) => {
   const schemaSiswa = yup.object({
      nama_lengkap: yup.string().required("Harap masukan nilai yang valid"),
      username: yup.string().required("Harap masukan nilai yang valid"),
      password: yup.string(),
      konfirmasi_password: yup.string(),
      nomor_induk: yup.string().required("NIS hanya boleh berisi angka"),
      tempat_lahir: yup.string().required("Harap masukan nilai yang valid"),
      tanggal_lahir: yup.string().required("Harap pilih tanggal lahir siswa"),
      jenis_kelamin: yup.string().required("Harap pilih jenis kelamin santri"),
      alamat: yup.string(),
      nama_ayah: yup.string().required("Harap masukan nilai yang valid"),
      nomor_telepon_ayah: yup.string(),
      pekerjaan_ayah: yup.string(),
      nama_ibu: yup.string().required("Harap masukan nilai yang valid"),
      nomor_telepon_ibu: yup.string(),
      pekerjaan_ibu: yup.string(),
      status: yup.boolean(),
      foto:
         mode === "edit"
            ? yup.mixed().nullable()
            : yup.mixed().required("Harap unggah gambar"),
   });
   const intialValues = {
      nama_lengkap: "",
      username: "",
      nomor_induk: "",
      tempat_lahir: "",
      password: "",
      konfirmasi_password: "",
      tanggal_lahir: "",
      jenis_kelamin: "",
      alamat: "",
      nama_ayah: "",
      nomor_telepon_ayah: "",
      pekerjaan_ayah: "",
      nama_ibu: "",
      nomor_telepon_ibu: "",
      pekerjaan_ibu: "",
      foto: "",
      status: false,
   };

   return useForm({
      defaultValues: intialValues,
      resolver: yupResolver(schemaSiswa),
      mode: "all",
   });
};

const schemaGuru = yup.object({
   nama_lengkap: yup.string().required("Harap masukan nilai yang valid"),
   username: yup.string().required("Harap masukan nilai yang valid"),
   password: yup.string().required("Harap masukan nilai yang valid"),
   konfirmasi_password: yup.string().required("Harap masukan nilai yang valid"),
   nomor_induk: yup.string().required("NIG hanya boleh berisi angka"),
   tempat_lahir: yup.string().required("Harap masukan nilai yang valid"),
   tanggal_lahir: yup.string().required("Harap pilih tanggal lahir guru"),
   jenis_kelamin: yup.string().required("Harap pilih jenis kelamin"),
   email: yup.string().required("Harap masukan nilai yang valid"),
   nomor_telepon: yup.string().required("No.Telepon hanya boleh berisi angka"),
   posisi: yup.string().required("Harap masukan nilai yang valid"),
   tanggal_bergabung: yup.string().required("Harap pilih tanggal bergabung"),
   alamat: yup.string(),
   status: yup.boolean(),
   foto: yup.mixed().required("Harap unggah gambar"),
});

export const useGuruValidation = () => {
   const initialValues = {
      nama_lengkap: "",
      username: "",
      password: "",
      konfirmasi_password: "",
      nomor_induk: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      jenis_kelamin: "",
      email: "",
      nomor_telepon: "",
      posisi: "",
      tanggal_bergabung: "",
      alamat: "",
      status: false,
   };

   return useForm({
      defaultValues: initialValues,
      resolver: yupResolver(schemaGuru),
      mode: "all",
   });
};

const schemaOperator = yup.object({
   nama_lengkap: yup.string().required("Harap masukan nilai yang valid"),
   username: yup.string().required("Harap masukan nilai yang valid"),
   password: yup.string().required("Harap masukan nilai yang valid"),
   konfirmasi_password: yup.string().required("Harap masukan nilai yang valid"),
   nomor_induk: yup.string().required("NIO hanya boleh berisi angka"),
   tempat_lahir: yup.string().required("Harap masukan nilai yang valid"),
   tanggal_lahir: yup.string().required("Harap pilih tanggal lahir operator"),
   jenis_kelamin: yup.string().required("Harap pilih jenis kelamin santri"),
   email: yup.string().required("Harap masukan nilai yang valid"),
   nomor_telepon: yup.string().required("No.Telepon hanya boleh berisi angka"),
   tanggal_bergabung: yup.string().required("Harap pilih tanggal bergabung"),
   alamat: yup.string(),
   posisi: yup.string().required("Harap masukan nilai yang valid"),
   foto: yup.mixed().required("Harap unggah foto"),
   status: yup.boolean(),
});
export const useOperatorValidation = () => {
   const initialValues = {
      nama_lengkap: "",
      username: "",
      nomor_induk: "",
      password: "",
      konfirmasi_password: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      jenis_kelamin: "",
      email: "",
      nomor_telepon: "",
      posisi: "",
      tanggal_bergabung: "",
      alamat: "",
      jabatan: "",
      foto: "",
      status: false,
   };

   return useForm({
      defaultValues: initialValues,
      resolver: yupResolver(schemaOperator),
      mode: "all",
   });
};
