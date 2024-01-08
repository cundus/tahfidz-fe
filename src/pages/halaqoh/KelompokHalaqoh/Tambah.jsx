import Header from "../../../components/molekuls/Header";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

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
    </>
  );
};

export default TambahKelompokHalaqoh;
