import { ArrowBackIcon } from "@chakra-ui/icons";
import { Flex, Grid, Switch, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import InputCustom from "../../../components/atoms/InputCustom";
import BoxInputLayout from "../../../components/molekuls/BoxInputLayout";
import Header from "../../../components/molekuls/Header";
import { useHalaqohValidation } from "./../../../lib/validation/halaqohValidation";

import ButtonCustom from "../../../components/atoms/ButtonCustom";
import { createHalaqah } from "../../../lib/api/halaqoh";
import { getAllTahunAjaran } from "../../../lib/api/tahun-ajaran";
import { getAllGuru, getAllSiswa } from "../../../lib/api/users";

const TambahKelompokHalaqoh = () => {
   const router = useNavigate();
   const [dataTahunAjaran, setDataTahunAjaran] = useState();
   const [dataGuru, setDataGuru] = useState();
   const [dataSiswa, setDataSiswa] = useState();
   const [loading, setLoading] = useState(false);
   const toast = useToast();

   const { control, handleSubmit } = useHalaqohValidation();

   useEffect(() => {
      const fetchDataSelect = async () => {
         const responseTahunAjaran = await getAllTahunAjaran();
         setDataTahunAjaran(
            responseTahunAjaran.data.map((item) => ({
               value: item.id,
               label: item.nama_tahun_ajaran,
            }))
         );
         const responseDataGuru = await getAllGuru();
         setDataGuru(
            responseDataGuru.users.map((item) => ({
               value: item.id,
               label: item.profile.nama_lengkap,
            }))
         );
         const responseDataSiswa = await getAllSiswa();
         setDataSiswa(
            responseDataSiswa.users.map((item) => ({
               value: item.id,
               label: item.profile.nama_lengkap,
            }))
         );
      };
      fetchDataSelect();
   }, []);

   // TODO : Halaqoh Submit To API

   const handleAddHalaqoh = async (data) => {
      try {
         setLoading(true);
         const response = await createHalaqah({
            guruId: data.guruId.value,
            nama_halaqoh: data.nama_halaqoh,
            siswaIds: data.siswaIds.map((item) => item.value),
            tahun_ajaran: data.tahun_ajaran.value,
            status: data.status,
         });
         router("/halaqoh/kelompok-halaqoh");
         toast({
            title: response?.message,
            status: "success",
            position: "top",
         });
         setLoading(false);
      } catch (error) {
         setLoading(false);
         console.log(error);
      }
   };
   return (
      <>
         <Header title="TAMBAH KELOMPOK HALAQOH">
            <ButtonCustom
               icon={
                  <ArrowBackIcon __css={{ marginRight: "6px" }} w={3} h={3} />
               }
               title="Kembali"
               onClick={() => router("/halaqoh/kelompok-halaqoh")}
               type="outline"
            />
         </Header>
         <BoxInputLayout title="Tambah Kelompok Halaqoh Baru">
            <Text fontSize="14px" color="#6C757D">
               Silahkan isi data di bawah untuk menambahkan kelompok halaqoh
               baru
            </Text>
            <Grid templateColumns="repeat(3, 1fr)" mt={8} gap="16px">
               <Controller
                  control={control}
                  name="nama_halaqoh"
                  render={({ field, fieldState }) => (
                     <InputCustom
                        typeInput="text"
                        placeholder="Nama Halaqoh"
                        label="Nama Halaqoh"
                        name="nama_halaqoh"
                        errorText={fieldState.error?.message}
                        {...field}
                        isReq={true}
                     />
                  )}
               />

               <Controller
                  name="tahun_ajaran"
                  control={control}
                  render={({ field, fieldState }) => (
                     <InputCustom
                        label="Tahun Ajaran"
                        isReq={true}
                        errorText={fieldState.error?.message}
                        notInputForm={
                           <Select
                              {...field}
                              name="tahun_ajaran"
                              placeholder="Cari Tahun Ajaran"
                              options={dataTahunAjaran}
                           />
                        }
                     />
                  )}
               />

               <Controller
                  name="guruId"
                  control={control}
                  render={({ field, fieldState }) => (
                     <InputCustom
                        label="Nama Guru"
                        isReq={true}
                        errorText={fieldState.error?.message}
                        notInputForm={
                           <Select
                              {...field}
                              name="guruId"
                              placeholder="Cari Guru"
                              options={dataGuru}
                              getOptionValue={(e) => e.value}
                           />
                        }
                     />
                  )}
               />
            </Grid>

            <Controller
               name="siswaIds"
               control={control}
               render={({ field, fieldState }) => {
                  console.log(field.value);
                  return (
                     <InputCustom
                        name="Nama Anggota"
                        label="Nama Anggota"
                        isReq={true}
                        errorText={fieldState.error?.message}
                        notInputForm={
                           <Select
                              name="siswaIds"
                              {...field}
                              isMulti
                              placeholder="Cari siswa"
                              options={dataSiswa}
                           />
                        }
                     />
                  );
               }}
            />

            <Flex justifyContent="space-between" mt="12px" gap={4}>
               <Flex flexDirection="column" gap="1px">
                  <Text fontSize="16px" fontWeight={600} color="#000">
                     Status
                  </Text>
                  <Text fontSize="14px" color="#000">
                     Anda dapat memilih ingin mengaktifkan atau menonaktifkan
                  </Text>
               </Flex>

               <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                     <Switch
                        {...field}
                        color="#0D6EFD"
                        onChange={(e) => field.onChange(e.target.checked)}
                        name="status"
                     />
                  )}
               />
            </Flex>
            <Flex justifyContent="flex-end" gap={4} alignItems="center" mt={12}>
               <ButtonCustom
                  title="Batal"
                  type="outline"
                  color="#DC3545"
                  borderColor="#DC3545"
                  _hover={{ bgColor: "#DC3545", color: "white" }}
                  w="100px"
                  bgColor="transparent"
               />
               <ButtonCustom
                  onClick={handleSubmit(handleAddHalaqoh, (err) =>
                     console.log(err)
                  )}
                  typeButton="submit"
                  isLoading={loading}
                  title="Tambahkan"
                  _hover={{ opacity: "0.8" }}
                  bgColor="#0B5ED7"
                  color="#FFF"
               />
            </Flex>
         </BoxInputLayout>
      </>
   );
};

export default TambahKelompokHalaqoh;
