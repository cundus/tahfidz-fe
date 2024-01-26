import { useNavigate } from "react-router-dom";
import Header from "../../../components/molekuls/Header";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import BoxInputLayout from "../../../components/molekuls/BoxInputLayout";
import { Flex } from "@chakra-ui/react";
import InfoProfile from "../../../components/atoms/InfoProfile";
import BadgeCustom from "../../../components/atoms/BadgeCustom";

const DetailKelompokHalaqoh = () => {
  const router = useNavigate();

  return (
    <>
      <Header title="DETAIL KELOMPOK HALAQOH">
        <ButtonCustom
          icon={<ArrowBackIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Kembali"
          onClick={() => router("/halaqoh/kelompok-halaqoh")}
          type="outline"
        />
      </Header>
      <BoxInputLayout title="Detail Kelompok Halaqoh">
        <Flex direction="column" gap={4}>
          <InfoProfile title="Nama Halaqoh" value="Muhammad Fauzan" />
          <InfoProfile title="Tahun Ajaran" value="TA 2023-2024 GANJIL" />
          <InfoProfile title="Nama Guru" value="Muhammad Fauzan" />
          <InfoProfile
            title="Anggota"
            value={
              <Flex flexWrap="wrap" gap={4}>
                <BadgeCustom title="Nama Siswa 1" isDelete={false} />
                <BadgeCustom title="Nama Siswa 1" isDelete={false} />
              </Flex>
            }
          />
          <InfoProfile title="Status" value="AKTIF" />
        </Flex>
      </BoxInputLayout>
    </>
  );
};

export default DetailKelompokHalaqoh;
