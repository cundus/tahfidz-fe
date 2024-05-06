import { ArrowBackIcon } from "@chakra-ui/icons";
import { Flex, Td, Text, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonCustom from "../../components/atoms/ButtonCustom";
import InfoProfile from "../../components/atoms/InfoProfile";
import Header from "../../components/molekuls/Header";
import TableCustom from "../../components/molekuls/TableCustom";
import { getDetailHalaqah } from "../../lib/api/halaqoh";

const KelolaRaporTahfidz = () => {
  const params = useParams();
  const idParam = parseInt(params.id);
  const [data, setData] = useState({});
  console.log("data raport", data);
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getDetailHalaqah(idParam);
      console.log("data get detail", response);
      // setLoading(false)
      setData(response);
    } catch (error) {
      // setLoading(false)
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [idParam]);
  return (
    <>
      <Header title="RAPOR TAHFIDZ">
        <ButtonCustom
          icon={<ArrowBackIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Kembali"
          onClick={() => router("/rapor-tahfidz")}
          type="outline"
        />
      </Header>
      <Flex mt={8} justifyContent="space-between" alignItems="center" gap={4}>
        <Flex borderLeft="4px solid #0D6EFD" direction="column">
          <InfoProfile title="Nama Halaqoh" value={data?.nama_halaqoh} isLine={false} />
          <InfoProfile title="Tahun Ajaran" value={data?.tahun_ajaran?.nama_tahun_ajaran} isLine={false} />
          <InfoProfile title="Nama Guru" value={data?.nama_guru} isLine={false} />
        </Flex>
      </Flex>
      <TableCustom
        isLoading={loading}
        thead={["#", "No Induk Siswa", "Nama Lengkap", "Jenis Kelamin", "Action"]}
        tbody={data?.siswa?.map((item, idx) => {
          console.log(item);
          return (
            <Tr key={idx}>
              <Td>{idx + 1}</Td>
              <Td>{item.nomor_induk}</Td>
              <Td>{item.nama_siswa}</Td>
              <Td>{item.jenis_kelamin}</Td>
              <Td>
                <Text
                  color="#0D6EFD"
                  onClick={() => router(`/rapor-tahfidz/kelola-hafalan/${item.siswa_id}`)}
                  fontSize="sm"
                  borderBottom="1px solid transparent"
                  _hover={{
                    cursor: "pointer",
                    borderBottom: "1px solid #0D6EFD",
                    width: "fit-content",
                  }}
                >
                  Kelola Raport
                </Text>
              </Td>
            </Tr>
          );
        })}
      />
    </>
  );
};

export default KelolaRaporTahfidz;
