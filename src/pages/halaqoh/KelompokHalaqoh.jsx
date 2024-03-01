import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Td,
  Tr,
  useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsDownload } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../components/atoms/ButtonCustom";
import ModalCustom from "../../components/atoms/ModalCustom";
import Header from "../../components/molekuls/Header";
import TableCustom from "../../components/molekuls/TableCustom";
import { deleteHalaqah, getAllHalaqoh } from "../../lib/api/halaqoh";
import AlertConfirm from "./../../components/atoms/AlertDialog";

const KelompokHalaqoh = () => {
  const router = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModalSiswa,
    onClose: closeModalSiswa,
    onOpen: onOpenModalSiswa,
  } = useDisclosure();
  const [selectedId, setSelectedId] = useState();
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [siswaDetail, setSiswaDetail] = useState([]);  

  const openModalSiswa = (data) => {
    setSiswaDetail(data)
    onOpenModalSiswa()
  }

  const openAlertConfirm = (id) => {
    setSelectedId(id);
    onOpen();
  };

  const handleDeleteHalaqoh = async () => {
    setLoadingDelete(true);
    try {
      await deleteHalaqah(selectedId);
      setLoadingDelete(false);
      onClose();
      fetchDataHolaqoh();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchDataHolaqoh = async () => {
    setLoading(true);
    try {
      const response = await getAllHalaqoh();
      setData(response.halaqoh);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDataHolaqoh();
  }, []);

  return (
    <>
      <Header title="Kelompok Halaqoh">
        <ButtonCustom
          icon={<AddIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Tambah Data Baru"
          onClick={() =>
            router("/halaqoh/kelompok-halaqoh/tambah-kelompok-halaqoh")
          }
        />
      </Header>
      <Flex marginTop={10} justifyContent="space-between" alignItems="center">
        <Flex gap={3} alignItems="stretch">
          <Select placeholder="Pilih Cari Berdasarkan"></Select>
          <Input type="text" placeholder="Pencarian" />
          <ButtonCustom
            paddingX={6}
            icon={<SearchIcon __css={{ marginRight: "6px" }} w={4} h={4} />}
            title="Cari"
            height="38px"
          />
          <ButtonCustom
            paddingX={6}
            _hover={{ backgroundColor: "#5c656e", color: "white" }}
            bgColor="#6C757D"
            title="Reset"
            height="38px"
          />
        </Flex>
        <Button
          bgColor="#F8F9FA"
          color="#000"
          borderRadius={4}
          fontWeight="400"
          size="sm"
        >
          <Icon as={BsDownload} __css={{ marginRight: "8px" }} w={4} h={4} />
          Download
        </Button>
      </Flex>
      <TableCustom
        isLoading={loading}
        thead={[
          "#",
          "Nama Halaqoh",
          "Tahun Ajaran",
          "Nama Guru",
          "Anggota",
          "Status",
          "Aksi",
        ]}
        tbody={data?.map((item, idx) => (
          <Tr key={idx}>
            <Td>{idx + 1}</Td>
            <Td>{item?.nama_halaqoh}</Td>
            <Td>{item?.tahun_ajaran?.nama_tahun_ajaran}</Td>
            <Td>{item?.nama_guru}</Td>
            <Td cursor="pointer" onClick={() => openModalSiswa(item.siswa)}>
              <Badge
                borderRadius="xl"
                paddingY={1}
                paddingX={2}
                variant="outline"
                color="#212529"
                borderColor="#212529"
                css={{
                  display: "flex",
                  alignItems: "center",
                  width: "fit-content",
                  gap: "5px",
                }}
              >
                <Icon as={IoEyeOutline} w={3} h={3} />
                {item?.siswa.length} Siswa
              </Badge>
            </Td>
            <Td>
              <Badge
                borderRadius="xl"
                paddingY={1}
                paddingX={2}
                color="white"
                backgroundColor="#0D6EFD"
                // backgroundColor="#DC3545"
              >
                {item?.status ? "Aktif" : "Non Aktif"}
              </Badge>
            </Td>
            <Td>
              <Menu>
                <MenuButton
                  height={8}
                  as={Button}
                  width={8}
                  rightIcon={
                    <Icon viewBox="0 0 16 16" style={{ marginRight: 8 }}>
                      <path
                        d="M9.5 12.9991C9.5 13.397 9.34196 13.7785 9.06066 14.0598C8.77936 14.3411 8.39782 14.4991 8 14.4991C7.60218 14.4991 7.22064 14.3411 6.93934 14.0598C6.65804 13.7785 6.5 13.397 6.5 12.9991C6.5 12.6013 6.65804 12.2198 6.93934 11.9385C7.22064 11.6572 7.60218 11.4991 8 11.4991C8.39782 11.4991 8.77936 11.6572 9.06066 11.9385C9.34196 12.2198 9.5 12.6013 9.5 12.9991ZM9.5 7.99915C9.5 8.39697 9.34196 8.7785 9.06066 9.05981C8.77936 9.34111 8.39782 9.49915 8 9.49915C7.60218 9.49915 7.22064 9.34111 6.93934 9.05981C6.65804 8.7785 6.5 8.39697 6.5 7.99915C6.5 7.60132 6.65804 7.21979 6.93934 6.93849C7.22064 6.65718 7.60218 6.49915 8 6.49915C8.39782 6.49915 8.77936 6.65718 9.06066 6.93849C9.34196 7.21979 9.5 7.60132 9.5 7.99915ZM9.5 2.99915C9.5 3.39697 9.34196 3.7785 9.06066 4.05981C8.77936 4.34111 8.39782 4.49915 8 4.49915C7.60218 4.49915 7.22064 4.34111 6.93934 4.05981C6.65804 3.7785 6.5 3.39697 6.5 2.99915C6.5 2.60132 6.65804 2.21979 6.93934 1.93849C7.22064 1.65718 7.60218 1.49915 8 1.49915C8.39782 1.49915 8.77936 1.65718 9.06066 1.93849C9.34196 2.21979 9.5 2.60132 9.5 2.99915Z"
                        fill="black"
                      />
                    </Icon>
                  }
                ></MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() =>
                      router(
                        "/halaqoh/kelompok-halaqoh/detail-kelompok-halaqoh/" +
                          item.id
                      )
                    }
                  >
                    Detail
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      router(
                        "/halaqoh/kelompok-halaqoh/edit-kelompok-halaqoh/" +
                          item.id
                      )
                    }
                  >
                    Edit
                  </MenuItem>
                  <MenuItem onClick={() => openAlertConfirm(item.id)}>
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </Td>
          </Tr>
        ))}
      />

      {isOpen && (
        <AlertConfirm
          isOpen={isOpen}
          onClose={onClose}
          isLoading={loadingDelete}
          onOK={handleDeleteHalaqoh}
          title="Hapus Data"
          subTitle="Apakah anda yakin ingin menghapus data ?"
        />
      )}

      {isOpenModalSiswa && (
        <ModalCustom isNoFooter  isOpen={isOpenModalSiswa} onClose={closeModalSiswa} title="Daftar Anggota Halaqoh">

          <TableCustom
          thead={["#", "Nama Siswa"]}
          tbody={siswaDetail.map((item,idx)=> (
            <Tr key={idx}>
              <Td>{idx + 1}</Td>
              <Td>{item.nama_siswa}</Td>
            </Tr>
          ))}
          />
        </ModalCustom>
      )}
    </>
  );
};

export default KelompokHalaqoh;
