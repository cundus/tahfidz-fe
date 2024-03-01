import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/molekuls/Header";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import BoxInputLayout from "../../../components/molekuls/BoxInputLayout";
import { Text, Grid, Flex, Switch } from "@chakra-ui/react";
import InputCustom from "../../../components/atoms/InputCustom";
import { useTahunAjaranValidation } from "./../../../lib/validation/tahunAjaranValidation";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  getDetailTahunAjaran,
  updateTahunAjaran,
} from "../../../lib/api/tahun-ajaran";

const EditTahunAjaran = () => {
  const router = useNavigate();
  const navigation = useNavigate();
  const [loading,setLoading] = useState(false)
  const params = useParams();
  const idParam = parseInt(params.id);
  const { control, handleSubmit, getValues, reset } =
    useTahunAjaranValidation();

  const handleUpdate = async(data) => {
    setLoading(true)
    try {
      const response = await updateTahunAjaran(data,idParam);
      console.log(response);
      setLoading(false)
      router("/master-data/data-tahun-ajaran")
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  useEffect(() => {
    const fetchDetailTahunAjran = async () => {
      try {
        const response = await getDetailTahunAjaran(idParam);
        reset(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetailTahunAjran();
  }, [idParam]);

  return (
    <>
      <Header title="EDIT DATA TAHUN AJARAN">
        <ButtonCustom
          icon={<ArrowBackIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Kembali"
          onClick={() => router("/master-data/data-tahun-ajaran")}
          type="outline"
        />
      </Header>
      <BoxInputLayout title="Edit Data Tahun Ajaran">
        <Text fontSize="14px" color="#6C757D">
          Silahkan ubah data di bawah untuk mengedit data tahun ajaran
        </Text>
        <Grid templateColumns="repeat(1, 1fr)" mt={8} gap="16px">
          <Controller
            control={control}
            name="nama_tahun_ajaran"
            render={({ field, fieldState }) => (
              <InputCustom
                typeInput="text"
                placeholder="Nama Lengkap"
                label="Nama Lengkap"
                name="nama_tahun_ajaran"
                defaultValue={getValues("nama_tahun_ajaran")}
                {...field}
                errorText={fieldState?.error?.message}
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
            name="status"
            control={control}
            render={({ field }) => (
              <Switch
                {...field}
                color="#0D6EFD"
                defaultChecked={getValues("status")}
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
            onClick={() => {
              navigation("/master-data/data-tahun-ajaran");
            }}
          />
          <ButtonCustom
            title="Edit"
            _hover={{ opacity: "0.8" }}
            bgColor="#0B5ED7"
            color="#FFF"
            onClick={handleSubmit(handleUpdate)}
            isLoading={loading}
          />
        </Flex>
      </BoxInputLayout>
    </>
  );
};

export default EditTahunAjaran;
