import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  background-color: #f0f0f0; /* Cor de fundo da barra lateral */
  padding: 20px;
`;

const SidebarHeading = styled.h3`
  color: #333; /* Cor do texto do título */
  font-size: 1.2rem; /* Tamanho da fonte do título */
  margin-bottom: 20px; /* Espaçamento inferior do título */
`;

const SidebarList = styled.ul`
  list-style: none; /* Remove os marcadores da lista */
  padding: 0; /* Remove o preenchimento padrão da lista */
`;

const SidebarListItem = styled.li`
  margin-bottom: 10px; /* Espaçamento entre os itens da lista */
`;

const SidebarLink = styled.a`
  color: #555; /* Cor do texto do link */
  text-decoration: none; /* Remove o sublinhado padrão do link */

  &:hover {
    color: #000; /* Cor do texto do link ao passar o mouse */
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarHeading>Menu</SidebarHeading>
      <SidebarList>
        <SidebarListItem>
          <SidebarLink href="/skills">Visualizar Habilidades</SidebarLink>
        </SidebarListItem>
        <SidebarListItem>
          <SidebarLink href="/students">Visualizar Estudantes</SidebarLink>
        </SidebarListItem>
        <SidebarListItem>
          <SidebarLink href="/users">Visualizar Usuários</SidebarLink>
        </SidebarListItem>
        <SidebarListItem>
          <SidebarLink href="/project">Cadastrar Projeto</SidebarLink>
        </SidebarListItem>
        <SidebarListItem>
          <SidebarLink href="/allocationresults">Alocação de Alunos</SidebarLink>
        </SidebarListItem>
        
      </SidebarList>
    </SidebarContainer>
  );
};

export default Sidebar;