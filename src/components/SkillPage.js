import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Sidebar from './SideBar';
import SkillsList from './SkillList';

const Container = styled.div`
  display: flex;
  padding: 2rem;
`;

const SkillsContainer = styled.div`
  flex: 1;
  margin-left: 2rem;
`;

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}skills`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
       
        setSkills(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar habilidades:', error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Sidebar />
      <SkillsContainer>
        <h2>Lista de Habilidades</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <SkillsList skills={skills} />
        )}
      </SkillsContainer>
    </Container>
  );
};

export default SkillsPage;