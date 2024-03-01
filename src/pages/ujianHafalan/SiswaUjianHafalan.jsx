import { AddIcon, ArrowBackIcon, Icon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Flex,
  Grid,
  InputLeftAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import AlertConfirm from "../../components/atoms/AlertDialog";
import ButtonCustom from "../../components/atoms/ButtonCustom";
import InfoProfile from "../../components/atoms/InfoProfile";
import ModalCustom from "../../components/atoms/ModalCustom";
import Header from "../../components/molekuls/Header";
import TableCustom from "../../components/molekuls/TableCustom";
import { getDetailHalaqah } from "../../lib/api/halaqoh";
import {
  createUjian,
  deleteUjian,
  getAllUjian,
  getDetailUjian,
  updateUjian,
} from "../../lib/api/ujian";
import { getAllGuru } from "../../lib/api/users";
import { useUjianValidation } from "../../lib/validation/ujianValidation";
import InputCustom from "./../../components/atoms/InputCustom";

const SiswaUjianHafalan = () => {
  let { id, nama_siswa, siswa_id } = useParams();
  const { control, handleSubmit, reset, getValues, setValue } =
    useUjianValidation();

  const toast = useToast();
  const router = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onClose: closeAlert,
    onOpen: openAlert,
  } = useDisclosure();
  const [selectedId, setSelectedId] = useState();
  const [loadingDelete, setLoadingDelete] = useState(false);
  const opeModalUpdate = (id) => {
    setSelectedId(id);
    onOpen();
  };

  const closeModal = () => {
    setSelectedId(null);
    reset({
      juz: "",
      kesalahan_hafalan: 0,
      kesalahan_tajwid: 0,
      keterangan: null,
      nilai_hafalan: 0,
      nilai_tajwid: 0,
      penguji: null,
      tanggal: "",
      total_nilai: 0,
    });
    onClose();
  };

  const onOpenAlertConfirm = (id) => {
    setSelectedId(id);
    openAlert();
  };

  const handleDeleteUjian = async () => {
    try {
      setLoadingDelete(true);
      const response = await deleteUjian(selectedId);
      setLoadingDelete(false);
      closeAlert();
      fetchAllUjian();
      toast({
        title: response.message,
        status: "success",
        position: "top",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [dataGuru, setDataGuru] = useState([]);

  const [data, setData] = useState({});
  const [dataUjian, setDataUjian] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  const handleSubmitUjian = async (data) => {
    try {
      if (selectedId) {
        setLoadingCreate(true);
        const response = await updateUjian({
          tanggal: data.tanggal,
          juz: data.juz,
          kesalahan_hafalan: data.kesalahan_hafalan,
          kesalahan_tajwid: data.kesalahan_tajwid,
          nilai_hafalan: data.nilai_hafalan,
          nilai_tajwid: data.nilai_tajwid,
          total_nilai: data.total_nilai,
          keterangan: data.keterangan.value,
          penguji: data.penguji.label,
          siswaId: siswa_id,
          halaqohId: id,
        },selectedId);
        setLoadingCreate(false);
        closeModal();
        fetchAllUjian();
        toast({
          title: response.message,
          status: "success",
          position: "top",
        });
      } else {
        setLoadingCreate(true);
        const response = await createUjian({
          tanggal: data.tanggal,
          juz: data.juz,
          kesalahan_hafalan: data.kesalahan_hafalan,
          kesalahan_tajwid: data.kesalahan_tajwid,
          nilai_hafalan: data.nilai_hafalan,
          nilai_tajwid: data.nilai_tajwid,
          total_nilai: data.total_nilai,
          keterangan: data.keterangan.value,
          penguji: data.penguji.label,
          siswaId: siswa_id,
          halaqohId: id,
        });
        setLoadingCreate(false);
        closeModal();
        fetchAllUjian();
        toast({
          title: response.message,
          status: "success",
          position: "top",
        });
      }
          
    } catch (error) {
      setLoadingCreate(false);
      console.log(error);
    }
  };

  const fetchAllUjian = async () => {
    try {
      const response = await getAllUjian(siswa_id);
      setDataUjian(response.ujian);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUjianDetail = async () => {
    try {
      const response = await getDetailUjian(selectedId);
      reset({
        ...response.ujian,
        tanggal: moment(response.ujian.tanggal).format("YYYY-MM-DD"),
        penguji: {
          value: response.ujian.penguji,
          label: response.ujian.penguji,
        },
        keterangan: {
          value: response.ujian.keterangan,
          label: response.ujian.keterangan,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [responseDetailHalaqah, responseDataGuru] = await Promise.all([
          getDetailHalaqah(id),
          getAllGuru(),
        ]);
        setLoading(false);
        setData(responseDetailHalaqah);
        setDataGuru(
          responseDataGuru.users.map((item) => ({
            value: item.profile.nama_lengkap,
            label: item.profile.nama_lengkap,
          }))
        );
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    if (isOpen && selectedId) {
      fetchUjianDetail();
    }

    fetchData();
    fetchAllUjian();
  }, [selectedId]);

  return (
    <>
      <Header title="UJIAN HAFALAN">
        <ButtonCustom
          icon={<ArrowBackIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Kembali"
          onClick={() => router("/ujian-hafalan/kelola-hafalan")}
          type="outline"
        />
      </Header>
      <Flex mt={8} justifyContent="space-between" alignItems="center" gap={4}>
        <Flex borderLeft="4px solid #0D6EFD" direction="column">
          <InfoProfile title="Nama Siswa" value={nama_siswa} isLine={false} />
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
        <ButtonCustom
          icon={<AddIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Tambah Ujian Baru"
          onClick={onOpen}
        />
      </Flex>

      <TableCustom
        isLoading={loading}
        thead={[
          "#",
          "Tanggal",
          "Penguji",
          "Ujian Juz",
          "Nilai Hafalan",
          "Nilai Tajwid",
          "Total Nilai",
          "Keterangan",
          "Aksi",
        ]}
        tbody={
          <>
            {!dataUjian.length && (
              <Tr>
                <Td colSpan={9} textAlign="center">
                  Data Not Found
                </Td>
              </Tr>
            )}
            {dataUjian?.map((item, idx) => (
              <Tr key={idx}>
                <Td>{idx + 1}</Td>
                <Td>{moment(item.tanggal).format("ll")}</Td>
                <Td>{item.penguji}</Td>
                <Td>{item.juz}</Td>
                <Td>{item.nilai_hafalan}</Td>
                <Td>{item.nilai_tajwid}</Td>
                <Td>{item.total_nilai}</Td>
                <Td>
                  <Badge
                    color="white"
                    px={2}
                    py={0}
                    rounded="xl"
                    bg={
                      item.keterangan === "Lulus"
                        ? "#0D6EFD"
                        : item.keterangan === "Tidak Lulus"
                        ? "#DC3545"
                        : ""
                    }
                  >
                    {item.keterangan}
                  </Badge>
                </Td>
                <Td>
                  <Menu>
                    <MenuButton
                      height={8}
                      as={Button}
                      width={8}
                      rightIcon={
                        <Icon viewBox="0 0 16 16" style={{ marginRight: 8 }}>
                          <path
                            d="M9.5 12.9991C9.5 13.397 9.34196 13.7785 9.06066 14.0598C8.77936 14.3411 8.39782 14.4991 8 14.4991C7.60218 14.4991 7.22064 14.3411 6.93934 14.0598C6.65804 13.7785 6.5 13.397 6.5 12.9991C6.5 12.6013 6.65804 12.2198 6.93934 11.9385C7.22064 11.6572 7.60218 11.4991 8 11.4991C8.39782 11.4991 8.77936 11.6572 9.06066 11.9385C9.34196 12.2198 9.5 12.6013 9.5 12.9991ZM9.5 7.99915C9.5 8.39697 9.34196 8.7785 9.06066 9.05981C8.77936 9.34111 8.39782 9.49915 8 9.49915C7.60218 9.49915 7.22064 9.34111 6.93934 9.05981C6.65804 8.7785 6.5 8.39697 6.5 7.99915C6.5 7.60132 6.65804 7.21979 6.93934 6.93849C7.22064 6.65718 7.60218 6.49915 8 6.49915C8.39782 6.49915 8.77936 6.65718 9.06066 6.93849C9.34196 7.21979 9.5 7.60132 9.5 7.99915ZM9.5 2.99915C9.5 3.39697 9.34196 3.7785 9.06066 4.05981C8.77936 4.34111 8.39782 4.49915 8 4.49915C7.60218 4.49915 7.22064 4.34111 6.93934 4.05981C6.65804 3.7785 6.5 3.39697 6.5 2.99915C6.5 2.60132 6.65804 2.21979 6.93934 1.93849C7.22064 1.65718 7.60218 1.49915 8 1.49915C8.39782 1.49915 8.77936 1.65718 9.06066 1.93849C9.34196 2.21979 9.5 2.60132 9.5 2.99915Z"
                            fill="black"
                          />
                        </Icon>
                      }
                    ></MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => opeModalUpdate(item.id)}>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => onOpenAlertConfirm(item.id)}>
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
          title="Penilaian Ujian Hafalan"
          isLoading={loadingCreate}
          buttonName={selectedId ? "Update" : "Simpan"}
          isOpen={isOpen}
          onClose={closeModal}
          size="3xl"
          onOK={handleSubmit(handleSubmitUjian)}
        >
          <Flex borderLeft="4px solid #0D6EFD" direction="column">
            <InfoProfile title="Nama Siswa" value={nama_siswa} isLine={false} />
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
          <Grid mt={4} gridTemplateColumns="1fr 1fr" columnGap={4}>
            <Controller
              name="tanggal"
              control={control}
              render={({ field, fieldState }) => (
                <InputCustom
                  {...field}
                  label="Hari/Tanggal"
                  placeholder="Pilih Tanggal"
                  errorText={fieldState?.error?.message}
                  isReq
                  typeInput="date"
                />
              )}
            />
            <Controller
              name="juz"
              control={control}
              render={({ field, fieldState }) => (
                <InputCustom
                  {...field}
                  label="Ujian Juz (Juz Ke-)"
                  errorText={fieldState?.error?.message}
                  placeholder="Tulis Juz Dalam Bentuk Angka"
                  isReq
                  typeInput="number"
                  leftAddon={<InputLeftAddon>Juz Ke-</InputLeftAddon>}
                />
              )}
            />

            <Controller
              name="kesalahan_hafalan"
              control={control}
              defaultValue={10}
              render={({ field }) => (
                <InputCustom
                  {...field}
                  label="Kesalahan Hafalan"
                  textAlign="center"
                  typeInput="number"
                  value={field.value}
                  leftAddon={
                    <InputLeftAddon
                      cursor="pointer"
                      onClick={() => {
                        const value =
                          parseInt(getValues("kesalahan_hafalan")) - 1;
                        if (value >= 0) {
                          setValue("kesalahan_hafalan", value);
                        }
                      }}
                    >
                      -
                    </InputLeftAddon>
                  }
                  rightAddon={"+"}
                  onClickRigtAddon={() => {
                    const value = parseInt(getValues("kesalahan_hafalan")) + 1;
                    if (value >= 0) {
                      setValue("kesalahan_hafalan", value);
                    }
                  }}
                />
              )}
            />

            <Controller
              name="kesalahan_tajwid"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <InputCustom
                  {...field}
                  label="Kesalahan Tajwid"
                  textAlign="center"
                  typeInput="number"
                  value={field.value}
                  leftAddon={
                    <InputLeftAddon
                      cursor="pointer"
                      onClick={() => {
                        const value =
                          parseInt(getValues("kesalahan_tajwid")) - 1;
                        if (value >= 0) {
                          setValue("kesalahan_tajwid", value);
                        }
                      }}
                    >
                      -
                    </InputLeftAddon>
                  }
                  rightAddon={"+"}
                  onClickRigtAddon={() => {
                    const value = parseInt(getValues("kesalahan_tajwid")) + 1;
                    if (value >= 0) {
                      setValue("kesalahan_tajwid", value);
                    }
                  }}
                />
              )}
            />
          </Grid>
          <Grid gridTemplateColumns="1fr 1fr 1fr" columnGap={3}>
            <Controller
              name="nilai_hafalan"
              control={control}
              render={({ field }) => (
                <InputCustom
                  {...field}
                  label="Nilai Hafalan"
                  placeholder="0"
                  typeInput="number"
                  bgInput="#E9ECEF"
                />
              )}
            />

            <Controller
              name="nilai_tajwid"
              control={control}
              render={({ field }) => (
                <InputCustom
                  {...field}
                  label="Nilai Tajwid"
                  placeholder="0"
                  typeInput="number"
                  bgInput="#E9ECEF"
                />
              )}
            />
            <Controller
              name="total_nilai"
              control={control}
              render={({ field }) => (
                <InputCustom
                  {...field}
                  label="Total Nilai"
                  placeholder="0"
                  typeInput="number"
                  bgInput="#E9ECEF"
                />
              )}
            />
          </Grid>
          <Grid gridTemplateColumns="1fr 1fr" columnGap={4}>
            <Controller
              name="keterangan"
              control={control}
              render={({ field, fieldState }) => (
                <InputCustom
                  label="Keterangan"
                  isReq
                  errorText={fieldState?.error?.message}
                  notInputForm={
                    <Select
                      {...field}
                      placeholder="Pilih Keterangan"
                      options={[
                        { label: "Lulus", value: "Lulus" },
                        { label: "Tidak Lulus", value: "Tidak Lulus" },
                      ]}
                    />
                  }
                />
              )}
            />

            <Controller
              name="penguji"
              control={control}
              render={({ field, fieldState }) => (
                <InputCustom
                  label="Penguji"
                  isReq
                  errorText={fieldState?.error?.message}
                  notInputForm={
                    <Select
                      {...field}
                      placeholder="Pilih Nama Penguji"
                      options={dataGuru}
                    />
                  }
                />
              )}
            />
          </Grid>
        </ModalCustom>
      )}

      {isOpenAlert && (
        <AlertConfirm
          isOpen={isOpenAlert}
          onClose={closeAlert}
          isLoading={loadingDelete}
          onOK={handleDeleteUjian}
          title="Hapus Data"
          subTitle="Apakah anda yakin ingin menghapus data ?"
        />
      )}
    </>
  );
};

export default SiswaUjianHafalan;
