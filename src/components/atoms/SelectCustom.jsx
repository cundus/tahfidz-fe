/* eslint-disable react/prop-types */
import {
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const SelectCustom = ({
  label,
  placeholder,
  name,
  errorText,
  isReq,
  options,
  iconCurr,
}) => {
  return (
    <FormControl
      isInvalid={errorText}
      isRequired={isReq}
      width="100%"
      marginBottom={4}
    >
      <FormLabel>{label}</FormLabel>
      <Select
        icon={errorText ? <InfoOutlineIcon fontSize="16" /> : iconCurr}
        placeholder={placeholder}
        errorBorderColor={errorText && "red.500"}
        backgroundColor="white"
        iconColor={errorText && "red.500"}
        name={name}
      >
        {options}
      </Select>
      {errorText && <FormErrorMessage mt="2px">{errorText}</FormErrorMessage>}
    </FormControl>
  );
};

export default SelectCustom;
