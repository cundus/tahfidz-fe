import ButtonCustom from "../../../components/atoms/ButtonCustom";
import Header from "../../../components/molekuls/Header";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon, AddIcon, SearchIcon } from "@chakra-ui/icons";
import InfoProfile from "../../../components/atoms/InfoProfile";
import {
  Flex,
  Image,
  Tr,
  Td,
  Select,
  Input,
  Button,
  Icon,
} from "@chakra-ui/react";
import FileWhite from "../../../assets/icons/file_white.png";
import TableCustom from "../../../components/molekuls/TableCustom";
import BadgeCustom from "../../../components/atoms/BadgeCustom";
import { BsDownload } from "react-icons/bs";

const RekapitulasiAbsen = () => {
  const router = useNavigate();
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
            value="Muhammad Fauzan"
            isLine={false}
          />
          <InfoProfile
            title="Tahun Ajaran"
            value="TA 2023-2024 GANJIL"
            isLine={false}
          />
          <InfoProfile
            title="Nama Guru"
            value="Muhammad Fauzan"
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
            onClick={() => {}}
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
              <Td>1</Td>
              <Td>2</Td>
              <Td>3</Td>
              <Td>4</Td>
              <Td>5</Td>
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
        tbody={
          <Tr>
            <Td>1</Td>
            <Td>SRQAI000001</Td>
            <Td>Muhammad Fauzan</Td>
            <Td>Laki-laki</Td>
            <Td>
              <BadgeCustom
                title="H"
                isDelete={false}
                color="#fff"
                bgColor="#0D6EFD"
                padding="4px 8px"
              />
            </Td>
            <Td>
              <BadgeCustom
                title="H"
                isDelete={false}
                color="#fff"
                bgColor="#0D6EFD"
                padding="4px 8px"
              />
            </Td>
            <Td>
              <BadgeCustom
                title="I"
                isDelete={false}
                color="#212529"
                bgColor="#FFC107"
                padding="4px 8px"
              />
            </Td>
            <Td>
              <BadgeCustom
                title="S"
                isDelete={false}
                color="#fff"
                bgColor="#198754"
                padding="4px 8px"
              />
            </Td>
            <Td>
              <BadgeCustom
                title="A"
                isDelete={false}
                color="#fff"
                bgColor="#DC3545"
                padding="4px 8px"
              />
            </Td>
            <Td>5</Td>
            <Td>5</Td>
            <Td>5</Td>
            <Td>5</Td>
          </Tr>
        }
      />
    </>
  );
};

export default RekapitulasiAbsen;
