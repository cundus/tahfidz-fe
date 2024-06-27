import ButtonCustom from "../../components/atoms/ButtonCustom";
import Header from "../../components/molekuls/Header";
import { useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";
import TableCustom from "../../components/molekuls/TableCustom";
import { BsDownload } from "react-icons/bs";
import {
   deleteTahunajaran,
   getAllTahunAjaran,
   getSearchTahunAjaran,
} from "./../../lib/api/tahun-ajaran";
import { useEffect, useState } from "react";
import AlertConfirm from "../../components/atoms/AlertDialog";

const DataTahunAjaran = () => {
   const router = useNavigate();
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [selectedId, setSelectedId] = useState(null);
   const [option, setOption] = useState("");
   const [query, setQuery] = useState("");
   const [loadingDelete, setLoadingDelete] = useState(false);
   const [loading, setLoading] = useState(false);

   const [data, setData] = useState([]);

   const fetchData = async () => {
      setLoading(true);
      try {
         const response = await getAllTahunAjaran();
         setData(response.data);
         setLoading(false);
      } catch (error) {
         //console.log(error);
         setLoading(false);
      }
   };

   const searchTA = async () => {
      setLoading(true);
      try {
         const response = await getSearchTahunAjaran(option, query);
         setData(response.data);
         setLoading(false);
      } catch (error) {
         //console.log(error);
         setLoading(false);
      }
   };

   const openAlertConfirm = (id) => {
      setSelectedId(id);
      onOpen();
   };
   const closeAlertConfirm = () => {
      setSelectedId(null);
      onClose();
   };

   const deleteTahunAjaran = async () => {
      try {
         setLoadingDelete(true);
         const response = await deleteTahunajaran(selectedId);
         //console.log(response);
         setLoadingDelete(false);
         onClose();
      } catch (error) {
         //console.log(error);
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <>
         <Header title="Data Tahun Ajaran">
            <ButtonCustom
               icon={<AddIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
               title="Tambah Data Baru"
               onClick={() =>
                  router(
                     "/master-data/data-tahun-ajaran/tambah-data-tahun-ajaran"
                  )
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
                  <option value={"nama_tahun_ajaran"}>Nama Tahun Ajaran</option>
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
                  onClick={searchTA}
               />
               <ButtonCustom
                  paddingX={6}
                  _hover={{ backgroundColor: "#5c656e", color: "white" }}
                  bgColor="#6C757D"
                  title="Reset"
                  height="38px"
                  onClick={() => (setQuery(""), setOption(""), fetchData())}
               />
            </Flex>
            {/* <Button bgColor="#F8F9FA" color="#000" borderRadius={4} fontWeight="400" size="sm">
          <Icon as={BsDownload} __css={{ marginRight: "8px" }} w={4} h={4} />
          Download
        </Button> */}
         </Flex>
         <TableCustom
            isLoading={loading}
            thead={["#", "Nama Tahun Ajaran", "Status", "Aksi"]}
            tbody={data.map((data, idx) => (
               <Tr key={idx}>
                  <Td width={10}>{idx + 1}</Td>
                  <Td width="52rem">{data.nama_tahun_ajaran}</Td>
                  <Td>
                     <Badge
                        borderRadius="xl"
                        paddingY={1}
                        paddingX={2}
                        color="white"
                        // backgroundColor="#0D6EFD"
                        backgroundColor={data.status ? "#0D6EFD" : "#DC3545"}
                     >
                        {data.status ? "Aktif" : "Non Aktif"}
                     </Badge>
                  </Td>
                  <Td>
                     <Flex>
                        <Link
                           mx="5px"
                           paddingX={2}
                           borderRight="1px solid #21252940"
                           color="#0D6EFD"
                           href={`/master-data/data-tahun-ajaran/edit-data-tahun-ajaran/${data.id}`}
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

         <AlertConfirm
            loadingDelete={loadingDelete}
            isOpen={isOpen}
            onClose={closeAlertConfirm}
            title="Hapus Data"
            subTitle="Apakah anda yakin ingin menghapus data ?"
            onOK={deleteTahunAjaran}
         />
      </>
   );
};

export default DataTahunAjaran;
