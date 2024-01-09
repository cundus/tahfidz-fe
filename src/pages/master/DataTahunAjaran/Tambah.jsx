import Header from "../../../components/molekuls/Header";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import BoxInputLayout from "../../../components/molekuls/BoxInputLayout";
import { Text } from "@chakra-ui/react";

const TambahTahunAjaran = () => {
  const router = useNavigate();

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
      </BoxInputLayout>
    </>
  );
};

export default TambahTahunAjaran;
