import { useNavigate } from "react-router-dom";
import Header from "../../../components/molekuls/Header";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import BoxInputLayout from "../../../components/molekuls/BoxInputLayout";
import {
  Text,
  Flex,
  Box,
  Image,
  Divider,
  InputLeftAddon,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  Switch,
} from "@chakra-ui/react";
import AvatarPic from "../../../assets/avatar_profile.png";
import { PiUploadSimpleLight } from "react-icons/pi";
import { FaRegTrashCan } from "react-icons/fa6";
import { Icon } from "@chakra-ui/react";
import InputCustom from "../../../components/atoms/InputCustom";
import { useSiswaValidation } from "../../../lib/validation/userValidation";
import { Controller } from "react-hook-form";

const EditSiswa = () => {
  const router = useNavigate();
  const {
    control,
    // handleSubmit,
    // reset,
    // setError
  } = useSiswaValidation();

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
            src={AvatarPic}
            border="1px solid #DEE2E6"
            w="100px"
            h="100px"
          />
          <Flex flexDirection="column" gap={4}>
            <ButtonCustom
              title="Unggah Foto Profil"
              icon={<Icon as={PiUploadSimpleLight} w={5} mr={2} h={5} />}
            />
            <ButtonCustom
              title="Hapus Foto Profil"
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
                label="Username"
                name="username"
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
          />

          <InputCustom
            typeInput="password"
            placeholder="Konfirmasi Password"
            label="Konfirmasi Password"
            name="konfirmasi_password"
          />

          <Controller
            control={control}
            name="nomor_induk"
            render={({ field, fieldState }) => (
              <InputCustom
                placeholder="NIS"
                name="nomor_induk"
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
                {...field}
                isReq={true}
                notInputForm={
                  <RadioGroup name="jenis_kelamin">
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

        <InputCustom
          label="Alamat Lengkap"
          notInputForm={
            <Textarea
              bgColor="white"
              name="alamat"
              placeholder="Alamat Lengkap"
            />
          }
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
                placeholder="Nama Ayah"
                label="Nama Ayah"
                name="nama_ayah"
                errorText={fieldState.error?.message}
                {...field}
                isReq={true}
              />
            )}
          />

          <InputCustom
            typeInput="text"
            placeholder="Nomor Telepon Ayah"
            label="Nomor Telepon Ayah"
            name="nomor_telepon_ayah"
          />
          <InputCustom
            typeInput="text"
            placeholder="Pekerjaan Ayah"
            label="Pekerjaan Ayah"
            name="pekerjaan_ayah"
          />
          <Controller
            control={control}
            name="nama_ibu"
            render={({ field, fieldState }) => (
              <InputCustom
                typeInput="text"
                placeholder="Nama Ibu"
                label="Nama Ibu"
                name="nama_ibu"
                errorText={fieldState.error?.message}
                {...field}
                isReq={true}
              />
            )}
          />

          <InputCustom
            typeInput="text"
            placeholder="Nomor Telepon Ibu"
            label="Nomor Telepon Ibu"
            name="nomor_telepon_ibu"
          />
          <InputCustom
            typeInput="text"
            placeholder="Pekerjaan Ibu"
            label="Pekerjaan Ibu"
            name="pekerjaan_ibu"
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
          <Switch color="#0D6EFD" name="status" />
        </Flex>
        <Flex justifyContent="flex-end" gap={4} alignItems="center" mt={12}>
          <ButtonCustom
            title="Batal"
            type="outline"
            color="#DC3545"
            borderColor="#DC3545"
            _hover={{ bgColor: "#DC3545", color: "white" }}
            w="100px"
          />
          <ButtonCustom
            title="Edit Data"
            _hover={{ opacity: "0.8" }}
            bgColor="#0B5ED7"
            color="#FFF"
          />
        </Flex>
      </BoxInputLayout>
    </>
  );
};

export default EditSiswa;
