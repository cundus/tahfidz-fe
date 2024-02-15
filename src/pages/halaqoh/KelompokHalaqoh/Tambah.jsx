import { ArrowBackIcon } from "@chakra-ui/icons";
import { Flex, Grid, Switch, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import BadgeCustom from "../../../components/atoms/BadgeCustom";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import InputCustom from "../../../components/atoms/InputCustom";
import SelectCustom from "../../../components/atoms/SelectCustom";
import BoxInputLayout from "../../../components/molekuls/BoxInputLayout";
import Header from "../../../components/molekuls/Header";
import { getAllTahunAjaran } from "../../../lib/api/tahun-ajaran";
import { getAllGuru, getAllSiswa } from "../../../lib/api/users";
import { useHalaqohValidation } from "./../../../lib/validation/halaqohValidation";

const TambahKelompokHalaqoh = () => {
  const router = useNavigate();
  const [dataTahunAjaran, setDataTahunAjaran] = useState();
  const [dataGuru, setDataGuru] = useState();
  const [dataSiswa, setDataSiswa] = useState();

  const { control, handleSubmit } = useHalaqohValidation();

  const handleAddHalaqoh = () => {};

  useEffect(() => {
    const fetchAllTahunAjaran = async () => {
      try {
        const response = await getAllTahunAjaran();
        setDataTahunAjaran(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAllGuru = async () => {
      try {
        const response = await getAllGuru();
        setDataGuru(response.users);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAllSiswa = async () => {
      try {
        const response = await getAllSiswa();
        setDataSiswa(response.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllTahunAjaran();
    fetchAllGuru();
    fetchAllSiswa();
  }, []);

  const options = dataSiswa?.map((item) => {
    return {
      label: item.profile.nama_lengkap,
      value: item.id,
    };
  });

  return (
    <>
      <Header title="TAMBAH KELOMPOK HALAQOH">
        <ButtonCustom
          icon={<ArrowBackIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Kembali"
          onClick={() => router("/halaqoh/kelompok-halaqoh")}
          type="outline"
        />
      </Header>
      <BoxInputLayout title="Tambah Kelompok Halaqoh Baru">
        <Text fontSize="14px" color="#6C757D">
          Silahkan isi data di bawah untuk menambahkan kelompok halaqoh baru
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
            control={control}
            name="tahun_ajaran"
            render={({ field, fieldState }) => (
              <SelectCustom
                label="Tahun Ajaran"
                placeholder="Tahun Ajaran"
                isReq={true}
                errorText={fieldState.error?.message}
                {...field}
                name="tahun_ajaran"
                options={dataTahunAjaran?.map((item) => (
                  <option key={item.id} value={item.nama_tahun_ajaran}>
                    {item.nama_tahun_ajaran}
                  </option>
                ))}
              />
            )}
          />

          <Controller
            control={control}
            name="guruId"
            render={({ field, fieldState }) => (
              <SelectCustom
                label="Nama Guru"
                placeholder="Nama Guru"
                isReq={true}
                errorText={fieldState.error?.message}
                {...field}
                name="guruId"
                options={dataGuru?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item?.profile?.nama_lengkap}
                  </option>
                ))}
              />
            )}
          />
        </Grid>

        <Controller
          name="siswaIds"
          control={control}
          render={({ field, fieldState }) => (
            <InputCustom
              name="Nama Anggota"
              label="Nama Anggota"
              isReq={true}
              errorText={fieldState.error?.message}
              notInputForm={
                <Select
                  {...field}
                  name="siswaIds"
                  isSearchable
                  placeholder="Cari siswa"
                  options={options}
                />
              }
            />
          )}
        />

        <Flex flexWrap="wrap" gap={4}>
          <BadgeCustom title={"SISWA 1"} />
        </Flex>
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
            onClick={handleSubmit(handleAddHalaqoh)}
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
