import React, { useEffect, useState } from "react";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box, Text } from "@chakra-ui/react";
import { getChart } from "../../lib/api/chart";

ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
);

function StackedBarChart() {
   const [dataChart, setDataChart] = useState({});

   const options = {
      plugins: {
         title: {
            display: true,
         },
         legend: {
            display: true,
            reverse: true,
         },
      },
      responsive: true,
      scales: {
         x: {
            stacked: true,
         },
         y: {
            stacked: true,
         },
      },
   };

   const labels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
   ];

   const data = {
      labels,
      datasets: [
         {
            label: "alpha",
            data: dataChart.alpha,
            backgroundColor: "#DC3545",
         },
         {
            label: "Sakit",
            data: dataChart.sakit,
            backgroundColor: "#198754",
         },
         {
            label: "Izin",
            data: dataChart.izin,
            backgroundColor: "#FFC107",
         },
         {
            label: "Hadir",
            data: dataChart.hadir,
            backgroundColor: "#0D6EFD",
         },
      ],
   };

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await getChart();
            //console.log("response", response);
            setDataChart(response.status);
         } catch (error) {
            //console.log(error);
         }
      };
      fetchData();
   }, []);

   return (
      <Box bg="#DEE2E6" p={3} maxH={"auto"}>
         <Text>Ringkasan Kehadiran Siswa</Text>
         <Bar options={options} data={data} />
      </Box>
   );
}

export default StackedBarChart;
