import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

import Header from "../../components/Header";

import { Container, CardContainer, TableContainer, Message } from "./styles";
import ModalAddProperties from "../../components/ModalAddProperties";
import ModalEditProperties from "../../components/ModalEditProperties";

interface Properties {
  id: string;
  ativo: boolean;
  nameProperty: string;
  municipoice: string;
  uf: string;
  rg: string;
  incra: string;
  nrf: string;
  areaProperty: string;
  mediaHeight: string;
  expansion: string;
  observation?: string;
}

const RuralProperty: React.FC = () => {
  const [propertys, setProperties] = useState<Properties[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingModalOpen, setEditingModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Properties>(
    {} as Properties
  );

  const toggleModal = (): void => {
    setModalOpen(!modalOpen);
  };

  const editorToggleModal = (): void => {
    setEditingModalOpen(!editingModalOpen);
  };

  const handleAddRuralProperty = (data: Omit<Properties, "id">): void => {
    console.log(data);
    setProperties([...propertys, { ...data, id: uuidv4() }]);
    toggleModal();
  };

  const handleEditorProperties = (data: Properties): void => {
    console.log(data);
    setProperties(
      propertys.map((property) =>
        property.id === data.id ? { ...data } : property
      )
    );
  };

  const handleDeleteProperties = (data: Properties): void => {
    setProperties(propertys.filter((property) => property.id !== data.id));
  };
  return (
    <>
      <Header />
      <ModalAddProperties
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddRuralProperty}
      />

      <ModalEditProperties
        isOpen={editingModalOpen}
        setIsOpen={editorToggleModal}
        editingProperties={editingPerson}
        handleEditorProperties={handleEditorProperties}
      />
      <Container>
        <CardContainer>
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>Nome Propriedade</th>
                  <th>Municipio</th>
                  <th>UF</th>
                  <th>Altitude media</th>
                  <th>Expanção</th>
                  <th>Area Propriedade</th>
                </tr>
              </thead>

              <tbody>
                {propertys?.map((property) => (
                  <tr key={property.id}>
                    <td>{property.nameProperty}</td>
                    <td>{property.municipoice}</td>
                    <td>{property.uf}</td>
                    <td>{property.mediaHeight} ha</td>
                    <td>{property.expansion} metros</td>
                    <td>{property.areaProperty} ha</td>
                    <td>
                      <div>
                        <span
                          onClick={() => {
                            setEditingPerson(property);
                            editorToggleModal();
                          }}
                          style={{
                            paddingRight: 2,
                          }}
                        >
                          <FiEdit size={20} />
                        </span>
                        <span
                          onClick={() => {
                            handleDeleteProperties(property);
                          }}
                          style={{ paddingLeft: 2 }}
                        >
                          <AiOutlineDelete size={22} />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!propertys.length ? (
              <Message>não a dados cadastrados</Message>
            ) : null}
            <button
              onClick={() => {
                toggleModal();
              }}
            >
              <div className="text">Adicionar</div>
            </button>
          </TableContainer>
        </CardContainer>
      </Container>
    </>
  );
};

export default RuralProperty;
