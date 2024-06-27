import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import moment from "moment";
import React from "react";
import { arr } from "../../constans/mocks";
const FormatRaport = ({ data, catatan }) => {
  if (!data) {
    data = arr;
  }

  return (
    <Document>
      <Page size="A4">
        <View
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <View
            style={{
              width: "100%",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "4px",
              marginTop: "20px",
            }}
          >
            <View
              style={{
                display: "flex",
                gap: "10px",
                height: "83px",
                width: "100%",
                marginTop: "10px",
                p: "20px",
                justifyContent: "center",
                fontWeight: "bold",
                flexDirection: "row",
              }}
            >
              <View style={{ display: "flex", width: "79px", height: "80px" }}>
                <Image src={window.location.origin + "/Logo_3_Color.png"} style={{ width: "100%" }} />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "83px",
                  width: "400px",
                  fontWeight: "bold",
                }}
              >
                <Text style={{ fontSize: "20px" }}>RAPOR TAHFIDZ AL - QURAN</Text>
                <Text style={{ fontSize: "20px" }}>RUMAH QURAN AL - INAYAH PAMULANG</Text>
                <Text style={{ fontSize: "9px" }}>
                  Jl. Beringin 5 No.90, Pamulang Bar., Kec. Pamulang, Kota Tangerang Selatan, Banten 15417
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: "25px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                height: "53px",
                color: "grey",
                textTransform: "capitalize",
              }}
            >
              <View style={{ display: "flex", width: "45%" }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    height: "50px",
                    fontSize: "13px",
                  }}
                >
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={{ width: "90px" }}>Nama Siswa</Text>
                    <Text style={{ marginRight: "3px" }}>:</Text>
                    <Text>{data.siswa}</Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={{ width: "90px" }}>Nama Halaqoh</Text>
                    <Text style={{ marginRight: "3px" }}>:</Text>
                    <Text>{data.halaqoh}</Text>
                  </View>
                </View>
              </View>
              <View style={{ display: "flex", width: "45%" }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    height: "50px",
                    fontSize: "13px",
                  }}
                >
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={{ width: "90px" }}>Nama Guru</Text>
                    <Text style={{ marginRight: "3px" }}>:</Text>
                    <Text>{data.guru}</Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={{ width: "90px" }}>Tahun Ajaran</Text>
                    <Text style={{ marginRight: "3px" }}>:</Text>
                    <Text>{data.tahunAjaran}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                width: "90%",
                height: "250px",
                border: "1px solid black",
                textTransform: "capitalize",
                fontSize: "13px",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottom: "1px solid black",
                  textAlign: "center",
                  height: "36px",
                  backgroundColor: "#4B9841",
                  color: "white",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    width: "5%",
                    justifyContent: "center",
                    height: "100%",
                    borderRight: "1px solid black",
                  }}
                >
                  <Text>No</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    width: "35%",
                    height: "100%",
                    justifyContent: "center",
                    borderRight: "1px solid black",
                  }}
                >
                  <Text>Juz Yang Sudah Diujikan</Text>
                </View>
                <View
                  style={{ display: "flex", flexDirection: "column", width: "40%", borderRight: "1px solid black" }}
                >
                  <View style={{ display: "flex", borderBottom: "1px solid black" }}>
                    <Text>Nilai</Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "row", backgroundColor: "#E07A38" }}>
                    <View style={{ width: "33%", borderRight: "1px solid black" }}>
                      <Text>Hafalan</Text>
                    </View>
                    <View style={{ width: "33%", borderRight: "1px solid black" }}>
                      <Text>Tajwid</Text>
                    </View>
                    <View style={{ width: "33%" }}>
                      <Text>Total</Text>
                    </View>
                  </View>
                </View>
                <View style={{ display: "flex", width: "20%" }}>
                  <Text>Keterangan</Text>
                </View>
              </View>
              <View style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                {data?.ujian?.map((data, idx) => (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      height: "10%",
                      borderBottom: "1px solid black",
                      textAlign: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "5%",
                        borderRight: "1px solid black",
                        justifyContent: "center",
                      }}
                    >
                      <Text>{idx + 1}</Text>
                    </View>
                    <View style={{ width: "35%", justifyContent: "center", borderRight: "1px solid black" }}>
                      <Text>{data.juz}</Text>
                    </View>
                    <View style={{ width: "13.15%", justifyContent: "center", borderRight: "1px solid black" }}>
                      <Text>{data.hafalan}</Text>
                    </View>
                    <View style={{ width: "13.15%", justifyContent: "center", borderRight: "1px solid black" }}>
                      <Text>{data.tajwid}</Text>
                    </View>
                    <View style={{ width: "13.7%", justifyContent: "center", borderRight: "1px solid black" }}>
                      <Text>{data.total}</Text>
                    </View>
                    <View style={{ width: "20%", justifyContent: "center" }}>
                      <Text>{data.keterangan}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "5px",
                marginTop: "5px",
                width: "90%",
                height: "100px",
                fontSize: "13px",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "66.7%",
                  height: "100%",
                  border: "1px solid black",
                  TextAlign: "center",
                  alignContent: "center",
                }}
              >
                <View
                  style={{
                    height: "17%",
                    textAlign: "center",
                    color: "white",
                    backgroundColor: "#4B9841",
                    borderBottom: "1px solid black",
                  }}
                >
                  <Text>Catatan Guru</Text>
                </View>
                <View style={{ height: "83%", width: "100%", textAlign: "center", paddingHorizontal: "5px" }}>
                  <Text>{catatan}</Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "33.3%",
                  height: "100%",
                  border: "1px solid black",
                }}
              >
                <View
                  style={{
                    height: "17%",
                    textAlign: "center",
                    color: "white",
                    backgroundColor: "#4B9841",
                    borderBottom: "1px solid black",
                  }}
                >
                  <Text>Total Absensi</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "27.66%",
                    borderBottom: "1px solid black",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ width: "20%", marginLeft: "10px" }}>Sakit</Text>
                  <Text style={{ width: "5%", marginRight: "40px" }}>:</Text>
                  <Text>{data.sakit}</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "27.66%",
                    borderBottom: "1px solid black",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ width: "20%", marginLeft: "10px" }}>Izin</Text>
                  <Text style={{ width: "5%", marginRight: "40px" }}>:</Text>
                  <Text>{data.izin}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", height: "27.66%", alignItems: "center" }}>
                  <Text style={{ width: "20%", marginLeft: "10px" }}>Alpha</Text>
                  <Text style={{ width: "5%", marginRight: "40px" }}>:</Text>
                  <Text>{data.alpha}</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "20px",
                width: "90%",
                fontSize: "13px",
                fontWeight: "400",
              }}
            >
              <View style={{ textAlign: "center" }}>
                <Text>Mengetahui,</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={{ width: "66.7%", textAlign: "center" }}></View>
                <View style={{ width: "33.3%", textAlign: "center" }}>
                  <Text>Pamulang, {moment().format("DD MMMM YYYY")}</Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "140px",
                  marginBottom: "10px",
                  paddingTop: "10px",
                  textTransform: "capitalize",
                }}
              >
                <View style={{ width: "33.3%", textAlign: "center" }}>
                  <View style={{ display: "flex", flexDirection: "column", height: "100%", gap: "3px" }}>
                    <Text style={{ flex: "1" }}>Mudir</Text>
                    <Text>_______________</Text>
                    <Text>Ust. Mirza Ghulam</Text>
                    <Text>Akbar Al Hafidz, S.Pd.</Text>
                  </View>
                </View>
                <View style={{ width: "33.3%", textAlign: "center" }}>
                  <View style={{ display: "flex", flexDirection: "column", height: "85%", gap: "3px" }}>
                    <Text style={{ flex: "1" }}>Kepala Bagian Tahfidz</Text>
                    <Text>_______________</Text>
                    <Text>Ust. {data.guru}</Text>
                  </View>
                </View>
                <View style={{ width: "33.3%", textAlign: "center" }}>
                  <View style={{ display: "flex", flexDirection: "column", height: "85%", gap: "3px" }}>
                    <Text style={{ flex: "1" }}>Guru Pengampu</Text>
                    <Text>_______________</Text>
                    <Text>Ust. </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default FormatRaport;
