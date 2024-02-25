import Header from "../../../components/molekuls/Header";
import { Flex, Td, Tr, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import TableCustom from "../../../components/molekuls/TableCustom";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import InfoProfile from "../../../components/atoms/InfoProfile";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetailHalaqah } from "../../../lib/api/halaqoh";

const KelolaMurojaah = () => {
  const params = useParams();
  const idParam = parseInt(params.id);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getDetailHalaqah(idParam);
        setLoading(false);
        setData(response);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading....</Text>;
  }

  return (
    <>
      <Header title="HAFALAN BARU (Manzil)">
        <ButtonCustom
          icon={<ArrowBackIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Kembali"
          onClick={() => router("/hafalan/murojaah-(manzil)")}
          type="outline"
        />
      </Header>
      <Flex mt={8} justifyContent="space-between" alignItems="center" gap={4}>
        <Flex borderLeft="4px solid #0D6EFD" direction="column">
          <InfoProfile
            title="Nama Halaqoh"
            value={data?.nama_halaqoh}
            isLine={false}
          />
          <InfoProfile
            title="Tahun Ajaran"
            value={data?.tahun_ajaran?.nama_tahun_ajaran}
            isLine={false}
          />
          <InfoProfile
            title="Nama Guru"
            value={data?.nama_guru}
            isLine={false}
          />
        </Flex>
      </Flex>
      <TableCustom
        thead={[
          "#",
          "No Induk Siswa",
          "Nama Lengkap",
          "Jenis Kelamin",
          "Action",
        ]}
        tbody={data?.siswa?.map((item, idx) => (
          <Tr key={idx}>
            <Td>{idx + 1}</Td>
            <Td>{item.nomor_induk}</Td>
            <Td>{item.nama_siswa}</Td>
            <Td>{item.jenis_kelamin}</Td>
            <Td>
              <Text
                color="#0D6EFD"
                onClick={() =>
                  router(
                    `/hafalan/murojaah-(manzil)/kelola-hafalan/${idParam}/${item.siswa_id}/${item.nama_siswa}`
                  )
                }
                fontSize="sm"
                borderBottom="1px solid transparent"
                _hover={{
                  cursor: "pointer",
                  borderBottom: "1px solid #0D6EFD",
                  width: "fit-content",
                }}
              >
                Kelola Hafalan
              </Text>
            </Td>
          </Tr>
        ))}
      />
    </>
  );
};

export default KelolaMurojaah;
