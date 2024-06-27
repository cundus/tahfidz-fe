import { ArrowBackIcon } from "@chakra-ui/icons";
import {
   Flex,
   Image,
   Tab,
   TabList,
   TabPanel,
   TabPanels,
   Tabs,
} from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import InfoProfile from "../../../components/atoms/InfoProfile";
import BoxInputLayout from "../../../components/molekuls/BoxInputLayout";
import Header from "../../../components/molekuls/Header";
import { getDetailUser } from "../../../lib/api/users";

const DetailSiswa = () => {
   const router = useNavigate();
   const params = useParams();
   const idParams = parseInt(params.id);
   const [data, setData] = useState();

   const handleGetDetailSiswa = async () => {
      try {
         const response = await getDetailUser(idParams);
         setData(response.data);
      } catch (error) {
         //console.log(error);
      }
   };

   useEffect(() => {
      handleGetDetailSiswa();
   }, [idParams]);

   //console.log(data);
   return (
      <>
         <Header title="DETAIL DATA SISWA">
            <ButtonCustom
               icon={
                  <ArrowBackIcon __css={{ marginRight: "6px" }} w={3} h={3} />
               }
               title="Kembali"
               onClick={() => router("/master-data/data-siswa")}
               type="outline"
            />
         </Header>
         <BoxInputLayout title="Detail Data Siswa">
            <Tabs variant="enclosed" mt={8}>
               <TabList>
                  <Tab>Data Diri Siswa</Tab>
                  <Tab>Data Diri Orang Tua Siswa</Tab>
               </TabList>
               <TabPanels>
                  <TabPanel>
                     <Flex mt={8} mb={4} gap={16} wrap>
                        <Image
                           src={data?.user?.profile?.foto}
                           alt="Segun Adebayo"
                           boxSize="200px"
                           objectFit="cover"
                        />
                        <Flex direction="column" gap={4}>
                           <InfoProfile
                              title="Nama"
                              value={data?.user?.profile?.nama_lengkap}
                           />
                           <InfoProfile
                              title="Username"
                              value={data?.user?.username}
                           />
                           <InfoProfile
                              title="No Induk Siswa"
                              value={data?.user?.profile?.nomor_induk}
                           />
                           <InfoProfile
                              title="Status"
                              value={
                                 data?.user?.profile?.status
                                    ? "AKTIF"
                                    : "NON AKTIF"
                              }
                           />
                           <InfoProfile
                              title="Jenis kelamin"
                              value={data?.user?.profile?.jenis_kelamin}
                           />
                           <InfoProfile
                              title="Tempat Lahir"
                              value={data?.user?.profile?.tempat_lahir}
                           />
                           <InfoProfile
                              title="Tanggal Lahir"
                              value={moment(
                                 data?.user?.profile?.tanggal_lahir
                              ).format("DD MMMM YYYY")}
                           />

                           <InfoProfile
                              title="Alamat Lengkap"
                              value={data?.user?.profile?.alamat}
                           />
                        </Flex>
                     </Flex>
                  </TabPanel>
                  <TabPanel>
                     <Flex direction="column" gap={4}>
                        <InfoProfile
                           title="Nama Lengkap Ayah"
                           value={data?.user?.profile?.nama_ayah}
                        />
                        <InfoProfile
                           title="Nomor Telepon Ayah"
                           value={data?.user?.profile?.nomor_telepon_ayah}
                        />
                        <InfoProfile
                           title="Pekerjaan Ayah"
                           value={data?.user?.profile?.pekerjaan_ayah}
                        />
                        <InfoProfile
                           title="Nama Lengkap Ibu"
                           value={data?.user?.profile?.nama_ibu}
                        />
                        <InfoProfile
                           title="Nomor Telepon Ibu"
                           value={data?.user?.profile?.nomor_telepon_ibu}
                        />
                        <InfoProfile
                           title="Pekerjaan Ibu"
                           value={data?.user?.profile?.pekerjaan_ibu}
                        />
                     </Flex>
                  </TabPanel>
               </TabPanels>
            </Tabs>
         </BoxInputLayout>
      </>
   );
};

export default DetailSiswa;
