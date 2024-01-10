import { Flex, Box, Image, Text, Checkbox, Button } from "@chakra-ui/react";
import AlQuran from "../assets/al-quran.png";
import Logo from "../assets/logo.png";
import InputCustom from "../components/atoms/InputCustom";
import { useState } from "react";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

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
          <InputCustom
            typeInput="text"
            placeholder="Username"
            label="Username"
            name="username"
            errorText=""
          />
          <InputCustom
            typeInput="password"
            placeholder="Password"
            label="Password"
            name="password"
            errorText=""
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
          >
            Masuk
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
