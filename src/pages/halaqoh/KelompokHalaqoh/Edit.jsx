import { useNavigate } from "react-router-dom";
import Header from "../../../components/molekuls/Header";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import { Icon, ArrowBackIcon } from "@chakra-ui/icons";
import BoxInputLayout from "../../../components/molekuls/BoxInputLayout";
import { Text, Grid, Flex, Switch } from "@chakra-ui/react";
import InputCustom from "../../../components/atoms/InputCustom";
import SelectCustom from "../../../components/atoms/SelectCustom";
import { IoIosSearch } from "react-icons/io";
import BadgeCustom from "../../../components/atoms/BadgeCustom";

const EditKelompokHalaqoh = () => {
  const router = useNavigate();

  return (
    <>
      <Header title="EDIT KELOMPOK HALAQOH">
        <ButtonCustom
          icon={<ArrowBackIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Kembali"
          onClick={() => router("/halaqoh/kelompok-halaqoh")}
          type="outline"
        />
      </Header>
      <BoxInputLayout title="Edit Kelompok Halaqoh Baru">
        <Text fontSize="14px" color="#6C757D">
          Silahkan ubah data di bawah untuk mengedit kelompok halaqoh
        </Text>
        <Grid templateColumns="repeat(3, 1fr)" mt={8} gap="16px">
          <InputCustom
            typeInput="text"
            placeholder="Nama Halaqoh"
            label="Nama Halaqoh"
            name="nama_halaqoh"
            errorText=""
            isReq={true}
          />
          <SelectCustom
            label="Tahun Ajaran"
            placeholder="Tahun Ajaran"
            isReq={true}
            errorText=""
            name="tahun_ajaran"
          />
          <SelectCustom
            label="Nama Guru"
            placeholder="Nama Guru"
            isReq={true}
            errorText=""
            name="nama_guru"
          />
        </Grid>
        <InputCustom
          label="Nama Anggota"
          placeholder="Nama Anggota"
          isReq={true}
          errorText=""
          name="nama_anggota"
          rightAddon={<Icon as={IoIosSearch} fontSize="20px" />}
          helper="Pilih minimal satu siswa"
        />
        <Flex flexWrap="wrap" gap={4}>
          <BadgeCustom title="Nama Siswa 1" />
          <BadgeCustom title="Nama Siswa 1" />
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

export default EditKelompokHalaqoh;
