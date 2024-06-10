// StudentDetailPage.js

import React, { useState } from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const TableRow = styled.tr`
  background-color: #f9f9f9;
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const ExpandIcon = styled.span`
  font-size: 18px;
  cursor: pointer;
`;

const StudentDetailPage = ({ studentData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Table>
      <tbody>
        <TableRow>
          <TableCell>
            <ExpandIcon onClick={toggleDetails}>{isExpanded ? '-' : '+'}</ExpandIcon>
          </TableCell>
          <TableCell>{studentData.name}</TableCell>
        </TableRow>
        {isExpanded && (
          <TableRow>
            <TableCell colSpan="2">
              <p><strong>RA:</strong> {studentData.ra}</p>
              <p><strong>CPF:</strong> {studentData.cpf}</p>
              <p><strong>RG:</strong> {studentData.rg}</p>
              <p><strong>Telefone:</strong> {studentData.cellphone}</p>
              <p><strong>Curso:</strong> {studentData.currentCourse.description}</p>
              <p><strong>Modalidade:</strong> {studentData.currentCourse.mode}</p>
              <p><strong>Período:</strong> {studentData.currentCourse.period}</p>
              <p><strong>Campus:</strong> {studentData.currentCourse.campus}</p>
              {/* Adicione mais detalhes aqui conforme necessário */}
            </TableCell>
          </TableRow>
        )}
      </tbody>
    </Table>
  );
};

export default StudentDetailPage;