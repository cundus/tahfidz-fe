import { useNavigate } from "react-router-dom";
import Header from "../../../components/molekuls/Header";
import ButtonCustom from "../../../components/atoms/ButtonCustom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import BoxInputLayout from "../../../components/molekuls/BoxInputLayout";

const DetailOprator = () => {
  const router = useNavigate();

  return (
    <>
      <Header title="DETAIL DATA OPERATOR">
        <ButtonCustom
          icon={<ArrowBackIcon __css={{ marginRight: "6px" }} w={3} h={3} />}
          title="Kembali"
          onClick={() => router("/master-data/data-operator")}
          type="outline"
        />
      </Header>
      <BoxInputLayout title="Detail Data Operator"></BoxInputLayout>
    </>
  );
};

export default DetailOprator;
