/* eslint-disable react/prop-types */
import { Box, Text } from "@chakra-ui/react";

const InfoProfile = ({ title, value, isLine = true }) => {
  return (
    <Box
      __css={{
        textTransform: "capitalize",
        padding: "4px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: isLine ? "1px solid #E2E8F0" : "none",
      }}
      w="100%"
      gap={4}
    >
      <Text minW="10rem" fontSize="16px" color="#6C757D">
        {title}
      </Text>
      <Text fontSize="16px" color="#212529">
        :
      </Text>
      <Text fontSize="16px" w="100%" color="#212529">
        {value}
      </Text>
    </Box>
  );
};

export default InfoProfile;
