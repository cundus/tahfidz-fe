import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import {
  Flex,
  Grid,
  Stack,
  useDisclosure
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import InfoProfile from "../../../components/atoms/InfoProfile";
import InputCustom from "../../../components/atoms/InputCustom";
import ModalCustom from "../../../components/atoms/ModalCustom";
import SelectCustom from "../../../components/atoms/SelectCustom";
import Header from "../../../components/molekuls/Header";

const SiswaHafalan = () => {
  let { id } = useParams();
  const router = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  console.log(id);

  return (
    <>
      <Header title="HAFALAN BARU (SABQ)">
        <ButtonCustom
          icon={<ArrowBackIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Kembali"
          onClick={() => router("/hafalan/hafalan-baru-(sabq)/kelola-hafalan")}
          type="outline"
        />
      </Header>
      <Flex mt={8} justifyContent="space-between" alignItems="center" gap={4}>
        <Flex borderLeft="4px solid #0D6EFD" direction="column">
          <InfoProfile
            title="Nama Siswa"
            value="Muhammad Fauzan"
            isLine={false}
          />
          <InfoProfile
            title="Nama Halaqoh"
            value="Muhammad Fauzan"
            isLine={false}
          />
          <InfoProfile
            title="Tahun Ajaran"
            value="TA 2023-2024 GANJIL"
            isLine={false}
          />
          <InfoProfile
            title="Nama Guru"
            value="Muhammad Fauzan"
            isLine={false}
          />
        </Flex>
        <ButtonCustom
          icon={<AddIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Tambah Hafalan Baru"
          onClick={onOpen}
        />
      </Flex>

      {isOpen && (
        <ModalCustom
          title="HAFALAN BARU (SABQ)"
          isOpen={isOpen}
          onClose={onClose}
        >
          <Flex borderLeft="4px solid #0D6EFD" direction="column">
            <InfoProfile
              title="Nama Siswa"
              value="Muhammad Fauzan"
              isLine={false}
            />
            <InfoProfile
              title="Nama Halaqoh"
              value="Muhammad Fauzan"
              isLine={false}
            />
            <InfoProfile
              title="Tahun Ajaran"
              value="TA 2023-2024 GANJIL"
              isLine={false}
            />
            <InfoProfile
              title="Nama Guru"
              value="Muhammad Fauzan"
              isLine={false}
            />
          </Flex>

          <Grid gridTemplateColumns="repeat(2, 1fr)" mt={8} gap={3}>
            <Stack spacing={0}>
              <InputCustom
                label="Hari/Tanggal"
                name="hari"
                isReq
                typeInput="date"
              />
              <SelectCustom
                label="Surat Awal"
                name="hari"
                isReq
                typeInput="date"
              />
              <SelectCustom
                label="Surat Akhir"
                name="hari"
                isReq
                typeInput="date"
              />
            </Stack>
            <Stack spacing={0}>
              <InputCustom
                label="Jumlah Baris Yang Di Hafal"
                name="jumlah_hafal"
                isReq
                typeInput="text"
                rightAddon="Baris"
              />
              <InputCustom
                label="Ayat Awal"
                name="hari"
                isReq
                typeInput="text"
              />
              <InputCustom
                label="Ayat Akhir"
                name="hari"
                isReq
                typeInput="text"
              />
            </Stack>
          </Grid>
        </ModalCustom>
      )}
    </>
  );
};

export default SiswaHafalan;
