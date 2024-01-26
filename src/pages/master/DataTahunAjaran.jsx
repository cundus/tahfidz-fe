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
} from "@chakra-ui/react";
import TableCustom from "../../components/molekuls/TableCustom";
import { BsDownload } from "react-icons/bs";

const DataTahunAjaran = () => {
  const router = useNavigate();

  return (
    <>
      <Header title="Data Tahun Ajaran">
        <ButtonCustom
          icon={<AddIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Tambah Data Baru"
          onClick={() =>
            router("/master-data/data-tahun-ajaran/tambah-data-tahun-ajaran")
          }
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
        thead={["#", "Nama Tahun Ajaran", "Status", "Aksi"]}
        tbody={
          <Tr>
            <Td width={10}>1</Td>
            <Td width="52rem">TA 2020 - 2021 GANJIL</Td>
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
                  mx="5px"
                  paddingX={2}
                  borderRight="1px solid #21252940"
                  color="#0D6EFD"
                  href="/master-data/data-tahun-ajaran/edit-data-tahun-ajaran"
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

export default DataTahunAjaran;
