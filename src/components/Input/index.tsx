import React, { InputHTMLAttributes, useEffect, useRef } from "react";

import { IconBaseProps } from "react-icons";
import { useField } from "@unform/core";

import { Container, Div } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({
  name,
  icon: Icon,
  disabled,
  placeholder,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  // const handleInputFocus = useCallback(() => {
  //   setIsFocused(true);
  // }, []);

  // const handleInputBlur = useCallback(() => {
  //   setIsFocused(false);

  //   setIsFilled(!!inputRef.current?.value);
  // }, []);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Div>
      <label>{placeholder}</label>
      <Container isErrored={!!error} isDisabled={!!disabled}>
        <input
          // onFocus={handleInputFocus}
          // onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          type="textarea"
          {...rest}
          disabled={disabled}
        />
      </Container>
    </Div>
  );
};

export default Input;
