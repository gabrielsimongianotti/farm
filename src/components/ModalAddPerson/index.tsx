import React, { useRef, useCallback } from "react";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";

import { Form, Div, Camp } from "./styles";
import Modal from "../Modal";
import Input from "../Input";
import Select from "../Select";
import getValidationError from "../../utils/getValidationError";
interface IFoodPlate {
  code: string;
  addDate: Date;
  dataUlt: Date;
  typePerson: string;
  name: string;
  cpfCnpj: string;
  rg: string;
  document: string;
  observation?: string;
}

interface ICreatePeopleData {
  code: string;
  addDate: Date;
  dataUlt: Date;
  typePerson: string;
  name: string;
  cpfCnpj: string;
  rg: string;
  document: string;
  observation?: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: Omit<IFoodPlate, "id">) => void;
}

const ModalAddFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddFood,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreatePeopleData) => {
      try {
        const schama = Yup.object().shape({
          code: Yup.string().required("Codigo obrigatorio"),
          addDate: Yup.string().required(),
          dataUlt: Yup.string().required(),
          typePerson: Yup.string().required(),
          name: Yup.string().required(),
          cpfCnpj: Yup.string()
            .required()
            .matches(
              /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/
            ),
          rg: Yup.string().required(),
          document: Yup.string().required(),
          observation: Yup.string(),
        });

        await schama.validate(data, { abortEarly: false });

        handleAddFood(data);
        setIsOpen();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [handleAddFood, setIsOpen]
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Produtor Rural</h1>
        <Camp style={{ marginRight: 25 }}>
          <Input name="code" placeholder="Codigo" />
          <Input
            name="addDate"
            type="text"
            onFocus={(e) => {
              e.currentTarget.type = "date";
              e.currentTarget.focus();
            }}
            placeholder="Dt Cadastro"
          />
        </Camp>
        <Camp style={{ marginRight: 25 }}>
          <Input name="name" placeholder="Nome/Razão social" />
          <Input
            name="dataUlt"
            type="text"
            onFocus={(e) => {
              e.currentTarget.type = "date";
              e.currentTarget.focus();
            }}
            placeholder="Dt Ult Manitenção"
          />
        </Camp>
        <Camp style={{ marginTop: -25 }}>

          <Input name="cpfCnpj" placeholder="CPF/CNPJ" />
          <Input name="rg" placeholder="RG/Ie" />
        </Camp>
        <Camp style={{ marginTop: -25 }}>
          <Select
            name="typePerson"
            placeholder="Tipo Pessoa"
            options={[
              {
                id: "fisicaPessoa",
                value: "fisicaPessoa",
                label: "Pessoa Fisica",
              },
              {
                id: "juridicaPessoa",
                value: "juridicaPessoa",
                label: "Pessoa Juridica",
              },
            ]}
          />

          <Input name="document" placeholder="Outro Documentos" />
        </Camp>
        <Camp style={{ marginTop: -25 }}>
          <Input name="observation" placeholder="OPbservações" />
        </Camp>

        <Div>
          <button type="submit" data-testid="add-food-button">
            <p className="text">Cadastras</p>
          </button>
        </Div>
      </Form>
    </Modal>
  );
};

export default ModalAddFood;
