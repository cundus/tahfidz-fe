import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { getAllSiswa } from "../../lib/api/users";
import { Box, Text } from "@chakra-ui/react";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
   const [data, setData] = useState([0, 0]);

   const option = useMemo(() => {
      return {
         labels: ["Siswa Aktif", "Siswa Non Aktif"],
         datasets: [
            {
               data,
               borderWidth: 1,
               backgroundColor: ["#0D6EFD", "#DC3545"],
            },
         ],
      };
   }, [data]);

   useEffect(() => {
      const getSiswa = async () => {
         try {
            const response = await getAllSiswa();
            const aktifLength = response.users.filter(
               (item) => item.profile.status === true
            ).length;
            const nonAktifLength = response.users.filter(
               (item) => item.profile.status === false
            ).length;
            //console.log(aktifLength,nonAktifLength);
            setData([aktifLength, nonAktifLength]);
         } catch (error) {
            //console.log(error);
         }
      };
      getSiswa();
   }, []);

   return (
      <Box bg="#DEE2E6" p={3} borderRadius={5} maxH={"auto"}>
         <Text textAlign="center" mb={3}>
            Status Siswa Aktif/Non Aktif
         </Text>
         <Doughnut data={option} />
      </Box>
   );
};

export default PieChart;
