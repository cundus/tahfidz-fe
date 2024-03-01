import { Box, HStack, Text } from "@chakra-ui/react";
import { useEffect } from "react";

const CardDashboard = ({
  nameIcon,
  title,
  subTitile,
  value,
  isBorderRight,
}) => {
  return (
    <Box
      borderRight={isBorderRight ? "1px solid #aeaeae" : ""}
      padding={5}
      flex={1}
    >
      <HStack spacing={5}>
        <Box>
          <Text fontSize="16px" fontWeight="semibold">
            {title}
          </Text>
          <Text fontSize="24px" fontWeight="semibold" display="flex" gap={3}>
            {value}
            <Text
              my={"auto"}
              color="#6C757D"
              fontWeight="normal"
              fontSize="13px"
            >
              {subTitile}
            </Text>
          </Text>
        </Box>

        {nameIcon}
      </HStack>
    </Box>
  );
};

export default CardDashboard;
