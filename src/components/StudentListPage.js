import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import StudentDetailPage from './StudentDetailPage';
import Sidebar from './SideBar';

const Container = styled.div`
  display: flex;
  padding: 2rem;
`;

const StudentsContainer = styled.div`
  flex: 1; /* Faz o contêiner ocupar o espaço disponível */
  margin-left: 2rem; /* Espaço entre a barra lateral e a lista de alunos */
`;

const StudentListPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}students`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStudents(response.data.data);
      } catch (error) {
        console.error('Erro ao carregar alunos:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Sidebar />
      <StudentsContainer>
        <h2>Lista de Alunos</h2>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>
                  <StudentDetailPage studentData={student} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </StudentsContainer>
    </Container>
  );
};

export default StudentListPage;