import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

import Header from "../../components/Header";

import { Container, CardContainer, TableContainer, Message } from "./styles";
import ModalAddFood from "../../components/ModalAddPerson";
import ModalEditFood from "../../components/ModalEditPerson";

interface People {
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

const Dashboard: React.FC = () => {
  const [peoples, setPeoples] = useState<People[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingModalOpen, setEditingModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<People>({} as People);

  const toggleModal = (): void => {
    setModalOpen(!modalOpen);
  };

  const editorToggleModal = (): void => {
    setEditingModalOpen(!editingModalOpen);
  };

  const handleAddFood = (data: Omit<People, "id">): void => {
    setPeoples([...peoples, { ...data, id: uuidv4() }]);
    toggleModal();
  };

  const handleEditorPeople = (data: People): void => {
    setPeoples(
      peoples.map((people) => (people.id === data.id ? { ...data } : people))
    );
  };

  const handleDeletePeople = (data: People): void => {
    setPeoples(peoples.filter((people) => people.id !== data.id));
  };
  return (
    <>
      <Header />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editingModalOpen}
        setIsOpen={editorToggleModal}
        editingPerson={editingPerson}
        handleEditorPeople={handleEditorPeople}
      />
      <Container>
        <CardContainer>
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Nome/Razão social</th>
                  <th>CPF/CNPJ</th>
                  <th>RG/Ie</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {peoples?.map((people) => (
                  <tr key={people.id}>
                    <td>{people.code}</td>
                    <td>{people.name}</td>
                    <td>{people.cpfCnpj}</td>
                    <td>{people.rg}</td>
                    <td>
                      <div>
                        <span
                          onClick={() => {
                            setEditingPerson(people);
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
                            handleDeletePeople(people);
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
            {!peoples.length ? (
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

export default Dashboard;
