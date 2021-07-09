import React, { useRef, useCallback } from "react";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";

import { Form, Div, Camp } from "./styles";
import Modal from "../Modal";
import Input from "../Input";
import Select from "../Select";
import getValidationError from "../../utils/getValidationError";

interface IPropertiesPlate {
  id: string;
  ativo: boolean;
  nameProperty: string;
  municipoice: string;
  uf: string;
  name: string;
  rg: string;
  incra: string;
  nrf: string;
  areaProperty: string;
  mediaHeight: string;
  expansion: string;
  observation?: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: Omit<IPropertiesPlate, "id">) => void;
}

const ModalAddProperties: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddFood,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IPropertiesPlate) => {
      try {
        const schama = Yup.object().shape({
          active: Yup.string().required(),
          nameProperty: Yup.string().required(),
          municipoice: Yup.string().required(),
          uf: Yup.string().required(),
          rg: Yup.string().required(),
          incra: Yup.string().required(),
          nrf: Yup.string().required(),
          areaProperty: Yup.string().required(),
          mediaHeight: Yup.string().required(),
          expansion: Yup.string().required(),
          observation: Yup.string(),
        });
        console.log(JSON.stringify(data));
        await schama.validate(data, { abortEarly: false });
        console.log(JSON.stringify(data));
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
      <Form
        ref={formRef}
        initialData={{
          produtor: 1,
          produtorName: "Coperativa de Cafecultores e Agro",
          propriedade: 1,
          addDate: "15/03/2016",
          dataUlt: "15/03/2016",
          active: "sim",
        }}
        onSubmit={handleSubmit}
      >
        <h1>Nova Propriedade Rural</h1>
        <Camp>
          <Input name="produtorName" placeholder="nome do Produtor" disabled />
          <Input name="produtor" placeholder="Produtor" disabled />
        </Camp>
        <Camp>
          <Input
            name="addDate"
            type="text"
            onFocus={(e) => {
              e.currentTarget.type = "date";
              e.currentTarget.focus();
            }}
            placeholder="Dt Cadastro"
            disabled
          />
          <Input name="propriedade" placeholder="Propriedade" disabled />
        </Camp>
        <Camp>
          <Input
            name="dataUlt"
            type="text"
            onFocus={(e) => {
              e.currentTarget.type = "date";
              e.currentTarget.focus();
            }}
            disabled
            placeholder="Dt Ult Manitenção"
          />
          <Input name="active" placeholder="Ativo" disabled />
        </Camp>
        <Input name="nameProperty" placeholder="Nome proprietario" />
        <Camp>
          <Input name="uf" placeholder="UF" />
          <Input name="municipoice" placeholder="Municpio" />
        </Camp>
        <Camp>
          <Input name="rg" placeholder="RG/Inscrição" />
          <Input name="incra" placeholder="incra" />
        </Camp>
        <Camp>
          <Input name="nrf" placeholder="Ntf" />
          <Input name="areaProperty" placeholder="Area Propriedade" />
        </Camp>
        <Camp>
          <Input name="mediaHeight" placeholder="Altitude Media" />
          <Input name="expansion" placeholder="Expansão" />
        </Camp>
        <Input name="observation" placeholder="observações" />
        <Div>
          <button type="submit" data-testid="add-food-button">
            <p className="text">Cadastras</p>
          </button>
        </Div>
      </Form>
    </Modal>
  );
};

export default ModalAddProperties;
