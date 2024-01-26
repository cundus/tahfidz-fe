import { useNavigate } from "react-router-dom";
import Header from "../../../components/molekuls/Header";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import BoxInputLayout from "../../../components/molekuls/BoxInputLayout";
import { Text, Grid, Flex, Switch } from "@chakra-ui/react";
import InputCustom from "../../../components/atoms/InputCustom";

const EditTahunAjaran = () => {
  const router = useNavigate();

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
          <InputCustom
            typeInput="text"
            placeholder="Nama Lengkap"
            label="Nama Lengkap"
            name="nama_lengkap"
            errorText=""
            isReq={true}
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
          <Switch color="#0D6EFD" name="status" />
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
          />
        </Flex>
      </BoxInputLayout>
    </>
  );
};

export default EditTahunAjaran;
