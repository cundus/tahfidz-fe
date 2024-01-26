import Header from "../../../components/molekuls/Header";
import { Flex, Td, Tr, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import TableCustom from "../../../components/molekuls/TableCustom";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import InfoProfile from "../../../components/atoms/InfoProfile";
import { useNavigate } from "react-router-dom";

const KelolaHafalan = () => {
  const router = useNavigate();
  return (
    <>
      <Header title="HAFALAN BARU (SABQ)">
        <ButtonCustom
          icon={<ArrowBackIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Kembali"
          onClick={() => router("/hafalan/hafalan-baru-(sabq)")}
          type="outline"
        />
      </Header>
      <Flex mt={8} justifyContent="space-between" alignItems="center" gap={4}>
        <Flex borderLeft="4px solid #0D6EFD" direction="column">
          <InfoProfile
            title="Nama Halaqoh"
            value="Muhammad Fauzan"
            isLine={false}
          />
          <InfoProfile
            title="Tahun Ajaran"
            value="TA 2023-2024 GANJIL"
            isLine={false}
          />
          <InfoProfile
            title="Nama Guru"
            value="Muhammad Fauzan"
            isLine={false}
          />
        </Flex>
      </Flex>
      <TableCustom
        thead={["#", "Nama Halaqoh", "Tahun Ajaran", "Nama Guru", "Action"]}
        tbody={
          <Tr>
            <Td>1</Td>
            <Td>SRQAI 000001</Td>
            <Td>TA 2020 - 2021 GANJIL</Td>
            <Td>Ibadurrahman</Td>
            <Td>
              <Text
                color="#0D6EFD"
                onClick={() =>
                  router("/hafalan/hafalan-baru-(sabq)/kelola-hafalan")
                }
                fontSize="sm"
                borderBottom="1px solid transparent"
                _hover={{
                  cursor: "pointer",
                  borderBottom: "1px solid #0D6EFD",
                  width: "fit-content",
                }}
              >
                Kelola Hafalan
              </Text>
            </Td>
          </Tr>
        }
      />
    </>
  );
};

export default KelolaHafalan;
