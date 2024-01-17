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
} from "@chakra-ui/react";
import AvatarPic from "../../assets/avatar_profile.png";
import { PiUploadSimpleLight } from "react-icons/pi";
import { FaRegTrashCan } from "react-icons/fa6";
import { Icon } from "@chakra-ui/react";
import InputCustom from "../../components/atoms/InputCustom";
import ButtonCustom from "../../components/atoms/ButtonCustom";

const DataSekolah = () => {
  return (
    <>
      <Header title="Data Sekolah" />
      <BoxInputLayout title="Data Sekolah">
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
            Informasi Data Sekolah
          </Text>
        </Box>
        <Grid templateColumns="repeat(4, 1fr)" gap="16px">
          <InputCustom
            typeInput="text"
            placeholder="Nama Sekolah"
            label="Nama Sekolah"
            name="nama_sekolah"
            errorText=""
          />
          <InputCustom
            typeInput="number"
            placeholder="Nomor Telepon"
            label="Nomor Telepon"
            name="nomor_telepon"
            errorText=""
            isReq={true}
          />
          <InputCustom
            typeInput="email"
            placeholder="Email"
            label="Email"
            name="email"
            errorText=""
          />
          <InputCustom
            typeInput="text"
            placeholder="Website"
            label="Website"
            name="website"
            errorText=""
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
        <Flex justifyContent="flex-end" gap={4} alignItems="center" mt={12}>
          <ButtonCustom
            title="Batal"
            _hover={{ opacity: "0.8" }}
            bgColor="#DC3545"
            color="#FFF"
            w="100px"
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

export default DataSekolah;
