import { useNavigate } from "react-router-dom";
import Header from "../../../components/molekuls/Header";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import BoxInputLayout from "../../../components/molekuls/BoxInputLayout";
import { Image, Flex } from "@chakra-ui/react";
import InfoProfile from "../../../components/atoms/InfoProfile";

const DetailGuru = () => {
  const router = useNavigate();

  return (
    <>
      <Header title="DETAIL DATA GURU">
        <ButtonCustom
          icon={<ArrowBackIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Kembali"
          onClick={() => router("/master-data/data-guru")}
          type="outline"
        />
      </Header>
      <BoxInputLayout title="Detail Data Guru">
        <Flex mt={8} mb={4} gap={16} wrap>
          <Image
            src="https://bit.ly/sage-adebayo"
            alt="Segun Adebayo"
            boxSize="200px"
            objectFit="cover"
          />
          <Flex direction="column" gap={4}>
            <InfoProfile title="Nama" value="Muhammad Fauzan" />
            <InfoProfile title="Username" value="ahmad" />
            <InfoProfile title="No Induk Siswa" value="SRQAI 000001" />
            <InfoProfile title="Status" value="AKTIF" />
            <InfoProfile title="Jenis kelamin" value="Laki-Laki" />
            <InfoProfile title="Tempat Lahir" value="Tangerang" />
            <InfoProfile title="Tanggal Lahir" value="2021-10-30" />
            <InfoProfile
              title="Alamat Lengkap"
              value="Jl. Beringin 5 No.90, Pamulang Bar., Kec. Pamulang, Kota Tangerang Selatan, Banten 15417"
            />
          </Flex>
        </Flex>
      </BoxInputLayout>
    </>
  );
};

export default DetailGuru;
