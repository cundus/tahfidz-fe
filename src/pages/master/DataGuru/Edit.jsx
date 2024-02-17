import { ArrowBackIcon } from "@chakra-ui/icons";
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
import moment from "moment";
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
import { useGuruValidation } from "../../../lib/validation/userValidation";

const EditGuru = () => {
  const router = useNavigate();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const params = useParams();
  const idParams = parseInt(params.id);

  const { control, reset, getValues, handleSubmit, setValue, register } =
    useGuruValidation("edit");

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

  const handleUpdateGuru = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(data).map(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("role", "guru");
      await updateUser(formData, idParams);
      setLoading(false);
      // router("/master-data/data-siswa");
    } catch (error) {
      console.log(error);
      setLoading(false);
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
      <Header title="EDIT DATA GURU">
        <ButtonCustom
          icon={<ArrowBackIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Kembali"
          onClick={() => router("/master-data/data-guru")}
          type="outline"
        />
      </Header>
      <BoxInputLayout title="Edit Data Guru Baru">
        <Text fontSize="14px" color="#6C757D">
          Silahkan ubah data di bawah untuk mengedit data guru
        </Text>
        <Text fontSize="14px" color="#6C757D">
          Silahkan isi data di bawah untuk menambahkan data guru baru
        </Text>
        <Flex gap="16px" mt="32px" alignItems="center">
          <Image
            src={
              selectedImage && selectedGambarUrl
                ? selectedGambarUrl
                : getValues("foto")
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
            <ButtonCustom
              onClick={() => {
                seSelectedImage(null);
                setSelectedGambarUrl("");
              }}
              title="Hapus Foto Profil"
              bgColor="#DC3545"
              _hover={{ opacity: "0.8" }}
              isDisabled={false}
              icon={<Icon as={FaRegTrashCan} w={5} mr={2} h={5} />}
            />
          </Flex>

          <Input
            type="file"
            {...register("foto")}
            accept="image/*"
            name="foto"
            display="none"
            onChange={handleChangeGambar}
            ref={inputRef}
          />

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
            Informasi Data Diri Guru
          </Text>
        </Box>
        <Grid templateColumns="repeat(4, 1fr)" gap="16px">
          <Controller
            control={control}
            name="nama_lengkap"
            render={({ field, fieldState }) => (
              <InputCustom
                typeInput="text"
                placeholder="Nama Lengkap"
                label="Nama Lengkap"
                name="nama_lengkap"
                defaultValue={getValues("nama_lengkap")}
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
                label="Username"
                name="username"
                defaultValue={getValues("username")}
                isReq={true}
                errorText={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <InputCustom
            typeInput="password"
            placeholder="Password"
            label="Password"
            name="password"
            errorText=""
            disabled={true}
          />
          <InputCustom
            typeInput="password"
            placeholder="Konfirmasi Password"
            label="Konfirmasi Password"
            name="konfirmasi_password"
            errorText=""
            disabled={true}
          />
          <Controller
            control={control}
            name="nomor_induk"
            render={({ field, fieldState }) => (
              <InputCustom
                placeholder="NIG"
                isReq={true}
                label="No Induk Guru"
                defaultValue={getValues("nomor_induk")}
                name="nomor_induk"
                errorText={fieldState.error?.message}
                {...field}
                leftAddon={
                  <InputLeftAddon
                    bg="#E9ECEF"
                    px="4"
                    border="1px solid #CED4DA"
                  >
                    GRQAI
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
                placeholder="Tempat Lahir"
                label="Tempat Lahir"
                defaultValue={getValues("tempat_lahir")}
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
            render={({ field, fieldState }) => (
              <InputCustom
                typeInput="date"
                label="Tanggal Lahir"
                placeholder="Pilih Tanggal"
                defaultValue={moment(getValues("tanggal_lahir")).format(
                  "YYYY-MM-DD"
                )}
                name="tanggal_lahir"
                isReq={true}
                errorText={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="jenis_kelamin"
            render={({ field, fieldState }) => (
              <InputCustom
                label="Jenis Kelamin"
                name="jenis_kelamin"
                errorText={fieldState.error?.message}
                {...field}
                isReq={true}
                notInputForm={
                  <RadioGroup
                    name="jenis_kelamin"
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
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <InputCustom
                typeInput="email"
                label="Email"
                defaultValue={getValues("email")}
                placeholder="Email"
                name="email"
                errorText={fieldState.error?.message}
                {...field}
                isReq={true}
              />
            )}
          />

          <Controller
            control={control}
            name="nomor_telepon"
            render={({ field, fieldState }) => (
              <InputCustom
                typeInput="number"
                label="Nomor Telepon"
                defaultValue={getValues("nomor_telepon")}
                placeholder="Nomor Telepon"
                name="nomor_telepon"
                errorText={fieldState.error?.message}
                {...field}
                isReq={true}
              />
            )}
          />
          <Controller
            control={control}
            name="posisi"
            render={({ field, fieldState }) => (
              <InputCustom
                typeInput="text"
                placeholder="Jabatan"
                label="Posisi / Jabatan"
                defaultValue={getValues("posisi")}
                name="posisi"
                errorText={fieldState.error?.message}
                {...field}
                isReq={true}
              />
            )}
          />
          <Controller
            control={control}
            name="tanggal_bergabung"
            render={({ field, fieldState }) => (
              <InputCustom
                typeInput="date"
                label="Tanggal Bergabung"
                placeholder="Pilih Tanggal"
                name="tanggal_bergabung"
                defaultValue={moment(getValues("tanggal_bergabung")).format(
                  "YYYY-MM-DD"
                )}
                errorText={fieldState.error?.message}
                {...field}
                isReq={true}
              />
            )}
          />
        </Grid>

        <Controller
          name="alamat"
          control={control}
          render={({ field }) => (
            <InputCustom
              label="Alamat Lengkap"
              notInputForm={
                <Textarea
                  bgColor="white"
                  {...field}
                  name="alamat"
                  defaultValue={getValues("alamat")}
                  placeholder="Alamat Lengkap"
                />
              }
            />
          )}
        />
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
            name="status"
            control={control}
            render={({ field }) => (
              <Switch
                {...field}
                color="#0D6EFD"
                name="status"
                defaultChecked={getValues("status")}
              />
            )}
          />
        </Flex>
        <Flex justifyContent="flex-end" gap={4} alignItems="center" mt={12}>
          <ButtonCustom
            title="Batal"
            type="outline"
            color="#DC3545"
            borderColor="#DC3545"
            _hover={{ bgColor: "#DC3545", color: "white" }}
            w="100px"
            bgColor="transparent"
            onClick={() => router("/master-data/data-guru")}
          />
          <ButtonCustom
            title="Edit"
            _hover={{ opacity: "0.8" }}
            bgColor="#0B5ED7"
            color="#FFF"
            isLoading={loading}
            onClick={handleSubmit(handleUpdateGuru, (err) => console.log(err))}
          />
        </Flex>
      </BoxInputLayout>
    </>
  );
};

export default EditGuru;
