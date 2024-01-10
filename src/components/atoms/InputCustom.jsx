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
  leftAddon,
  name,
  notInputForm,
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
      {notInputForm ? (
        notInputForm
      ) : (
        <InputGroup>
          {leftAddon}
          <Input
            type={
              typeInput === "password"
                ? !show
                  ? "text"
                  : "password"
                : typeInput
            }
            placeholder={placeholder}
            onChange={onChange}
            name={name}
          />
          {errorText ? (
            <InputRightElement>
              <InfoOutlineIcon color="red.500" />
            </InputRightElement>
          ) : (
            typeInput === "password" &&
            (show ? (
              <InputRightElement>
                <ViewOffIcon cursor="pointer" onClick={() => setShow(!show)} />
              </InputRightElement>
            ) : (
              <InputRightElement>
                <ViewIcon cursor="pointer" onClick={() => setShow(!show)} />
              </InputRightElement>
            ))
          )}
        </InputGroup>
      )}

      {errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputCustom;
