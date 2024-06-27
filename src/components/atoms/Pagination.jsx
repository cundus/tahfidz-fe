import { Text, Flex, IconButton, Button } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Pagination = () => {
  return (
    <Flex
      paddingX={4}
      paddingY={2}
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontSize="14px" color="#6C757D">
        Menampilkan 1 sampai 10 dari 80 entri
      </Text>
      <Flex>
        <IconButton
          variant="outline"
          color="#0D6EFD"
          colorScheme="#0D6EFD"
          _hover={{ bg: "#0D6EFD", color: "white" }}
          icon={<ChevronLeftIcon />}
          size="sm"
          borderTopRightRadius={0}
          borderBottomRightRadius={0}
          border="1px solid #0D6EFD"
        />
        <Button
          variant="outline"
          color="#0D6EFD"
          colorScheme="#0D6EFD"
          _hover={{ bg: "#0D6EFD", color: "white" }}
          borderRadius={0}
          size="sm"
          borderWidth={1}
          border="1px solid #0D6EFD"
        >
          1
        </Button>
        <Button
          variant="solid"
          bgColor="#0D6EFD"
          colorScheme="#0D6EFD"
          _hover={{
            bg: "white",
            color: "#0D6EFD",
          }}
          borderRadius={0}
          size="sm"
          border="1px solid #0D6EFD"
        >
          2
        </Button>
        <IconButton
          variant="outline"
          color="#0D6EFD"
          colorScheme="#0D6EFD"
          _hover={{ bg: "#0D6EFD", color: "white" }}
          icon={<ChevronRightIcon />}
          size="sm"
          borderTopLeftRadius={0}
          borderBottomLeftRadius={0}
          border="1px solid #0D6EFD"
        />
      </Flex>
    </Flex>
  );
};

export default Pagination;
