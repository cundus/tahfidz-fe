import Header from "../../components/molekuls/Header";
import ButtonCustom from "../../components/atoms/ButtonCustom";
import TableCustom from "../../components/molekuls/TableCustom";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Tr,
  Td,
  Badge,
  Flex,
  Link,
  Select,
  Button,
  Input,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BsDownload } from "react-icons/bs";

const DataSiswa = () => {
  const router = useNavigate();

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
        thead={[
          "#",
          "No Induk Siswa",
          "Nama Lengkap",
          "Jenis kelamin",
          "Status",
          "Aksi",
        ]}
        tbody={
          <Tr>
            <Td>1</Td>
            <Td>SRQAI 000001</Td>
            <Td>Ahmad Zakariya</Td>
            <Td>Laki-Laki</Td>
            <Td>
              <Badge
                borderRadius="xl"
                paddingY={1}
                paddingX={2}
                color="white"
                // backgroundColor="#0D6EFD"
                backgroundColor="#DC3545"
              >
                Non Aktif
              </Badge>
            </Td>
            <Td>
              <Flex>
                <Link
                  href="/master-data/data-siswa/detail-data-siswa"
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
                  href="/master-data/data-siswa/edit-data-siswa"
                >
                  Edit
                </Link>
                <Link color="#0D6EFD">Hapus</Link>
              </Flex>
            </Td>
          </Tr>
        }
      />
    </>
  );
};

export default DataSiswa;
