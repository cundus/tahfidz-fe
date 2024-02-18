import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { Flex, Image, Td, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FileWhite from "../../../assets/icons/file_white.png";
import BadgeCustom from "../../../components/atoms/BadgeCustom";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import InfoProfile from "../../../components/atoms/InfoProfile";
import Header from "../../../components/molekuls/Header";
import TableCustom from "../../../components/molekuls/TableCustom";
import { getDetailHalaqah } from "../../../lib/api/halaqoh";

const KelolaAbsensi = () => {
  const router = useNavigate();

  const params = useParams();
  const idParam = parseInt(params.id);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleGetDetailHalaqoh = async () => {
      try {
        setLoading(true);
        const response = await getDetailHalaqah(idParam);
        setLoading(false);
        setData(response);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    handleGetDetailHalaqoh();
  }, []);
  return (
    <>
      <Header title="Absensi Siswa">
        <ButtonCustom
          icon={<ArrowBackIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Kembali"
          onClick={() => router("/halaqoh/absensi-siswa")}
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
        <Flex direction="column" gap={2}>
          <ButtonCustom
            icon={
              <Image
                src={FileWhite}
                __css={{ marginRight: "6px" }}
                w={3}
                h={3}
              />
            }
            title="Rekapitulasi Absen"
            onClick={() =>
              router(
                "/halaqoh/absensi-siswa/kelola-absensi-siswa/rekapitulasi-absen"
              )
            }
            bgColor="#198754"
            _hover={{ opacity: "0.8" }}
          />
          <ButtonCustom
            icon={<AddIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
            title="Tambah Absensi"
            onClick={() => {}}
          />
        </Flex>
      </Flex>
      <TableCustom
        isLoading={loading}
        theadCustom={
          <>
            <Tr>
              <Td rowSpan={2}>#</Td>
              <Td rowSpan={2}>No Induk Siswa</Td>
              <Td rowSpan={2}>Nama Lengkap</Td>
              <Td rowSpan={2}>Jenis Kelamin</Td>
              <Td textAlign="center" border="none" colSpan={5}>
                Pertemuan
              </Td>
              <Td border="none" textAlign="center" colSpan={5}>
                Jumlah
              </Td>
            </Tr>
            <Tr>
              <Td textAlign="center">1</Td>
              <Td textAlign="center">2</Td>
              <Td textAlign="center">3</Td>
              <Td textAlign="center">4</Td>
              <Td textAlign="center">5</Td>
              <Td textAlign="center" color="#fff" bgColor="#0D6EFD">
                H
              </Td>
              <Td textAlign="center" color="#212529" bgColor="#FFC107">
                I
              </Td>
              <Td textAlign="center" color="#fff" bgColor="#198754">
                S
              </Td>
              <Td textAlign="center" color="#fff" bgColor="#DC3545">
                A
              </Td>
            </Tr>
          </>
        }
        tbody={data?.siswa.map((item, idx) => (
          <Tr key={idx}>
            <Td>{idx + 1}</Td>
            <Td>{item?.nomor_induk}</Td>
            <Td>{item.nama_siswa}</Td>
            <Td>{item?.jenis_kelamin}</Td>
            {item.kehadiran.map((item, idx) => (
              <Td key={idx}>
                <BadgeCustom
                  title={item.status}
                  isDelete={false}
                  color="#fff"
                  bgColor={
                    item.status === "Hadir"
                      ? "#0D6EFD"
                      : item.status === "Sakit"
                      ? "#198754"
                      : item.status === "Ijin"
                      ? "#FFC107"
                      : item.status === "alpha"
                      ? "DC3545"
                      : "transparent"
                  }
                  padding="4px 8px"
                />
              </Td>
            ))}
            <Td>
              {item.kehadiran.reduce(
                (total, item) => (item.status === "Hadir" ? total + 1 : total),
                0
              )}
            </Td>
            <Td>
              {item.kehadiran.reduce(
                (total, item) => (item.status === "Ijin" ? total + 1 : total),
                0
              )}
            </Td>
            <Td>
              {item.kehadiran.reduce(
                (total, item) => (item.status === "Sakit" ? total + 1 : total),
                0
              )}
            </Td>
            <Td>
              {item.kehadiran.reduce(
                (total, item) => (item.status === "Alpha" ? total + 1 : total),
                0
              )}
            </Td>
          </Tr>
        ))}
      />
    </>
  );
};

export default KelolaAbsensi;
