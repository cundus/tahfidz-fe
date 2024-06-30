import BoxInputLayout from "../../components/molekuls/BoxInputLayout";
import Header from "../../components/molekuls/Header";
import {
  Text,
  Flex,
  Box,
  Image,
  Divider,
  Grid,
  Textarea,
  Input,
} from "@chakra-ui/react";
import AvatarPic from "../../assets/avatar_profile.png";
import { PiUploadSimpleLight } from "react-icons/pi";
import { FaRegTrashCan } from "react-icons/fa6";
import { Icon } from "@chakra-ui/react";
import InputCustom from "../../components/atoms/InputCustom";
import ButtonCustom from "../../components/atoms/ButtonCustom";
import { useSekolahValidation } from "../../lib/validation/sekolahValidation";
import { Controller } from "react-hook-form";
import { useRef, useState } from "react";
import { createSekolah } from "../../lib/api/sekolah";

const DataSekolah = () => {
  const { control, handleSubmit, setValue, register } = useSekolahValidation();
  const [loading, setLoading] = useState(false);

  // state menangkap input gambar dari file
  const inputRef = useRef(null);
  const [selectedGambarUrl, setSelectedGambarUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState();

  function handleChangeGambar(e) {
    if (e.target.files && e.target.files[0]) {
      const fileImage = e.target.files[0];
      setSelectedImage(fileImage);
      setValue("logo", fileImage);
      const imgUrl = URL.createObjectURL(fileImage);
      setSelectedGambarUrl(imgUrl);
    }
  }

  const handleTambahSekolah = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      console.log(data);
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
      console.log("data", formData);
      await createSekolah(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title="Data Sekolah" />
      <BoxInputLayout title="Data Sekolah">
        <Flex gap="16px" mt="32px" alignItems="center">
          <Image
            src={
              selectedImage && selectedGambarUrl ? selectedGambarUrl : AvatarPic
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
                setSelectedGambarUrl("");
                setSelectedImage(null);
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
            {...register("logo")}
            accept="image/*"
            name="logo"
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
            Informasi Data Sekolah
          </Text>
        </Box>
        <Grid templateColumns="repeat(4, 1fr)" gap="16px">
          <Controller
            control={control}
            name="nama_sekolah"
            render={({ field, fieldState }) => (
              <InputCustom
                typeInput="text"
                placeholder="Nama Sekolah"
                label="Nama Sekolah"
                name="nama_sekolah"
                errorText={fieldState?.error?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="nomor_telepon"
            render={({ field, fieldState }) => (
              <InputCustom
                typeInput="number"
                placeholder="Nomor telepon"
                label="Nomor Telepon"
                name="nomor_telepon"
                errorText={fieldState?.error?.message}
                {...field}
                isReq={true}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <InputCustom
                typeInput="email"
                placeholder="Email"
                label="Email"
                name="email"
                errorText={fieldState?.error?.message}
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="website"
            render={({ field, fieldState }) => (
              <InputCustom
                typeInput="text"
                placeholder="Website"
                label="Website"
                name="website"
                errorText={fieldState?.error?.message}
                {...field}
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
              notInputForm={
                <Textarea
                  bgColor="white"
                  name="alamat"
                  placeholder="Alamat Lengkap"
                  {...field}
                />
              }
            />
          )}
        />

        <Flex justifyContent="flex-end" gap={4} alignItems="center" mt={12}>
          <ButtonCustom
            title="Batal"
            _hover={{ opacity: "0.8" }}
            bgColor="#DC3545"
            color="#FFF"
            w="100px"
          />
          <ButtonCustom
            isLoading={loading}
            title="Tambahkan"
            _hover={{ opacity: "0.8" }}
            bgColor="#0B5ED7"
            color="#FFF"
            onClick={handleSubmit(handleTambahSekolah)}
          />
        </Flex>
      </BoxInputLayout>
    </>
  );
};

export default DataSekolah;
