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
import { useOperatorValidation } from "../../../lib/validation/userValidation";

const EditOperator = () => {
  const params = useParams();
  const idParams = parseInt(params.id);
  const router = useNavigate();
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { control, register, getValues, handleSubmit, setValue, reset } =
    useOperatorValidation("edit");

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

  const handleUpdateOperator = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      Object.entries(data).map(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("role", "operator");
      await updateUser(formData, idParams);
      setIsLoading(false);
      // router("/master-data/data-siswa");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleGetDetaiOperator = async () => {
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
    handleGetDetaiOperator();
  }, [idParams]);

  return (
    <>
      <Header title="EDIT DATA OPERATOR">
        <ButtonCustom
          icon={<ArrowBackIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Kembali"
          onClick={() => router("/master-data/data-operator")}
          type="outline"
        />
      </Header>
      <BoxInputLayout title="Edit Data Operator">
        <Text fontSize="14px" color="#6C757D">
          Silahkan ubah data di bawah untuk mengedit data operator
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
            Informasi Data Diri Operator
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
          <Controller
            control={control}
            disabled={true}
            name="password"
            render={({ field, fieldState }) => (
              <InputCustom
                typeInput="password"
                placeholder="Password"
                label="Password"
                name="password"
                errorText={fieldState.error?.message}
                {...field}
                isReq={true}
              />
            )}
          />

          <Controller
            control={control}
            disabled={true}
            name="konfirmasi_password"
            render={({ field, fieldState }) => (
              <InputCustom
                typeInput="password"
                placeholder="Konfirmasi Password"
                label="Konfirmasi Password"
                name="konfirmasi_password"
                errorText={fieldState.error?.message}
                {...field}
                isReq={true}
              />
            )}
          />

          <Controller
            control={control}
            name="nomor_induk"
            render={({ field, fieldState }) => (
              <InputCustom
                placeholder="NIO"
                isReq={true}
                label="No Induk Operator"
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
                defaultValue={getValues("tempat_lahir")}
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
            render={({ field, fieldState }) => (
              <InputCustom
                typeInput="date"
                label="Tanggal Lahir"
                placeholder="Pilih Tanggal"
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
                isReq={true}
                notInputForm={
                  <RadioGroup
                    {...field}
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
                defaultValue={getValues("email")}
                label="Email"
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
                name="posisi"
                defaultValue={getValues("posisi")}
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
                  {...field}
                  bgColor="white"
                  name="alamat"
                  placeholder="Alamat Lengkap"
                  defaultValue={getValues("alamat")}
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
            control={control}
            name="status"
            render={({ field }) => (
              <Switch
                {...field}
                defaultChecked={getValues("status")}
                color="#0D6EFD"
                name="status"
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
            onClick={() => router("/master-data/data-operator")}
          />
          <ButtonCustom
            title="Edit"
            _hover={{ opacity: "0.8" }}
            bgColor="#0B5ED7"
            color="#FFF"
            onClick={handleSubmit(handleUpdateOperator)}
            isLoading={isLoading}
          />
        </Flex>
      </BoxInputLayout>
    </>
  );
};

export default EditOperator;
