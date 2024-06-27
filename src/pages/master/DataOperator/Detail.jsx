import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/molekuls/Header";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import BoxInputLayout from "../../../components/molekuls/BoxInputLayout";
import { Image, Flex } from "@chakra-ui/react";
import InfoProfile from "../../../components/atoms/InfoProfile";
import { useEffect, useState } from "react";
import { getDetailUser } from "../../../lib/api/users";
import AvatarPic from "../../../assets/avatar_profile.png";
import moment from "moment";

const DetailOprator = () => {
   const router = useNavigate();

   const params = useParams();
   const idParams = parseInt(params.id);
   const [data, setData] = useState();

   const handleGetDetailOperator = async () => {
      try {
         const response = await getDetailUser(idParams);
         setData(response.data.user);
      } catch (error) {
         //console.log(error);
      }
   };

   useEffect(() => {
      handleGetDetailOperator();
   }, [idParams]);

   //console.log(data);

   return (
      <>
         <Header title="DETAIL DATA OPERATOR">
            <ButtonCustom
               icon={
                  <ArrowBackIcon __css={{ marginRight: "6px" }} w={3} h={3} />
               }
               title="Kembali"
               onClick={() => router("/master-data/data-operator")}
               type="outline"
            />
         </Header>
         <BoxInputLayout title="Detail Data Operator">
            <Flex mt={8} mb={4} gap={16} wrap>
               <Image
                  src={
                     data?.profile?.foto !== ""
                        ? data?.profile?.foto
                        : AvatarPic
                  }
                  alt="Segun Adebayo"
                  boxSize="200px"
                  objectFit="cover"
               />
               <Flex direction="column" gap={4}>
                  <InfoProfile
                     title="Nama"
                     value={data?.profile?.nama_lengkap}
                  />
                  <InfoProfile title="Username" value={data?.username} />
                  <InfoProfile
                     title="No Induk Operator"
                     value={data?.profile?.nomor_induk}
                  />
                  <InfoProfile
                     title="Status"
                     value={data?.profile?.status ? "AKTIF" : "NON AKTIF"}
                  />
                  <InfoProfile
                     title="Jenis kelamin"
                     value={data?.profile?.jenis_kelamin}
                  />
                  <InfoProfile
                     title="Tempat Lahir"
                     value={data?.profile?.tempat_lahir}
                  />
                  <InfoProfile
                     title="Tanggal Lahir"
                     value={moment(data?.user?.profile?.tanggal_lahir).format(
                        "DD MMMM YYYY"
                     )}
                  />
                  <InfoProfile title="Email" value={data?.profile?.email} />
                  <InfoProfile
                     title="Posisi / Jabatan"
                     value={data?.profile?.posisi}
                  />
                  <InfoProfile
                     title="Tanggal Bergabung"
                     value={moment(
                        data?.user?.profile?.tanggal_bergabung
                     ).format("DD MMMM YYYY")}
                  />
                  <InfoProfile
                     title="Alamat Lengkap"
                     value={data?.profile?.alamat}
                  />
               </Flex>
            </Flex>
         </BoxInputLayout>
      </>
   );
};

export default DetailOprator;
