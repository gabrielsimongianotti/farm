import React, { useRef, useEffect } from "react";

import { OptionTypeBase, Props as SelectProps } from "react-select";

import { SelectReact, Div } from "./styles";
import { useField } from "@unform/core";

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  placeholder: string;
  options: { value: string; id: string; label: string }[];
  isMulti?: false | undefined;
}

export default function Select({
  name,
  placeholder,
  isMulti = false,
  ...rest
}: Props) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  let customStyles = {
    option: (provided: any) => ({
      ...provided,
      color: "#65493D",
      padding: 20,
      background: "#ECCE9C",
      borderBottom: "2px solid #f6d192",
    }),
    control: () => ({
      padding: 11,
      color: "#65493D",
      display: "flex",
      width: "80%",
      background: "#ECCE9C",
      borderRadius: 8,
      borderLeft: !!error ? "5px solid #c53030 " : "5px solid #ECCE9C",
    }),
    menuList: (provided: any) => ({
      ...provided,
      padding: 0,
    }),
  };
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return "";
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, isMulti]);

  return (
    <Div>
      <label>{placeholder}</label>
      <SelectReact
        styles={customStyles}
        defaultValue={rest.options?.filter(
          (option) => option.value === defaultValue
        )}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
    </Div>
  );
}
