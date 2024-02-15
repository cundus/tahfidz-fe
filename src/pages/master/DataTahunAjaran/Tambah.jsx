import { ArrowBackIcon } from "@chakra-ui/icons";
import { Flex, Grid, Switch, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import InputCustom from "../../../components/atoms/InputCustom";
import BoxInputLayout from "../../../components/molekuls/BoxInputLayout";
import Header from "../../../components/molekuls/Header";
import { useTahunAjaranValidation } from "../../../lib/validation/tahunAjaranValidation";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { createTahunajaran } from "../../../lib/api/tahun-ajaran";

const TambahTahunAjaran = () => {
  const router = useNavigate();

  const { control, handleSubmit, reset } = useTahunAjaranValidation();

  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async (data) => {
    try {
      setIsLoading(true);
      const response = await createTahunajaran(data);
      console.log(response);
      setIsLoading(false);
      reset();
      router("/master-data/data-tahun-ajaran");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title="TAMBAH DATA TAHUN AJARAN">
        <ButtonCustom
          icon={<ArrowBackIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Kembali"
          onClick={() => router("/master-data/data-tahun-ajaran")}
          type="outline"
        />
      </Header>
      <BoxInputLayout title="Tambah Data Tahun Ajaran Baru">
        <Text fontSize="14px" color="#6C757D">
          Silahkan isi data di bawah untuk menambahkan data tahun ajaran baru
        </Text>
        <Grid templateColumns="repeat(1, 1fr)" mt={8} gap="16px">
          <Controller
            control={control}
            name="nama_tahun_ajaran"
            render={({ field, fieldState }) => (
              <InputCustom
                typeInput="text"
                placeholder="Nama tahun ajaran"
                label="Nama Tahun Ajaran"
                name="nama_tahun_ajaran"
                errorText={fieldState.error?.message}
                {...field}
                isReq={true}
              />
            )}
          />
        </Grid>
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
                color="#0D6EFD"
                name="status"
                isChecked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
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
            title="Tambahkan"
            _hover={{ opacity: "0.8" }}
            bgColor="#0B5ED7"
            color="#FFF"
            isLoading={isLoading}
            onClick={handleSubmit(handleCreate)}
          />
        </Flex>
      </BoxInputLayout>
    </>
  );
};

export default TambahTahunAjaran;
