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
  Text,
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
import { deleteUser, getAllSiswa } from "../../lib/api/users";
import AlertConfirm from "./../../components/atoms/AlertDialog";

const DataSiswa = () => {
  const router = useNavigate();
  const [dataSiswa, setDataSiswa] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedId, setSelectedId] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleGetAllSiswa = async () => {
    setLoading(true);
    try {
      const response = await getAllSiswa();
      setLoading(false);
      setDataSiswa(response);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDeleteSiswa = async () => {
    try {
      const response = await deleteUser(selectedId);
      console.log(response);
      onClose();
      toast({
        title: response.data.message,
        status: "success",
        position: "top",
      });
      handleGetAllSiswa();
    } catch (error) {
      console.log(error);
    }
  };

  const openAlertConfirm = (id) => {
    setSelectedId(id);
    onOpen();
  };

  useEffect(() => {
    handleGetAllSiswa();
  }, []);

  return (
    <>
      <Header title="Data Siswa">
        <ButtonCustom
          icon={<AddIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Tambah Data Baru"
          onClick={() => router("/master-data/data-siswa/tambah-data-siswa")}
        />
      </Header>
      <Flex marginTop={10} justifyContent="space-between" alignItems="center">
        <Flex gap={3} alignItems="stretch">
          <Select placeholder="Pilih Cari Berdasarkan"></Select>
          <Input type="text" placeholder="Pencarian" />
          <ButtonCustom
            paddingX={6}
            icon={<SearchIcon __css={{ marginRight: "6px" }} w={4} h={4} />}
            title="Cari"
            height="38px"
          />
          <ButtonCustom
            paddingX={6}
            _hover={{ backgroundColor: "#5c656e", color: "white" }}
            bgColor="#6C757D"
            title="Reset"
            height="38px"
          />
        </Flex>
        <Button
          bgColor="#F8F9FA"
          color="#000"
          borderRadius={4}
          fontWeight="400"
          size="sm"
        >
          <Icon as={BsDownload} __css={{ marginRight: "8px" }} w={4} h={4} />
          Download
        </Button>
      </Flex>
      <TableCustom
        isLoading={loading}
        thead={[
          "#",
          "No Induk Siswa",
          "Nama Lengkap",
          "Jenis kelamin",
          "Status",
          "Aksi",
        ]}
        tbody={dataSiswa?.users?.map((data, idx) => (
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
                backgroundColor={data.profile.status ? "#0D6EFD" : "#DC3545"}
              >
                {data.profile.status ? "Aktif" : "Non Aktif"}
              </Badge>
            </Td>
            <Td>
              <Flex gap={2}>
                <Link
                  href={`/master-data/data-siswa/detail-data-siswa/${data.id}`}
                >
                  <Text color="#0D6EFD">Detail</Text>
                </Link>
                <Link
                  mx="5px"
                  paddingX={2}
                  borderLeft="1px solid #21252940"
                  borderRight="1px solid #21252940"
                  color="#0D6EFD"
                  href={`/master-data/data-siswa/edit-data-siswa/${data.id}`}
                >
                  <Text color="#0D6EFD">Edit</Text>
                </Link>
                <Link onClick={() => openAlertConfirm(data.id)} color="#0D6EFD">
                  <Text color="#0D6EFD">Hapus</Text>
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

export default DataSiswa;
