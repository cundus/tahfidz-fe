import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, Select, Td, Text, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../components/atoms/ButtonCustom";
import Header from "../../components/molekuls/Header";
import TableCustom from "../../components/molekuls/TableCustom";
import { getAllHalaqoh } from "../../lib/api/halaqoh";

const AbsensiSiswa = () => {
  const router = useNavigate();



  const [data,setData] = useState([])
  const [isLoading,setIsLoading] = useState(false)


  useEffect(()=> {
    const handleGetKehadiran = async()=> {      
      try {
        setIsLoading(true)
        const response = await getAllHalaqoh()
        setData(response.halaqoh)
        setIsLoading(false)
      } catch (error) {
        console.log(error);
        setIsLoading(false)
      }
    }
    handleGetKehadiran()
  }, [])


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
      isLoading={isLoading}
        thead={["#", "Nama Halaqoh", "Tahun Ajaran", "Nama Guru", "Action"]}
        tbody={
          data?.map((item,idx)=> (
          <Tr key={idx}>
            <Td>{idx + 1}</Td>
            <Td>{item.nama_halaqoh}</Td>
            <Td>{item.tahun_ajaran.nama_tahun_ajaran}</Td>
            <Td>{item.nama_guru}</Td>
            <Td>
              <Text
                color="#0D6EFD"
                onClick={() =>
                  router("/halaqoh/absensi-siswa/kelola-absensi-siswa/" + item.id)
                }
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
          ))
        }
      />
    </>
  );
};

export default AbsensiSiswa;
