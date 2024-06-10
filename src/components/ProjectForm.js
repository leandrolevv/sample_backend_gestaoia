import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Sidebar from './SideBar';

const Container = styled.div`
  display: flex; /* Define o container como flexível */
  max-width: 900px; /* Define a largura máxima do container */
  margin: 0 auto; /* Centraliza o container na tela */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;


const Content = styled.div`
  flex: 1; /* Permite que o conteúdo ocupe o espaço restante */
  padding-left: 20px; /* Adiciona um espaço à esquerda para separar o conteúdo da barra lateral */
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const FormSection = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SkillTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const SkillRow = styled.tr`
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`;

const SkillName = styled.td`
  padding: 10px 0;
  font-weight: bold;
  color: #333;
`;

const StarRatingCell = styled.td`
  padding: 10px 0;
  text-align: right;
`;

const StarContainer = styled.span`
  cursor: pointer;
  color: ${(props) => (props.filled ? 'gold' : 'gray')};
`;

const Button = styled.button`
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  margin-top: 10px;
  color: red;
`;

const ProjectForm = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState({});
  const [description, setDescription] = useState('');
  const [internalCode, setInternalCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}skills`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSkills(response.data.data);
      } catch (error) {
        console.error('Erro ao carregar habilidades:', error.message);
      }
    };

    fetchSkills();
  }, []);

  const handleSkillChange = (skillId, rating) => {
    setSelectedSkills({ ...selectedSkills, [skillId]: rating });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const projectData = {
        description: description,
        internalCode: internalCode,
        skillLevel: Object.keys(selectedSkills).map((skillId) => ({
          skillId: parseInt(skillId),
          level: selectedSkills[skillId]
        }))
      };
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}projects`, projectData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Limpar campos e redefinir estado
      setDescription('');
      setInternalCode('');
      //setSelectedSkills({});
      setLoading(false);
      setSuccessMessage('Projeto cadastrado com sucesso.');
    } catch (error) {
      console.error('Erro ao cadastrar projeto:', error.message);
      setError('Erro ao cadastrar projeto. Por favor, tente novamente.');
      setLoading(false);
    }
  };

  return (
    <Container>
      <Sidebar/>
      <Content>
        <Heading>Cadastrar Projeto</Heading>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <FormSection>
          <FormLabel htmlFor="internalCode">Código Interno:</FormLabel>
          <InputField
            type="text"
            id="internalCode"
            value={internalCode}
            onChange={(e) => setInternalCode(e.target.value)}
            placeholder="Digite o código interno do projeto"
          />
        </FormSection>
        <FormSection>
          <FormLabel htmlFor="description">Descrição:</FormLabel>
          <InputField
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Digite a descrição do projeto"
          />
        </FormSection>
        <SkillTable>
          <tbody>
            {skills.map((skill) => (
              <SkillRow key={skill.id}>
                <SkillName>{skill.name}</SkillName>
                <StarRatingCell>
                  {[1, 2, 3, 4, 5].map((index) => (
                    <StarContainer
                      key={index}
                      filled={index <= selectedSkills[skill.id]}
                      onClick={() => handleSkillChange(skill.id, index)}
                    >
                      ★
                    </StarContainer>
                  ))}
                </StarRatingCell>
              </SkillRow>
            ))}
          </tbody>
        </SkillTable>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </Button>
      </Content>
    </Container>
  );
};

export default ProjectForm;