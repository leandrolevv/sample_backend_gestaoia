import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SemesterDetails from './SemesterDetails';
import Sidebar from './SideBar';

const Container = styled.div`
  display: grid;
  grid-template-columns: 200px auto; /* Define duas colunas: uma para o Sidebar e outra para o conteúdo principal */
  gap: 20px; /* Espaço entre as colunas */
  padding: 2rem;
`;

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}student-registrations`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data.data); // Ajuste aqui para acessar os dados dentro da chave "data"
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Sidebar />
      <div>
        <h2>Dashboard</h2>
        <button onClick={() => window.location.reload()} disabled={loading}>
          {loading ? 'Carregando...' : 'Atualizar Lista'}
        </button>
        {Array.isArray(userData) && userData.map((semesterData, index) => (
          <SemesterDetails key={index} semesterData={semesterData} />
        ))}
      </div>
    </Container>
  );
};

export default Dashboard;