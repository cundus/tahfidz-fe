import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
   Badge,
   Button,
   Flex,
   Icon,
   Input,
   Link,
   Select,
   Td,
   Tr,
   useDisclosure,
   useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsDownload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../components/atoms/ButtonCustom";
import Header from "../../components/molekuls/Header";
import TableCustom from "../../components/molekuls/TableCustom";
import { deleteUser, getAllGuru, getSearchGuru } from "../../lib/api/users";
import AlertConfirm from "../../components/atoms/AlertDialog";

const DataGuru = () => {
   const router = useNavigate();

   const [dataGuru, setDataGuru] = useState([]);
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

   const searchGuru = async () => {
      setLoading(true);
      try {
         const response = await getSearchGuru(option, query);
         setLoading(false);
         setDataGuru(response);
      } catch (error) {
         //console.log(error);
         setLoading(false);
      }
   };

   const handleDeleteSiswa = async () => {
      try {
         const response = await deleteUser(selectedId);
         //console.log(response);
         onClose();
         toast({
            title: response.data.message,
            status: "success",
            position: "top",
         });
         handleGetAllGuru();
      } catch (error) {
         //console.log(error);
      }
   };

   const handleGetAllGuru = async () => {
      setLoading(true);
      try {
         const response = await getAllGuru();
         setLoading(false);
         setDataGuru(response);
      } catch (error) {
         setLoading(false);
         //console.log(error); 
      }
   };

   useEffect(() => {
      handleGetAllGuru();
   }, []);

   return (
      <>
         <Header title="Data Guru">
            <ButtonCustom
               icon={<AddIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
               title="Tambah Data Baru"
               onClick={() => router("/master-data/data-guru/tambah-data-guru")}
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
                  onClick={searchGuru}
               />
               <ButtonCustom
                  paddingX={6}
                  _hover={{ backgroundColor: "#5c656e", color: "white" }}
                  bgColor="#6C757D"
                  title="Reset"
                  height="38px"
                  onClick={() => (
                     setQuery(""), setOption(""), handleGetAllGuru()
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
               "No Induk Guru",
               "Nama Lengkap",
               "Jenis kelamin",
               "Status",
               "Aksi",
            ]}
            tbody={
               dataGuru?.users?.length !== 0 ? (
                  dataGuru?.users?.map((data, idx) => (
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
                           <Flex gap={3} color="#0D6EFD">
                              <Link
                                 href={`/master-data/data-guru/detail-data-guru/${data.id}`}
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
                                 href={`/master-data/data-guru/edit-data-guru/${data.id}`}
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
                  ))
               ) : (
                  <Tr>
                     <Td textAlign="center" colSpan={5}>
                        Data Not Found
                     </Td>
                  </Tr>
               )
            }
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

export default DataGuru;
