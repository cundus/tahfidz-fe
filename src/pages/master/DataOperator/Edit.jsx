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
import { Controller } from "react-hook-form";
import { useOperatorValidation } from "../../../lib/validation/userValidation";

const EditOperator = () => {
  const router = useNavigate();
  const { control } = useOperatorValidation();

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
          <Controller
            control={control}
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

          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <InputCustom
                typeInput="email"
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
            name="jabatan"
            render={({ field, fieldState }) => (
              <InputCustom
                typeInput="text"
                placeholder="Jabatan"
                label="Posisi / Jabatan"
                name="jabatan"
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
            bgColor="transparent"
          />
          <ButtonCustom
            title="Tambahkan"
            _hover={{ opacity: "0.8" }}
            bgColor="#0B5ED7"
            color="#FFF"
          />
        </Flex>
      </BoxInputLayout>
    </>
  );
};

export default EditOperator;
