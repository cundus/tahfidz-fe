import { Box, Grid, GridItem, HStack, Image } from "@chakra-ui/react";
import Header from "../components/molekuls/Header";
import PieChart from "../components/atoms/PieChart";
import StackedBarChart from "../components/atoms/StackedBarChart";
import CardDashboard from "../components/atoms/CardDashboard";
import bagIcon from "../assets/icons/bag.svg";
import usersIcon from "../assets/icons/users.svg";
import tahunAjaran from "../assets/icons/tahun-ajaran.svg";
import totalHalaqoh from "../assets/icons/totalHalaqoh.svg";
import { useEffect, useState } from "react";
import { getAllGuru, getAllSiswa } from "../lib/api/users";
import { getAllHalaqoh } from "../lib/api/halaqoh";
import { getAllTahunAjaran } from "../lib/api/tahun-ajaran";

const Dashboard = () => {
  const [data,setData] = useState({
    dataGuruLength: null,
    dataSiswaLength: null,
    dataHalaqohLength: null,
    dataTahunAjaranLength: null,
  })


  useEffect(() => {
    const getData = async () => {
      try {
        const [
          responseGuru,
          responseSiswa,
          responseHalaqoh,
          responseTahunAjaran,
        ] = await Promise.all([
          getAllGuru(),
          getAllSiswa(),
          getAllHalaqoh(),
          getAllTahunAjaran(),
        ]);
        setData({
          dataGuruLength: responseGuru.users.length,
          dataSiswaLength: responseSiswa.users.length,
          dataHalaqohLength: responseHalaqoh.halaqoh.length,
          dataTahunAjaranLength: responseTahunAjaran.data.length
        })
        
        
      } catch (error) {
        console.log(error);
      }
    };
    getData()
  }, []);
  return (
    <>
      <Header title="Dashboard" />
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-around"
        my={8}
        bg="#DEE2E6"
        borderRadius="8px"
        py={2}
      >
        <CardDashboard
          nameIcon={<Image src={bagIcon} alt="icon" />}
          title="Total Guru"
          subTitile="Guru"
          value={data.dataGuruLength}
          isBorderRight
        />
        <CardDashboard
          nameIcon={<Image src={usersIcon} alt="icon" />}
          title="Total Siswa"
          subTitile="Siswa"
          value={data.dataSiswaLength}
          isBorderRight
        />
        <CardDashboard
          nameIcon={<Image src={totalHalaqoh} alt="icon" />}
          title="Total Halaqoh"
          subTitile="Halaqoh"
          value={data.dataHalaqohLength}
          isBorderRight
        />
        <CardDashboard
          nameIcon={<Image src={tahunAjaran} alt="icon" />}
          title="Total Tahun Ajaran"
          subTitile="Tahun Ajaran"
          value={data.dataTahunAjaranLength}
          isBorderRight
        />
      </Box>
      <Grid gridTemplateColumns={"1fr 3fr"} alignItems={"center"} gap={10}>
        <GridItem maxH="400px">
          <PieChart />
        </GridItem>
        <GridItem maxH="400px">
          <StackedBarChart />
        </GridItem>
      </Grid>
    </>
  );
};

export default Dashboard;
