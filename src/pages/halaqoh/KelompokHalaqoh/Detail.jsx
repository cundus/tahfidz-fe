import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/molekuls/Header";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import BoxInputLayout from "../../../components/molekuls/BoxInputLayout";
import { Flex } from "@chakra-ui/react";
import InfoProfile from "../../../components/atoms/InfoProfile";
import BadgeCustom from "../../../components/atoms/BadgeCustom";
import { getDetailHalaqah } from "../../../lib/api/halaqoh";
import { useEffect, useState } from "react";

const DetailKelompokHalaqoh = () => {
   const router = useNavigate();
   const params = useParams();
   const [data, setData] = useState();

   const idParam = parseInt(params.id);
   const fetchDetailHolaqah = async () => {
      try {
         const response = await getDetailHalaqah(idParam);
         //console.log(response);
         setData(response);
      } catch (error) {
         //console.log(error);
      }
   };

   useEffect(() => {
      fetchDetailHolaqah();
   }, [idParam]);

   return (
      <>
         <Header title="DETAIL KELOMPOK HALAQOH">
            <ButtonCustom
               icon={
                  <ArrowBackIcon __css={{ marginRight: "6px" }} w={3} h={3} />
               }
               title="Kembali"
               onClick={() => router("/halaqoh/kelompok-halaqoh")}
               type="outline"
            />
         </Header>
         <BoxInputLayout title="Detail Kelompok Halaqoh">
            <Flex direction="column" gap={4}>
               <InfoProfile title="Nama Halaqoh" value={data?.nama_halaqoh} />
               <InfoProfile
                  title="Tahun Ajaran"
                  value={data?.tahun_ajaran?.nama_tahun_ajaran}
               />
               <InfoProfile title="Nama Guru" value={data?.nama_guru} />
               <InfoProfile
                  title="Anggota"
                  value={
                     <Flex flexWrap="wrap" gap={4} pb={3}>
                        {data?.siswa.map((item, idx) => (
                           <BadgeCustom
                              key={idx}
                              title={item.nama_siswa}
                              isDelete={false}
                           />
                        ))}
                     </Flex>
                  }
               />
               <InfoProfile
                  title="Status"
                  value={data?.status ? "AKTIF" : "NON AKTIF"}
               />
            </Flex>
         </BoxInputLayout>
      </>
   );
};

export default DetailKelompokHalaqoh;
