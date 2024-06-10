import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Sidebar from './SideBar';

const Container = styled.div`
  display: flex;
  padding: 2rem;
`;

const UsersContainer = styled.div`
  flex: 1;
  margin-left: 2rem;
`;

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data.data); // Assumindo que os usuários estão dentro da chave "data"
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container>
      <Sidebar />
      <UsersContainer>
        <h2>Lista de Usuários</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Permissões</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.roles}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </UsersContainer>
    </Container>
  );
};

export default UserListPage;