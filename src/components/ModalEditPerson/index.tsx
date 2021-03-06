import React, { useRef, useCallback } from "react";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";

import { Form, Div, Camp } from "./styles";
import Modal from "../Modal";
import Input from "../Input";
import Select from "../Select";
import getValidationError from "../../utils/getValidationError";

interface IPeoplePlate {
  id: string;
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
  handleEditorPeople: (food: IPeoplePlate) => void;
  editingPerson: IPeoplePlate;
}

const ModalAddFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleEditorPeople,
  editingPerson,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IPeoplePlate) => {
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
        if (!data.typePerson) {
          data.typePerson = editingPerson.typePerson;
        }
        console.log(data, editingPerson.typePerson);
        await schama.validate(data, { abortEarly: false });

        handleEditorPeople({ ...data, id: editingPerson.id });
        setIsOpen();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [handleEditorPeople, setIsOpen, editingPerson]
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} initialData={editingPerson} onSubmit={handleSubmit}>
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
          <Input name="name" placeholder="Nome/Raz??o social" />
          <Input
            name="dataUlt"
            type="text"
            onFocus={(e) => {
              e.currentTarget.type = "date";
              e.currentTarget.focus();
            }}
            placeholder="Dt Ult Maniten????o"
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
          <Input name="observation" placeholder="Observa????es" />
        </Camp>

        <Div>
          <div />
          <button type="submit" data-testid="add-food-button">
            <p className="text">Atualizar</p>
          </button>
        </Div>
      </Form>
    </Modal>
  );
};

export default ModalAddFood;
