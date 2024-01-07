import Header from "../../components/molekuls/Header";
import { AddIcon } from "@chakra-ui/icons";
import ButtonCustom from "../../components/atoms/ButtonCustom";

const DataSiswa = () => {
  return (
    <>
      <Header title="Data Siswa">
        <ButtonCustom
          icon={<AddIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Tambah Data Baru"
        />
      </Header>
    </>
  );
};

export default DataSiswa;
