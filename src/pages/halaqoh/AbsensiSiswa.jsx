import ButtonCustom from "../../components/atoms/ButtonCustom";
import Header from "../../components/molekuls/Header";
import { Flex, Select, Input, Td, Tr, Text } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import TableCustom from "../../components/molekuls/TableCustom";
import { useNavigate } from "react-router-dom";

const AbsensiSiswa = () => {
  const router = useNavigate();
  return (
    <>
      <Header title="Absensi Siswa" />
      <Flex maxW="50%" marginTop={10} gap={3} alignItems="center">
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
      <TableCustom
        thead={["#", "Nama Halaqoh", "Tahun Ajaran", "Nama Guru", "Action"]}
        tbody={
          <Tr>
            <Td>1</Td>
            <Td>SRQAI 000001</Td>
            <Td>TA 2020 - 2021 GANJIL</Td>
            <Td>Ibadurrahman</Td>
            <Td>
              <Text
                color="#0D6EFD"
                onClick={() => router("/halaqoh/kelompok-halaqoh/absensi")}
                fontSize="sm"
                borderBottom="1px solid transparent"
                _hover={{
                  cursor: "pointer",
                  borderBottom: "1px solid #0D6EFD",
                  width: "fit-content",
                }}
              >
                Kelola Absensi
              </Text>
            </Td>
          </Tr>
        }
      />
    </>
  );
};

export default AbsensiSiswa;
