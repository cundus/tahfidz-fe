import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Grid,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Td,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import FileWhite from "../../../assets/icons/file_white.png";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import InfoProfile from "../../../components/atoms/InfoProfile";
import ModalCustom from "../../../components/atoms/ModalCustom";
import Header from "../../../components/molekuls/Header";
import TableCustom from "../../../components/molekuls/TableCustom";
import { getDetailHalaqah } from "../../../lib/api/halaqoh";
import {
  createKehadiran,
  getAllKehadiran,
  getDetailKehadiran,
  updateKehadiran,
} from "../../../lib/api/kehadiran";
import { useAbsensiValidation } from "../../../lib/validation/absensiValidation";
import InputCustom from "./../../../components/atoms/InputCustom";
import moment from "moment";

const KelolaAbsensi = () => {
  const router = useNavigate();
  const { control, handleSubmit, watch, setValue } = useAbsensiValidation();

  const params = useParams();
  const idParam = parseInt(params.id);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [dataKehadiran, setDataKehadiran] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedSiswa, setSelectedSiswa] = useState(null);
  const [loadingCreate, setLoadingCreate] = useState(false);

  const openModalAbsensi = (id) => {
    setSelectedSiswa(id);
    console.log(id);
    onOpen();
  };

  const [selectedMeet, setSelectedMeet] = useState({
    siswa: [],
  });

  const handleCreateAbsensi = async (data) => {
    try {
      setLoadingCreate(true);
      await updateKehadiran(
        selectedMeet.siswa.map((item) => ({
          id: item.id,
          tanggal: data.tanggal,
          status: item.status,
        })),
        data.meet,
        idParam
      );
      setLoadingCreate(false);

      onClose();
      handleGetDetailHalaqoh();
    } catch (error) {
      setLoadingCreate(false);
      console.log(error);
    }
  };

  const handleGetDetailHalaqoh = async () => {
    try {
      setLoading(true);
      const [responseDetailHalaqah, responseKehadiran] = await Promise.all([
        getDetailHalaqah(idParam),
        getAllKehadiran(idParam),
      ]);
      setLoading(false);
      setData(responseDetailHalaqah);
      setDataKehadiran(responseKehadiran.kehadiran);
      setSelectedMeet({
        siswa: responseKehadiran.kehadiran.filter(
          (item) => item.meet === "Meet 1"
        ),
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetDetailHalaqoh();
  }, []);

  useEffect(() => {
    setSelectedMeet({
      siswa: dataKehadiran.filter((item) => item.meet === watch("meet")),
    });
    // setValue("tanggal");
    console.log(dataKehadiran.filter((item) => item.meet === watch("meet"))[0]?.tanggal ?? "");
  }, [watch("meet")]);

  const handleChangeStatus = (idKehadiran, status) => {
    const listKehadiran = selectedMeet.siswa;
    console.log(idKehadiran, status);
    listKehadiran[idKehadiran].status = status;
    setSelectedMeet({
      siswa: listKehadiran,
    });
  };

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
            onClick={onOpen}
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
        tbody={data?.siswa?.map((item, idx) => (
          <Tr key={idx}>
            <Td>{idx + 1}</Td>
            <Td>{item.nomor_induk}</Td>
            <Td>{item.nama_siswa}</Td>
            <Td>{item.jenis_kelamin}</Td>

            <Td
              cursor="pointer"
              onClick={() =>
                openModalAbsensi(
                  dataKehadiran.find(
                    (e) => e.user.id === item.siswa_id && e.meet === "Meet 1"
                  )?.id
                )
              }
            >
              {
                dataKehadiran.find(
                  (e) => e.user.id === item.siswa_id && e.meet === "Meet 1"
                )?.status
              }
            </Td>
            <Td
              cursor="pointer"
              onClick={() =>
                openModalAbsensi(
                  dataKehadiran.find(
                    (e) => e.user.id === item.siswa_id && e.meet === "Meet 1"
                  )?.id
                )
              } 
            >
              {
                dataKehadiran.find(
                  (e) => e.user.id === item.siswa_id && e.meet === "Meet 2"
                )?.status
              }
            </Td>
            <Td
              cursor="pointer"
              onClick={() =>
                openModalAbsensi(
                  dataKehadiran.find(
                    (e) => e.user.id === item.siswa_id && e.meet === "Meet 2"
                  )?.id
                )
              }
            >
              {
                dataKehadiran.find(
                  (e) => e.user.id === item.siswa_id && e.meet === "Meet 3"
                )?.status
              }
            </Td>
            <Td
              cursor="pointer"
              onClick={() =>
                openModalAbsensi(
                  dataKehadiran.find(
                    (e) => e.user.id === item.siswa_id && e.meet === "Meet 3"
                  )?.id
                )
              }
            >
              {
                dataKehadiran.find(
                  (e) => e.user.id === item.siswa_id && e.meet === "Meet 4"
                )?.status
              }
            </Td>
            <Td
              cursor="pointer"
              onClick={() =>
                openModalAbsensi(
                  dataKehadiran.find(
                    (e) => e.user.id === item.siswa_id && e.meet === "Meet 4"
                  )?.id
                )
              }
            >
              {
                dataKehadiran.find(
                  (e) => e.user.id === item.siswa_id && e.meet === "Meet 5"
                )?.status
              }
            </Td>

            <Td
              cursor="pointer"
              onClick={() =>
                openModalAbsensi(
                  dataKehadiran.find(
                    (e) => e.user.id === item.siswa_id && e.meet === "Meet 5"
                  )?.id
                )
              }
            >
              {
                dataKehadiran.filter(
                  (e) => e.user.id === item.siswa_id && e.status === "Hadir"
                ).length
              }
            </Td>
            <Td>
              {
                dataKehadiran.filter(
                  (e) => e.user.id === item.siswa_id && e.status === "Izin"
                ).length
              }
            </Td>
            <Td>
              {
                dataKehadiran.filter(
                  (e) => e.user.id === item.siswa_id && e.status === "Sakit"
                ).length
              }
            </Td>
            <Td>
              {
                dataKehadiran.filter(
                  (e) => e.user.id === item.siswa_id && e.status === "Alpha"
                ).length
              }
            </Td>
          </Tr>
        ))}
      />

      {isOpen && (
        <ModalCustom
          isLoading={loadingCreate}
          size="3xl"
          title="Tambah Absensi"
          isOpen={isOpen}
          onClose={onClose}
          onOK={handleSubmit(handleCreateAbsensi)}
        >
          <Box>
            <Grid gridTemplateColumns="1fr 1fr" columnGap={3}>
              <Controller
                name="meet"
                control={control}
                render={({ field, fieldState }) => (
                  <InputCustom
                    label="Pilih Pertemuan"
                    isReq
                    errorText={fieldState?.error?.message}
                    notInputForm={
                      <RadioGroup {...field}>
                        <Stack direction="row">
                          <Radio value="Meet 1">Ke-1</Radio>
                          <Radio value="Meet 2">Ke-2</Radio>
                          <Radio value="Meet 3">Ke-3</Radio>
                          <Radio value="Meet 4">Ke-4</Radio>
                          <Radio value="Meet 5">Ke-5</Radio>
                        </Stack>
                      </RadioGroup>
                    }
                  />
                )}
              />
              <Controller
                name="tanggal"
                control={control}
                render={({ field, fieldState }) => (
                  <InputCustom
                    {...field}
                    errorText={fieldState?.error?.message}
                    typeInput="date"
                    label="Pilih Tanggal"
                    isReq
                  />
                )}
              />
            </Grid>

            <Divider mt={3} borderWidth="1.5px" />
            <TableCustom
              thead={["#", "Nama Siswa", "Keterangan Absensi"]}
              tbody={selectedMeet.siswa.map((item, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{item.user.profile.nama_lengkap}</Td>
                  <Td>
                    <RadioGroup
                      value={item.status}
                      onChange={(e) => handleChangeStatus(index, e)}
                    >
                      <Stack direction="row" justify="space-around">
                        <Radio value="Hadir">Hadir</Radio>
                        <Radio value="Izin">Izin</Radio>
                        <Radio value="Sakit">Sakit</Radio>
                        <Radio value="Alpha">Alpha</Radio>
                      </Stack>
                    </RadioGroup>
                  </Td>
                </Tr>
              ))}
            />
          </Box>
        </ModalCustom>
      )}
    </>
  );
};

export default KelolaAbsensi;
