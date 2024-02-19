/* eslint-disable react/prop-types */
import { InfoOutlineIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";

// eslint-disable-next-line react/display-name
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
  value
}) => {
  const [show, setShow] = useState(true);

  return (
    <FormControl
      isInvalid={errorText}
      isRequired={isReq}
      width="100%"
      marginBottom={4}
    >
      {label && <FormLabel>{label}</FormLabel>}
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
            // defaultValue={defaultValue}
            value={value}
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
          {rightAddon && <InputRightAddon>{rightAddon}</InputRightAddon>}
        </InputGroup>
      )}
      {errorText && <FormErrorMessage mt="2px">{errorText}</FormErrorMessage>}
      {helper && <FormHelperText mt="2px">{helper}</FormHelperText>}
    </FormControl>
  );
};

export default InputCustom;
