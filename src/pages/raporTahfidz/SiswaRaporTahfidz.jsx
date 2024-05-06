import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/molekuls/Header";
import { ArrowBackIcon, AddIcon } from "@chakra-ui/icons";
import ButtonCustom from "../../components/atoms/ButtonCustom";
import {
  Button,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import InfoProfile from "../../components/atoms/InfoProfile";
import ButtonCustomNote from "../../components/atoms/ButtonCustomNote";
import ButtonCustomPrint from "../../components/atoms/ButtonCustomPrint";
import FormatRaport from "./FormatRaport";
import ReactPDF, {
  Document,
  PDFDownloadLink,
  PDFViewer,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
import { getRapor } from "../../lib/api/rapor";
import { FiPrinter } from "react-icons/fi";

const SiswaRaporTahfidz = () => {
  let { id } = useParams();
  const router = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({});
  const [catatan, setCatatan] = React.useState("");

  const getRaporField = async () => {
    setLoading(true);
    try {
      const response = await getRapor(id);
      setData(response.rapor);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getRaporField();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Header title="RAPOR TAHFIDZ">
            <ButtonCustom
              icon={
                <ArrowBackIcon __css={{ marginRight: "6px" }} w={3} h={3} />
              }
              title="Kembali"
              onClick={() => router("/rapor-tahfidz/kelola-hafalan")}
              type="outline"
            />
          </Header>
          <Flex h={"Full"} mt={8} gap={4}>
            <Flex flexDirection={"column"} gap={4}>
              <Flex justifyContent="space-between" alignItems="center" gap={4}>
                <Flex borderLeft="4px solid #0D6EFD" direction="column">
                  <InfoProfile
                    title="Nama Siswa"
                    value={data.siswa}
                    isLine={false}
                  />
                  <InfoProfile
                    title="Nama Halaqoh"
                    value={data.halaqoh}
                    isLine={false}
                  />
                  <InfoProfile
                    title="Tahun Ajaran"
                    value={data.tahunAjaran}
                    isLine={false}
                  />
                  <InfoProfile
                    title="Nama Guru"
                    value={data.guru}
                    isLine={false}
                  />
                </Flex>
              </Flex>

              <FormControl>
                <Textarea
                  w={"400px"}
                  bgColor={"white"}
                  placeholder="Catatan Guru"
                  onChange={(e) => setCatatan(e.target.value)}
                />
              </FormControl>
              <ButtonCustomNote
                icon={<AddIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
                title="Simpan Catatan"
                onClick={() => {}}
              />
            </Flex>

            <Flex flexDirection={"column"} gap={4} flex={2} w={"full"}>
              <Flex justifyContent={"center"} gap={4}>
                <ButtonCustomPrint
                  icon={
                    <FiPrinter __css={{ marginRight: "6px" }} w={3} h={3} />
                  }
                  title="Print"
                  onClick={() => {}}
                />

                {/* <Button> */}
                {!loading && (
                  <PDFDownloadLink
                    document={<FormatRaport data={data} catatan={catatan} />}
                    fileName="rapor-tahfidz.pdf"
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? (
                        <ButtonCustomPrint title="Loading document..." type={"outline"}/>
                      ) : (
                        <ButtonCustomPrint title="Download Pdf"  type={"outline"}/>
                      )
                    }
                  </PDFDownloadLink>
                )}
                {/* </Button> */}
              </Flex>
              <PDFViewer height={"500px"}>
                <FormatRaport data={data} catatan={catatan} />
              </PDFViewer>
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
};

export default SiswaRaporTahfidz;
