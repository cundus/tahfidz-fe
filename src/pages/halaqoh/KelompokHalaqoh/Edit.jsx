import { useNavigate } from "react-router-dom";
import Header from "../../../components/molekuls/Header";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import BoxInputLayout from "../../../components/molekuls/BoxInputLayout";
import { Text } from "@chakra-ui/react";

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
      </BoxInputLayout>
    </>
  );
};

export default EditKelompokHalaqoh;
