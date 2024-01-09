import Header from "../../../components/molekuls/Header";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import BoxInputLayout from "../../../components/molekuls/BoxInputLayout";
import { Text } from "@chakra-ui/react";

const TambahKelompokHalaqoh = () => {
  const router = useNavigate();

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
      </BoxInputLayout>
    </>
  );
};

export default TambahKelompokHalaqoh;
