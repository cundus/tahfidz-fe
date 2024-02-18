import { ArrowBackIcon, InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Grid,
  Icon,
  Image,
  Input,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { FaRegTrashCan } from "react-icons/fa6";
import { PiUploadSimpleLight } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import InputCustom from "../../../components/atoms/InputCustom";
import BoxInputLayout from "../../../components/molekuls/BoxInputLayout";
import Header from "../../../components/molekuls/Header";
import { getDetailUser, updateUser } from "../../../lib/api/users";
import { useSiswaValidation } from "../../../lib/validation/userValidation";
import moment from "moment";

const EditSiswa = () => {
  const router = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    register,
    reset,
    formState: { errors },
    getValues,

    // setError
  } = useSiswaValidation("edit");

  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const params = useParams();
  const idParams = parseInt(params.id);

  // state menangkap input gambar dari file
  const [selectedGambarUrl, setSelectedGambarUrl] = useState("");
  const [selectedImage, seSelectedImage] = useState();

  function handleChangeGambar(e) {
    if (e.target.files && e.target.files[0]) {
      const fileImage = e.target.files[0];
      seSelectedImage(fileImage);
      setValue("foto", fileImage);
      const imgUrl = URL.createObjectURL(fileImage);
      setSelectedGambarUrl(imgUrl);
    }
  }

  const handleUpdateSiswa = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      Object.entries(data).map(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("role", "siswa");
      await updateUser(formData, idParams);
      setIsLoading(false);
      router("/master-data/data-siswa");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleGetDetailSiswa = async () => {
    try {
      const response = await getDetailUser(idParams);
      reset({
        username: response.data.user.username,
        ...response.data.user.profile,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetDetailSiswa();
  }, [idParams]);

  return (
    <>
      <Header title="EDIT DATA SISWA">
        <ButtonCustom
          icon={<ArrowBackIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Kembali"
          onClick={() => router("/master-data/data-siswa")}
          type="outline"
        />
      </Header>
      <BoxInputLayout title="Edit Data Siswa">
        <Text fontSize="14px" color="#6C757D">
          Silahkan ubah data di bawah untuk mengedit data siswa
        </Text>
        <Flex gap="16px" mt="32px" alignItems="center">
          <Image
            src={
              getValues("foto")
                ? getValues("foto")
                : selectedImage && selectedGambarUrl !== "" && selectedGambarUrl
            }
            border="1px solid #DEE2E6"
            w="100px"
            h="100px"
          />
          <Flex flexDirection="column" gap={4}>
            <ButtonCustom
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.click();
                }
              }}
              title="Unggah Foto Profil"
              icon={<Icon as={PiUploadSimpleLight} w={5} mr={2} h={5} />}
            />

            <Input
              type="file"
              {...register("foto")}
              accept="image/*"
              name="foto"
              display="none"
              onChange={handleChangeGambar}
              ref={inputRef}
            />

            <ButtonCustom
              title="Hapus Foto Profil"
              onClick={() => {
                seSelectedImage(null);
                setSelectedGambarUrl("");
              }}
              bgColor="#DC3545"
              _hover={{ opacity: "0.8" }}
              isDisabled={false}
              icon={<Icon as={FaRegTrashCan} w={5} mr={2} h={5} />}
            />
          </Flex>
          <Box
            borderRadius="4px"
            border="1px solid #FDFDFE"
            background="#FEFEFE"
            p="16px"
          >
            <Text fontSize="16px" maxW="24rem">
              Format file yang diizinkan{" "}
              <strong style={{ color: "#DC3545" }}>*</strong>
              .JPEG, <strong style={{ color: "#DC3545" }}>*</strong>.JPG, dan
              <strong style={{ color: "#DC3545" }}> *</strong>.PNG Ukuran
              Maksimum <strong>1 MB</strong>.
            </Text>
          </Box>
        </Flex>
        {errors.foto && (
          <Flex align="center" mt={2} gap={1}>
            <InfoIcon color="red.500" />
            <Text color="red.500" fontSize="sm">
              {errors.foto.message}
            </Text>
          </Flex>
        )}
        <Box position="relative" mt="52px" mb="24px">
          <Divider
            variant="dashed"
            bgColor="rgba(33, 37, 41, 0.25)"
            orientation="horizontal"
          />
          <Text
            css={{ position: "absolute", top: -12, left: "2.5rem" }}
            bg="#F8F9FA"
            px="4"
          >
            Informasi Data Diri Siswa
          </Text>
        </Box>
        <Grid templateColumns="repeat(4, 1fr)" gap="16px">
          <Controller
            control={control}
            name="nama_lengkap"
            render={({ field, fieldState }) => (
              <InputCustom
                defaultValue={getValues("nama_lengkap")}
                typeInput="text"
                placeholder="Nama Lengkap"
                label="Nama Lengkap"
                name="nama_lengkap"
                isReq={true}
                errorText={fieldState.error?.message}
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="username"
            render={({ field, fieldState }) => (
              <InputCustom
                typeInput="text"
                placeholder="Username"
                defaultValue={getValues("username")}
                label="Username"
                name="username"
                isReq={true}
                errorText={fieldState.error?.message}
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            disabled={true}
            name="password"
            render={({ field }) => (
              <InputCustom
                typeInput="password"
                placeholder="Password"
                label="Password"
                name="password"
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            disabled={true}
            name="konfirmasi_password"
            render={({ field }) => (
              <InputCustom
                typeInput="password"
                placeholder="Konfirmasi Password"
                label="Konfirmasi Password"
                name="konfirmasi_password"
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="nomor_induk"
            render={({ field, fieldState }) => (
              <InputCustom
                placeholder="NIS"
                name="nomor_induk"
                defaultValue={getValues("nomor_induk")}
                isReq={true}
                errorText={fieldState.error?.message}
                {...field}
                label="No Induk Siswa"
                leftAddon={
                  <InputLeftAddon
                    bg="#E9ECEF"
                    px="4"
                    border="1px solid #CED4DA"
                  >
                    SRQAI
                  </InputLeftAddon>
                }
              />
            )}
          />

          <Controller
            control={control}
            name="tempat_lahir"
            render={({ field, fieldState }) => (
              <InputCustom
                typeInput="text"
                defaultValue={getValues("tempat_lahir")}
                placeholder="Tempat Lahir"
                label="Tempat Lahir"
                name="tempat_lahir"
                errorText={fieldState.error?.message}
                {...field}
                isReq={true}
              />
            )}
          />

          <Controller
            control={control}
            name="tanggal_lahir"
            render={({ field, fieldState }) => {
              const date = getValues("tanggal_lahir");
              const formatDate = moment(date).format("YYYY-MM-DD");
              return (
                <InputCustom
                  typeInput="date"
                  label="Tanggal Lahir"
                  placeholder="Pilih Tanggal"
                  defaultValue={formatDate}
                  name="tanggal_lahir"
                  isReq={true}
                  errorText={fieldState.error?.message}
                  {...field}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="jenis_kelamin"
            render={({ field, fieldState }) => (
              <InputCustom
                label="Jenis Kelamin"
                errorText={fieldState.error?.message}
                isReq={true}
                notInputForm={
                  <RadioGroup
                    name="jenis_kelamin"
                    {...field}
                    defaultValue={getValues("jenis_kelamin")}
                  >
                    <Stack direction="row">
                      <Radio bgColor="white" value="L">
                        Laki-laki
                      </Radio>
                      <Radio bgColor="white" value="P">
                        Perempuan
                      </Radio>
                    </Stack>
                  </RadioGroup>
                }
              />
            )}
          />
        </Grid>

        <Controller
          control={control}
          name="alamat"
          render={({ field }) => (
            <InputCustom
              label="Alamat Lengkap"
              name="alamat"
              notInputForm={
                <Textarea
                  defaultValue={getValues("alamat")}
                  bgColor="white"
                  name="alamat"
                  placeholder="Alamat Lengkap"
                  {...field}
                />
              }
            />
          )}
        />

        <Box position="relative" mt="40px" mb="40px">
          <Divider
            variant="dashed"
            bgColor="rgba(33, 37, 41, 0.25)"
            orientation="horizontal"
          />
          <Text
            css={{ position: "absolute", top: -12, left: "2.5rem" }}
            bg="#F8F9FA"
            px="4"
          >
            Informasi Data Diri Orang Tua Siswa
          </Text>
        </Box>
        <Grid templateColumns="repeat(3, 1fr)" gap="16px">
          <Controller
            control={control}
            name="nama_ayah"
            render={({ field, fieldState }) => (
              <InputCustom
                typeInput="text"
                defaultValue={getValues("nama_ayah")}
                placeholder="Nama Ayah"
                label="Nama Ayah"
                name="nama_ayah"
                errorText={fieldState.error?.message}
                {...field}
                isReq={true}
              />
            )}
          />

          <Controller
            control={control}
            name="nomor_telepon_ayah"
            render={({ field }) => (
              <InputCustom
                typeInput="text"
                placeholder="Nomor Telepon Ayah"
                defaultValue={getValues("nomor_telepon_ayah")}
                label="Nomor Telepon Ayah"
                name="nomor_telepon_ayah"
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="pekerjaan_ayah"
            render={({ field }) => (
              <InputCustom
                typeInput="text"
                placeholder="Pekerjaan Ayah"
                defaultValue={getValues("pekerjaan_ayah")}
                label="Pekerjaan Ayah"
                name="pekerjaan_ayah"
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="nama_ibu"
            render={({ field, fieldState }) => (
              <InputCustom
                typeInput="text"
                placeholder="Nama Ibu"
                defaultValue={getValues("nama_ibu")}
                label="Nama Ibu"
                name="nama_ibu"
                errorText={fieldState.error?.message}
                {...field}
                isReq={true}
              />
            )}
          />

          <Controller
            control={control}
            name="nomor_telepon_ibu"
            render={({ field }) => (
              <InputCustom
                typeInput="text"
                placeholder="Nomor Telepon Ibu"
                defaultValue={getValues("nomor_telepon_ibu")}
                label="Nomor Telepon Ibu"
                name="nomor_telepon_ibu"
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="pekerjaan_ibu"
            render={({ field }) => (
              <InputCustom
                typeInput="text"
                placeholder="Pekerjaan Ibu"
                label="Pekerjaan Ibu"
                name="pekerjaan_ibu"
                defaultValue={getValues("pekerjaan_ibu")}
                {...field}
              />
            )}
          />
        </Grid>
        <Flex justifyContent="space-between" mt="12px" gap={4}>
          <Flex flexDirection="column" gap="1px">
            <Text fontSize="16px" fontWeight={600} color="#000">
              Status
            </Text>
            <Text fontSize="14px" color="#000">
              Anda dapat memilih ingin mengaktifkan atau menonaktifkan
            </Text>
          </Flex>

          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Switch
                {...register("status")}
                color="#0D6EFD"
                name="status"
                {...field}
              />
            )}
          />
        </Flex>
        <Flex justifyContent="flex-end" gap={4} alignItems="center" mt={12}>
          <ButtonCustom
            onClick={() => router("/master-data/data-siswa")}
            title="Batal"
            type="outline"
            color="#DC3545"
            borderColor="#DC3545"
            _hover={{ bgColor: "#DC3545", color: "white" }}
            w="100px"
            bgColor="transparent"
          />
          <ButtonCustom
            onClick={handleSubmit(handleUpdateSiswa, (err) => console.log(err))}
            typeButton="submit"
            title="Edit"
            _hover={{ opacity: "0.8" }}
            bgColor="#0B5ED7"
            color="#FFF"
            isLoading={isLoading}
          />
        </Flex>
      </BoxInputLayout>
    </>
  );
};

export default EditSiswa;
