import {
  Flex,
  Box,
  Image,
  Text,
  Checkbox,
  Button,
  Select,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import AlQuran from "../assets/al-quran.png";
import Logo from "../assets/logo.png";
import InputCustom from "../components/atoms/InputCustom";
import { useState } from "react";
import { useLoginValidation } from "../lib/validation/loginValidation";
import { Controller } from "react-hook-form";
import { login } from "../lib/api/auth";

const Login = () => {
  const { control,
   handleSubmit,
   // reset,
   setError
} = useLoginValidation();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data) => {
    try {
      setIsLoading(true);
      const response = await login(data);
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError("username", {
        type: "custom",
        message: "Password tidak valid. Silakan periksa kembali.",
      });
      setError("password", {
        type: "custom",
        message: "Password tidak valid. Silakan periksa kembali.",
      });
      setIsLoading(false);
    }
  };

  return (
    <Flex gap={10} alignItems="center">
      <Box>
        <Image height="100vh" w="100%" objectFit="cover" src={AlQuran} />
      </Box>
      <Box
        __css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
        }}
      >
        <Box
          __css={{
            maxWidth: "30rem",
          }}
        >
          <Image
            objectFit="cover"
            width="20rem"
            marginBottom="1rem"
            src={Logo}
          />
          <Text fontSize="3xl" fontWeight="bold" color="#212529">
            SIAKAD TAHFIDZ
          </Text>
          <Text color="#6C757D" marginY={1}>
            Sistem Informasi Akademik Tahfidz
          </Text>
          <Text color="#6C757D" marginTop={1} marginBottom={4}>
            Rumah Quran Al-Inayah Pamulang Tangerang Banten
          </Text>
          <Controller
            control={control}
            name="username"
            render={({ field, fieldState }) => (
              <InputCustom
                typeInput="text"
                placeholder="Username"
                label="Username"
                name="username"
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
                {...field}
                errorText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="role"
            render={({ field, fieldState }) => (
              <FormControl isInvalid={!!fieldState.error?.message} mb={"2"}>
                <FormLabel>Role</FormLabel>
                <Select placeholder="Pilih Role" {...field}>
                  <option value="admin">Admin</option>
                  <option value="operator">Operator</option>
                  <option value="guru">Guru</option>
                  <option value="siswa">Siswa</option>
                </Select>

                {!!fieldState.error?.message && (
                  <FormErrorMessage>
                    {fieldState.error?.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            )}
          />

          <Text fontStyle="italic" color="#6C757D">
            Checklist <strong>&quot;Simpan Password&quot;</strong> untuk masuk
            kembali tanpa menuliskan Username dan Password
          </Text>
          <Checkbox size="sm" marginTop={2}>
            <Text>Simpan Password</Text>
          </Checkbox>
          <br />
          <Button
            bgColor="#0D6EFD"
            colorScheme="blue"
            color="#FFF"
            width="100%"
            fontWeight="light"
            marginTop={4}
            isLoading={isLoading}
            loadingText="Autentikasi dan Memeriksa informasi Login Anda"
            _loading={{
              bgColor: "#0D6EFD",
              color: "#FFF",
              opacity: 1,
            }}
            // isDisabled={true}
            onSubmit={handleSubmit(handleLogin)}
          >
            Masuk
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
