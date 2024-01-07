/* eslint-disable react/prop-types */
import { Button } from "@chakra-ui/react";

const ButtonCustom = ({ icon, type, title, onClick }) => {
  if (type === "outline") {
    return (
      <Button
        bgColor="#fff"
        colorScheme="blue"
        borderRadius={4}
        fontWeight="400"
        size="sm"
        variant="outline"
        borderColor="#0D6EFD"
        color="#0D6EFD"
        onClick={onClick}
      >
        {icon}
        {title}
      </Button>
    );
  }

  return (
    <Button
      bgColor="#0D6EFD"
      colorScheme="blue"
      borderRadius={4}
      fontWeight="400"
      onClick={onClick}
      size="sm"
    >
      {icon}
      {title}
    </Button>
  );
};

export default ButtonCustom;
