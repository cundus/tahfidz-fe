import { useNavigate } from "react-router-dom";
import Header from "../../../components/molekuls/Header";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  Flex,
} from "@chakra-ui/react";
import BoxInputLayout from "../../../components/molekuls/BoxInputLayout";
import InfoProfile from "../../../components/atoms/InfoProfile";

const DetailSiswa = () => {
  const router = useNavigate();

  return (
    <>
      <Header title="DETAIL DATA SISWA">
        <ButtonCustom
          icon={<ArrowBackIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Kembali"
          onClick={() => router("/master-data/data-siswa")}
          type="outline"
        />
      </Header>
      <BoxInputLayout title="Detail Data Siswa">
        <Tabs
          variant="enclosed"
          mt={8}
          // _selected={{ color: "white", bg: "blue.500" }}
        >
          <TabList>
            <Tab>Data Diri Siswa</Tab>
            <Tab>Data Diri Orang Tua Siswa</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
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
            </TabPanel>
            <TabPanel>
              <Flex direction="column" gap={4}>
                <InfoProfile title="Nama Lengkap Ayah" value="Ahmad Zakariya" />
                <InfoProfile title="Nomor Telepon Ayah" value="0817283283" />
                <InfoProfile title="Pekerjaan Ayah" value="Wiraswasta" />
                <InfoProfile title="Nama Lengkap Ibu" value="Siti Aminah" />
                <InfoProfile title="Nomor Telepon Ibu" value="0817283283" />
                <InfoProfile title="Pekerjaan Ibu" value="Ibu Rumah Tangga" />
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </BoxInputLayout>
    </>
  );
};

export default DetailSiswa;
