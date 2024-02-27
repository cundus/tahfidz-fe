/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const ModalCustom = ({
  isOpen,
  onClose,
  children,
  title,
  onOK,
  isLoading,
  size,
  buttonName,
  isNoFooter,
}) => {
  return (
    <Modal size={size ? size : "2xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">{title}</ModalHeader>
        <Box px={6}>
          <Divider />
        </Box>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        {!isNoFooter && (
          <ModalFooter>
            <Button
              px={10}
              variant="outline"
              colorScheme="red"
              mr={3}
              onClick={onClose}
            >
              Batal
            </Button>
            <Button
              isLoading={isLoading}
              onClick={onOK}
              px={10}
              bg="#0B5ED7"
              color="white"
            >
              {buttonName ? buttonName : "Simpan"}
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalCustom;
