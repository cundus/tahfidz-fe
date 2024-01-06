/* eslint-disable react/prop-types */
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { useState } from "react";

const InputCustom = ({
  typeInput,
  placeholder,
  label,
  isReq,
  onChange,
  errorText,
}) => {
  const [show, setShow] = useState(true);

  return (
    <FormControl
      isInvalid={errorText}
      isRequired={isReq}
      width="100%"
      marginBottom={4}
    >
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input
          type={
            typeInput === "password" ? (!show ? "text" : "password") : typeInput
          }
          placeholder={placeholder}
          onChange={onChange}
        />

        <InputRightElement>
          {errorText ? (
            <InfoOutlineIcon color="red.500" />
          ) : (
            typeInput === "password" &&
            (show ? (
              <ViewOffIcon cursor="pointer" onClick={() => setShow(!show)} />
            ) : (
              <ViewIcon cursor="pointer" onClick={() => setShow(!show)} />
            ))
          )}
        </InputRightElement>
      </InputGroup>
      {errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputCustom;
