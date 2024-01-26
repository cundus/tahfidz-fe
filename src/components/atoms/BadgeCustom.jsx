/* eslint-disable react/prop-types */
import { Badge, Icon } from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";

const BadgeCustom = ({ onDelete, title }) => {
  return (
    <Badge
      backgroundColor="#E9ECEF"
      border="1px solid #CED4DA"
      fontWeight="500"
      color="#212529"
      paddingX={2}
    >
      {title}
      <Icon as={IoClose} onClick={onDelete} paddingTop="2px" fontSize="14px" />
    </Badge>
  );
};

export default BadgeCustom;
