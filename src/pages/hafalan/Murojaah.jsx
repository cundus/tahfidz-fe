import Header from "../../components/molekuls/Header";
import { Flex, Select, Input, Td, Tr, Text } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import TableCustom from "../../components/molekuls/TableCustom";
import ButtonCustom from "../../components/atoms/ButtonCustom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllHalaqoh } from "../../lib/api/halaqoh";

const Murojaah = () => {
  const router = useNavigate();
  const [dataHalaqoh,setDataHalaqoh] = useState([])
  const [loading,setLoading] = useState(false)


  useEffect(()=> {
    const fetchData = async()=> {
      try {
        setLoading(true)
        const response = await getAllHalaqoh()
        setDataHalaqoh(response.halaqoh)
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <Header title="MUROJA’AH (MANZIL)" />
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
      isLoading={loading}
        thead={["#", "Nama Halaqoh", "Tahun Ajaran", "Nama Guru", "Action"]}
        tbody={
          dataHalaqoh.map((item,idx)=>  (
          <Tr key={idx}>
            <Td>{idx + 1}</Td>
            <Td>{item.nama_halaqoh}</Td>
            <Td>{item.tahun_ajaran.nama_tahun_ajaran}</Td>
            <Td>{item.nama_guru}</Td>
            <Td>
              <Text
                color="#0D6EFD"
                onClick={() => {
                  localStorage.setItem("idHalaqoh", item.id)
                  router("/hafalan/murojaah-(manzil)/kelola-hafalan/" + item.id)
                }}
                fontSize="sm"
                borderBottom="1px solid transparent"
                _hover={{
                  cursor: "pointer",
                  borderBottom: "1px solid #0D6EFD",
                  width: "fit-content",
                }}
              >
                Pilih Halaqoh
              </Text>
            </Td>
          </Tr>
          ))
        }
      />
    </>
  );
};

export default Murojaah;
