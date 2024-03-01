import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/molekuls/Header";
import { ArrowBackIcon, AddIcon } from "@chakra-ui/icons";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import {
  Flex,
  Grid,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Radio,
  RadioGroup,
  Stack,
  Td,
  Text,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import InfoProfile from "../../../components/atoms/InfoProfile";
import { useEffect, useState } from "react";
import {
  cretaHafalan,
  deleteHafalan,
  getAllHafalan,
  getDetailHafalan,
  updateHafalan,
} from "../../../lib/api/hafalan";
import { getDetailHalaqah } from "../../../lib/api/halaqoh";
import { getSurahList } from "../../../lib/api/quranlist";
import { useHafalanValidation } from "../../../lib/validation/hafalanValidation";
import moment from "moment";
import TableCustom from "../../../components/molekuls/TableCustom";
import { CiMenuKebab } from "react-icons/ci";
import AlertConfirm from "../../../components/atoms/AlertDialog";
import { Controller } from "react-hook-form";
import InputCustom from "../../../components/atoms/InputCustom";
import ModalCustom from "../../../components/atoms/ModalCustom";
import Select from 'react-select'

const SiswaMurojaah = () => {
  let { id, siswa_id, nama_siswa } = useParams();
  const { control, handleSubmit, reset } = useHafalanValidation();
  const toast = useToast();
  const router = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataHalaqoh, setDataHalaqoh] = useState({});
  const [idHafalan, setIdHafalan] = useState(null);
  const [optionSurah, setOptionSurah] = useState([]);
  const [loadingCreate, setLoadingCreate] = useState(false);

  // POST
  const handleAddHafalan = async (data) => {
    try {
      if (idHafalan) {
        setLoadingCreate(true);
        const response = await updateHafalan(
          {
            surat_awal: data.surat_awal.value,
            surat_akhir: data.surat_akhir.value,
            nilai_hafalan: data.nilai_hafalan,
            nilai_tajwid: data.nilai_tajwid,
            baris: data.baris + " Baris",
            ayat_awal: data.ayat_awal,
            ayat_akhir: data.ayat_akhir,
            siswaId: siswa_id,
            halaqohId: id,
            tanggal: data.tanggal,
          },
          idHafalan
        );
        toast({
          title: response.message,
          status: "success",
          position: "top",
        });
        setLoadingCreate(false);
      } else {
        setLoadingCreate(true);
        const response = await cretaHafalan(
          {
            surat_awal: data.surat_awal.value,
            surat_akhir: data.surat_akhir.value,
            nilai_hafalan: data.nilai_hafalan,
            nilai_tajwid: data.nilai_tajwid,
            baris: data.baris + " Baris",
            ayat_awal: data.ayat_awal,
            ayat_akhir: data.ayat_akhir,
            siswaId: siswa_id,
            halaqohId: id,
            tanggal: data.tanggal,
          },
          "manzil"
        );
        setLoadingCreate(false);
        toast({
          title: response.message,
          status: "success",
          position: "top",
        });
      }
      reset({
        ayat_akhir: "",
        baris: "",
        ayat_awal: "",
        nilai_hafalan: "",
        nilai_tajwid: "",
        surat_akhir: "",
        surat_awal: "",
        tanggal: "",
      });
      onClose();
      fetchData();
    } catch (error) {
      console.log(error);
      setLoadingCreate(false);
    }
  };

  // UPDATE
  const openModalUpdate = async (id) => {
    setIdHafalan(id);
    try {
      const response = await getDetailHafalan(id);
      reset({
        ...response.hafalan,
        tanggal: moment(response.hafalan.tanggal).format("YYYY-MM-DD"),
        surat_awal: {
          label: response.hafalan.surat_awal,
          value: response.hafalan.surat_awal,
        },
        surat_akhir: {
          label: response.hafalan.surat_akhir,
          value: response.hafalan.surat_akhir,
        },
      });
    } catch (error) {
      console.log(error);
    }

    onOpen();
  };
  const closeModal = () => {
    setIdHafalan(null);
    reset({
      baris: "",
      ayat_awal: "",
      ayat_akhir: "",
      surat_awal: null,
      surat_akhir: null,
      nilai_hafalan: "",
      nilai_tajwid: "",
      tanggal: "",
    });
    onClose();
  };

  // DELETE
  const {
    isOpen: isOpenAlert,
    onClose: closeAlert,
    onOpen: onOpenAlert,
  } = useDisclosure();

  const openAlert = (id) => {
    setIdHafalan(id);
    onOpenAlert();
  };

  const [loadingDelete, setLoadingDelete] = useState(false);
  const handleDeleteHafalan = async () => {
    try {
      setLoadingDelete(true);
      const response = await deleteHafalan(idHafalan);
      setLoadingDelete(false);
      closeAlert();
      toast({
        title: response.message,
        status: "success",
        position: "top",
      });
      fetchData();
    } catch (error) {
      console.log(error);
      setLoadingDelete(false);
    }
  };

  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const [responseHafalan, responseHalaqah, responseSurahList] =
        await Promise.all([
          getAllHafalan(siswa_id,"manzil"),
          getDetailHalaqah(id),
          getSurahList(),
        ]);
      setOptionSurah(
        responseSurahList.data.map((item) => ({
          label: item.name.transliteration.id,
          value: item.name.transliteration.id,
        }))
      );
      setLoading(false);
      setData(responseHafalan.hafalan);
      setDataHalaqoh(responseHalaqah);
      console.log(responseSurahList);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading....</Text>;
  }

  return (
    <>
      <Header title="HAFALAN BARU (MANZIL)">
        <ButtonCustom
          icon={<ArrowBackIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Kembali"
          onClick={() => router("/hafalan/murojaah-(manzil)/kelola-hafalan")}
          type="outline"
        />
      </Header>
      <Flex mt={8} justifyContent="space-between" alignItems="center" gap={4}>
        <Flex borderLeft="4px solid #0D6EFD" direction="column">
          <InfoProfile title="Nama Siswa" value={nama_siswa} isLine={false} />
          <InfoProfile
            title="Nama Halaqoh"
            value={dataHalaqoh?.nama_halaqoh}
            isLine={false}
          />

          <InfoProfile
            title="Tahun Ajaran"
            value={dataHalaqoh?.tahun_ajaran?.nama_tahun_ajaran}
            isLine={false}
          />

          <InfoProfile
            title="Nama Guru"
            value={dataHalaqoh?.nama_guru}
            isLine={false}
          />
        </Flex>
        <ButtonCustom
          icon={<AddIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Tambah Murojaah Baru"
          onClick={onOpen}
        />
      </Flex>
      <TableCustom
        thead={[
          "#",
          "Tanggal",
          "Surat Awal",
          "Ayat Awal",
          "Surat Akhir",
          "Ayat Akhir",
          "Jumlah Baris",
          "Nilai Hafalan",
          "Nilai Tajwid",
          "Aksi",
        ]}
        tbody={
          <>
            {!data.length && (
              <Tr>
                <Td colSpan={9} textAlign="center">Data Not Found</Td>
              </Tr>
            )}
            {data?.map((item, idx) => (
              <Tr key={idx}>
                <Td>{idx + 1}</Td>
                <Td>{moment(item.tanggal).format("ll")}</Td>
                <Td>{item.surat_awal}</Td>
                <Td>{item.ayat_awal}</Td>
                <Td>{item.surat_akhir}</Td>
                <Td>{item.ayat_akhir}</Td>
                <Td>{item.baris}</Td>
                <Td>{item.nilai_hafalan}</Td>
                <Td>{item.nilai_tajwid}</Td>
                <Td>
                  <Menu>
                    <MenuButton>
                      <IconButton
                        size="sm"
                        icon={<CiMenuKebab size={20} />}
                        aria-label="aksi"
                      />
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => openModalUpdate(item.id)}>
                        Update
                      </MenuItem>
                      <MenuItem onClick={() => openAlert(item.id)}>
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </>
        }
      />

      {isOpen && (
        <ModalCustom
          onOK={handleSubmit(handleAddHafalan)}
          title="HAFALAN BARU (MANZIL)"
          isOpen={isOpen}
          onClose={closeModal}
          isLoading={loadingCreate}
        >
          <Flex borderLeft="4px solid #0D6EFD" direction="column">
            <InfoProfile title="Nama Siswa" value={nama_siswa} isLine={false} />
            <InfoProfile
              title="Nama Halaqoh"
              value={dataHalaqoh?.nama_halaqoh}
              isLine={false}
            />
            <InfoProfile
              title="Tahun Ajaran"
              value={dataHalaqoh?.tahun_ajaran?.nama_tahun_ajaran}
              isLine={false}
            />
            <InfoProfile
              title="Nama Guru"
              value={dataHalaqoh?.nama_guru}
              isLine={false}
            />
          </Flex>

          <Grid gridTemplateColumns="repeat(2, 1fr)" mt={8} gap={3}>
            <Stack spacing={0}>
              <Controller
                control={control}
                name="tanggal"
                render={({ field, fieldState }) => (
                  <InputCustom
                    label="Hari/Tanggal"
                    isReq
                    {...field}
                    errorText={fieldState?.error?.message}
                    typeInput="date"
                  />
                )}
              />

              <Controller
                name="surat_awal"
                control={control}
                render={({ field, fieldState }) => (
                  <InputCustom
                    label="Surat Awal"
                    isReq
                    errorText={fieldState?.error?.message}
                    notInputForm={
                      <Select
                        {...field}
                        isClearable
                        placeholder="Surat awal"
                        options={optionSurah}
                      />
                    }
                  />
                )}
              />

              <Controller
                name="surat_akhir"
                control={control}
                render={({ field, fieldState }) => (
                  <InputCustom
                    label="Surat Akhir"
                    isReq
                    errorText={fieldState?.error?.message}
                    notInputForm={
                      <Select
                        {...field}
                        isClearable
                        placeholder="Surat akhir"
                        options={optionSurah}
                      />
                    }
                  />
                )}
              />

              <Controller
                control={control}
                name="nilai_hafalan"
                render={({ field, fieldState }) => (
                  <InputCustom
                    label="Nilai Hafalan"
                    placeholder="Nilai Hafalan"
                    isReq
                    errorText={fieldState?.error?.message}
                    notInputForm={
                      <RadioGroup {...field}>
                        <Stack direction="row">
                          <Radio value="A">A</Radio>
                          <Radio value="B">B</Radio>
                          <Radio value="C">C</Radio>
                          <Radio value="D">D</Radio>
                        </Stack>
                      </RadioGroup>
                    }
                  />
                )}
              />
            </Stack>
            <Stack spacing={0}>
              <Controller
                control={control}
                name="baris"
                render={({ field, fieldState }) => (
                  <InputCustom
                    {...field}
                    label="Jumlah Baris Yang Di Hafal"
                    isReq
                    errorText={fieldState?.error?.message}
                    typeInput="text"
                    rightAddon="Baris"
                    placeholder="Baris"
                  />
                )}
              />

              <Controller
                control={control}
                name="ayat_awal"
                render={({ field, fieldState }) => (
                  <InputCustom
                    label="Ayat Awal"
                    {...field}
                    errorText={fieldState?.error?.message}
                    placeholder="Ayat Awal"
                    isReq
                    typeInput="text"
                  />
                )}
              />

              <Controller
                control={control}
                name="ayat_akhir"
                render={({ field, fieldState }) => (
                  <InputCustom
                    label="Ayat Akhir"
                    {...field}
                    errorText={fieldState?.error?.message}
                    placeholder="Ayat Akhir"
                    isReq
                    typeInput="text"
                  />
                )}
              />

              <Controller
                control={control}
                name="nilai_tajwid"
                render={({ field, fieldState }) => (
                  <InputCustom
                    label="Nilai Tajwid"
                    placeholder="Nilai tajwid"
                    isReq
                    errorText={fieldState?.error?.message}
                    notInputForm={
                      <RadioGroup {...field}>
                        <Stack direction="row">
                          <Radio value="A">A</Radio>
                          <Radio value="B">B</Radio>
                          <Radio value="C">C</Radio>
                          <Radio value="D">D</Radio>
                        </Stack>
                      </RadioGroup>
                    }
                  />
                )}
              />
            </Stack>
          </Grid>
        </ModalCustom>
      )}

      {isOpenAlert && (
        <AlertConfirm
          isOpen={isOpenAlert}
          onClose={closeAlert}
          title="Hapus Data"
          subTitle={"Apakah anda yakin ingin menghapus data ?"}
          isLoading={loadingDelete}
          onOK={handleDeleteHafalan}
        />
      )}
    </>
  );
};

export default SiswaMurojaah;
