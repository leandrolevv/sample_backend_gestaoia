import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;

  &:hover {
    background-color: #45a049;
  }
`;

const Message = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${props => props.error ? '#f8d7da' : '#d4edda'};
  color: ${props => props.error ? '#721c24' : '#155724'};
  border: 1px solid ${props => props.error ? '#f5c6cb' : '#c3e6cb'};
  border-radius: 4px;
  text-align: center;
  width: 100%;
`;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [showReturnButton, setShowReturnButton] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}accounts`, { name, email });
      const userData = response.data.data;
      setMessage(`Usuário registrado com sucesso, sua senha é: ${userData.password}`);
      setIsError(false);
      setShowReturnButton(true);
      setName('');
      setEmail('');
    } catch (error) {
      const errorMessage = error.response?.data?.errors?.[0] || 'Registro falhou';
      setMessage(errorMessage);
      setIsError(true);
      setShowReturnButton(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleRegister}>
        <Title>Registrar</Title>
        <Input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Nome" 
          required 
        />
        <Input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <Button type="submit">Registrar</Button>
        {message && <Message error={isError}>{message}</Message>}
        {showReturnButton && (
          <Button type="button" onClick={() => navigate('/')}>
            Retornar para login
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default Register;