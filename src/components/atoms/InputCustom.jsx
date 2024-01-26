/* eslint-disable react/prop-types */
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  FormHelperText,
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
  disabled,
  rightAddon,
  helper,
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
            isDisabled={disabled}
            bgColor="white"
          />
          {errorText ? (
            <InputRightElement>
              <InfoOutlineIcon color="red.500" />
            </InputRightElement>
          ) : (
            typeInput === "password" &&
            !disabled &&
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
          {rightAddon && <InputRightElement>{rightAddon}</InputRightElement>}
        </InputGroup>
      )}
      {errorText && <FormErrorMessage mt="2px">{errorText}</FormErrorMessage>}
      {helper && <FormHelperText mt="2px">{helper}</FormHelperText>}
    </FormControl>
  );
};

export default InputCustom;
