import ButtonCustom from "../../components/atoms/ButtonCustom";
import Header from "../../components/molekuls/Header";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
   Flex,
   Select,
   Input,
   Button,
   Badge,
   Link,
   Tr,
   Td,
   Icon,
   useDisclosure,
   useToast,
} from "@chakra-ui/react";
import TableCustom from "../../components/molekuls/TableCustom";
import { useNavigate } from "react-router-dom";
import { BsDownload } from "react-icons/bs";
import { useEffect, useState } from "react";
import {
   deleteUser,
   getAllOperator,
   getSearchOperator,
} from "../../lib/api/users";
import AlertConfirm from "../../components/atoms/AlertDialog";

const DataOperator = () => {
   const router = useNavigate();

   const [dataOperator, setDataOperator] = useState([]);
   const { isOpen, onClose, onOpen } = useDisclosure();
   const [selectedId, setSelectedId] = useState();
   const [option, setOption] = useState("");
   const [query, setQuery] = useState("");
   const [loading, setLoading] = useState(false);
   const toast = useToast();

   const openAlertConfirm = (id) => {
      setSelectedId(id);
      onOpen();
   };

   const searchOperator = async () => {
      setLoading(true);
      try {
         const response = await getSearchOperator(option, query);
         setLoading(false);
         setDataOperator(response);
      } catch (error) {
         //console.log(error);
         setLoading(false);
      }
   };

   const handleDeleteSiswa = async () => {
      try {
         const response = await deleteUser(selectedId);
         onClose();
         toast({
            title: response.data.message,
            status: "success",
            position: "top",
         });
         handleGetAllOperator();
      } catch (error) {
         //console.log(error);
      }
   };

   const handleGetAllOperator = async () => {
      setLoading(true);
      try {
         const response = await getAllOperator();
         setLoading(false);
         setDataOperator(response);
      } catch (error) {
         //console.log(error);
         setLoading(false);
      }
   };

   useEffect(() => {
      handleGetAllOperator();
   }, []);

   return (
      <>
         <Header title="Data Operator">
            <ButtonCustom
               icon={<AddIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
               title="Tambah Data Baru"
               onClick={() =>
                  router("/master-data/data-operator/tambah-data-operator")
               }
            />
         </Header>
         <Flex
            marginTop={10}
            justifyContent="space-between"
            alignItems="center"
         >
            <Flex gap={3} alignItems="stretch">
               <Select
                  placeholder="Pilih Cari Berdasarkan"
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
               >
                  <option value={"nomor_induk"}>Nomor Induk</option>
                  <option value={"nama_lengkap"}>Nama</option>
                  <option value={"jenis_kelamin"}>Jenis Kelamin</option>
                  <option value={"status"}>Status</option>
               </Select>
               <Input
                  type="text"
                  placeholder="Pencarian"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
               />
               <ButtonCustom
                  paddingX={6}
                  icon={
                     <SearchIcon __css={{ marginRight: "6px" }} w={4} h={4} />
                  }
                  title="Cari"
                  height="38px"
                  onClick={searchOperator}
               />
               <ButtonCustom
                  paddingX={6}
                  _hover={{ backgroundColor: "#5c656e", color: "white" }}
                  bgColor="#6C757D"
                  title="Reset"
                  height="38px"
                  onClick={() => (
                     setQuery(""), setOption(""), handleGetAllOperator()
                  )}
               />
            </Flex>
            {/* <Button bgColor="#F8F9FA" color="#000" borderRadius={4} fontWeight="400" size="sm">
          <Icon as={BsDownload} __css={{ marginRight: "8px" }} w={4} h={4} />
          Download
        </Button> */}
         </Flex>
         <TableCustom
            isLoading={loading}
            thead={[
               "#",
               "No Induk Operator",
               "Nama Lengkap",
               "Jenis kelamin",
               "Status",
               "Aksi",
            ]}
            tbody={dataOperator?.users?.map((data, idx) => (
               <Tr key={idx}>
                  <Td>{idx + 1}</Td>
                  <Td>{data.profile.nomor_induk}</Td>
                  <Td>{data.profile.nama_lengkap}</Td>
                  <Td>{data.profile.jenis_kelamin}</Td>
                  <Td>
                     <Badge
                        borderRadius="xl"
                        paddingY={1}
                        paddingX={2}
                        color="white"
                        // backgroundColor="#0D6EFD"
                        backgroundColor={
                           data.profile.status ? "#0D6EFD" : "#DC3545"
                        }
                     >
                        {data.profile.status ? "Aktif" : "Non Aktif"}
                     </Badge>
                  </Td>
                  <Td>
                     <Flex>
                        <Link
                           href={`/master-data/data-operator/detail-data-operator/${data.id}`}
                           color="#0D6EFD"
                        >
                           Detail
                        </Link>
                        <Link
                           mx="5px"
                           paddingX={2}
                           borderLeft="1px solid #21252940"
                           borderRight="1px solid #21252940"
                           color="#0D6EFD"
                           href={`/master-data/data-operator/edit-data-operator/${data.id}`}
                        >
                           Edit
                        </Link>
                        <Link
                           onClick={() => openAlertConfirm(data.id)}
                           color="#0D6EFD"
                        >
                           Hapus
                        </Link>
                     </Flex>
                  </Td>
               </Tr>
            ))}
         />

         {isOpen && (
            <AlertConfirm
               isOpen={isOpen}
               onClose={onClose}
               onOK={handleDeleteSiswa}
               title="Hapus Data"
               subTitle="Apakah anda yakin ingin menghapus data ?"
            />
         )}
      </>
   );
};

export default DataOperator;
