/* eslint-disable react/prop-types */
import { Box, Text } from "@chakra-ui/react";

const BoxInputLayout = ({ children, title }) => {
  return (
    <Box
      borderRadius="16px"
      padding="24px"
      border="1px solid #DEE2E6"
      background="#F8F9FA"
      mt={8}
    >
      <Text fontSize="22px" textTransform="capitalize" fontWeight={600}>
        {title}
      </Text>
      {children}
    </Box>
  );
};

export default BoxInputLayout;
