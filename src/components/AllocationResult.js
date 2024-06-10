import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Sidebar from './SideBar';

const Container = styled.div`
  display: grid;
  grid-template-columns: 200px auto; /* Define duas colunas: uma para o Sidebar e outra para o conteúdo principal */
  gap: 20px; /* Espaço entre as colunas */
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProjectContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
`;

const ProjectName = styled.h3`
  margin-bottom: 10px;
`;

const StudentTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StudentHeader = styled.th`
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const StudentRow = styled.tr`
  border-bottom: 1px solid #ccc;
`;

const StudentData = styled.td`
  padding: 10px;
`;

const AllocationResult = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [semester, setSemester] = useState('2024-1'); // Definindo o semestre inicial

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}GetAllocationResult/${semester}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProjectData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error.message);
      setLoading(false);
    }
  };

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <Container>
      <Sidebar />
      <div>
        <h2>Resultado Alocações</h2>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="semester">Semestre (exemplo: 2024-1):</label>
          <input type="text" id="semester" value={semester} onChange={handleSemesterChange} />
          <button type="submit" disabled={loading}>
            {loading ? 'Carregando...' : 'Atualizar Lista'}
          </button>
        </Form>
        {projectData.map((project, index) => (
          <ProjectContainer key={index}>
            <ProjectName>{project.project.description}</ProjectName>
            <StudentTable>
              <thead>
                <tr>
                  <StudentHeader>Nome</StudentHeader>
                  <StudentHeader>RA</StudentHeader>
                  <StudentHeader>CPF</StudentHeader>
                  <StudentHeader>RG</StudentHeader>
                  <StudentHeader>Celular</StudentHeader>
                </tr>
              </thead>
              <tbody>
                {project.students?.map((student, studentIndex) => (
                  <StudentRow key={studentIndex}>
                    <StudentData>{student.name}</StudentData>
                    <StudentData>{student.ra}</StudentData>
                    <StudentData>{student.cpf}</StudentData>
                    <StudentData>{student.rg}</StudentData>
                    <StudentData>{student.cellphone}</StudentData>
                  </StudentRow>
                ))}
              </tbody>
            </StudentTable>
          </ProjectContainer>
        ))}
      </div>
    </Container>
  );
};

export default AllocationResult;