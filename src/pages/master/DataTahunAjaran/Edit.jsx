import { useNavigate } from "react-router-dom";
import Header from "../../../components/molekuls/Header";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import BoxInputLayout from "../../../components/molekuls/BoxInputLayout";
import { Text } from "@chakra-ui/react";

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
      </BoxInputLayout>
    </>
  );
};

export default EditTahunAjaran;
