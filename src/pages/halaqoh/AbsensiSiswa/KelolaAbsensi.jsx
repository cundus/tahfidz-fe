import ButtonCustom from "../../../components/atoms/ButtonCustom";
import Header from "../../../components/molekuls/Header";
import { useNavigate } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";

const KelolaAbsensi = () => {
  const router = useNavigate();
  return (
    <>
      <Header title="Absensi Siswa">
        <ButtonCustom
          icon={<AddIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Tambah Data Baru"
          onClick={() => router("/halaqoh/absensi-siswa")}
        />
      </Header>
    </>
  );
};

export default KelolaAbsensi;
