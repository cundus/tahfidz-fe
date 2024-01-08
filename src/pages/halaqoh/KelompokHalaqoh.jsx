import ButtonCustom from "../../components/atoms/ButtonCustom";
import Header from "../../components/molekuls/Header";
import { useNavigate } from "react-router-dom";
import { AddIcon, DownloadIcon, SearchIcon } from "@chakra-ui/icons";
import TableCustom from "../../components/molekuls/TableCustom";
import {
  Tr,
  Td,
  Badge,
  Flex,
  Select,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { CiMenuKebab } from "react-icons/ci";

import { IoEyeOutline } from "react-icons/io5";

const KelompokHalaqoh = () => {
  const router = useNavigate();

  return (
    <>
      <Header title="Kelompok Halaqoh">
        <ButtonCustom
          icon={<AddIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Tambah Data Baru"
          onClick={() =>
            router("/halaqoh/kelompok-halaqoh/tambah-kelompok-halaqoh")
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
          <DownloadIcon __css={{ marginRight: "6px" }} w={3} h={3} />
          Download
        </Button>
      </Flex>
      <TableCustom
        thead={[
          "#",
          "Nama Halaqoh",
          "Tahun Ajaran",
          "Nama Guru",
          "Anggota",
          "Status",
          "Aksi",
        ]}
        tbody={
          <Tr>
            <Td>1</Td>
            <Td>SRQAI 000001</Td>
            <Td>TA 2020 - 2021 GANJIL</Td>
            <Td>Ibadurrahman</Td>
            <Td>
              <Badge
                borderRadius="xl"
                paddingY={1}
                paddingX={2}
                variant="outline"
                color="#212529"
                borderColor="#212529"
                css={{
                  display: "flex",
                  alignItems: "center",
                  width: "fit-content",
                  gap: "5px",
                }}
              >
                <Icon as={IoEyeOutline} w={3} h={3} />
                10 Siswa
              </Badge>
            </Td>
            <Td>
              <Badge
                borderRadius="xl"
                paddingY={1}
                paddingX={2}
                color="white"
                backgroundColor="#0D6EFD"
                // backgroundColor="#DC3545"
              >
                Aktif
              </Badge>
            </Td>
            <Td>
              <Menu>
                <MenuButton
                  height={8}
                  as={Button}
                  width={8}
                  rightIcon={<CiMenuKebab style={{ marginRight: 8 }} />}
                ></MenuButton>
                <MenuList>
                  <MenuItem>Detail</MenuItem>
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </MenuList>
              </Menu>
            </Td>
          </Tr>
        }
      />
    </>
  );
};

export default KelompokHalaqoh;
