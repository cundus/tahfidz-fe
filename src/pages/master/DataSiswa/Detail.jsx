import { useNavigate } from "react-router-dom";
import Header from "../../../components/molekuls/Header";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import BoxInputLayout from "../../../components/molekuls/BoxInputLayout";

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
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </BoxInputLayout>
    </>
  );
};

export default DetailSiswa;
