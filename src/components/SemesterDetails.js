import React, { useState } from 'react';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 10px;
  text-align: left;
  background-color: #f2f2f2;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const ToggleButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const SemesterDetails = ({ semesterData }) => {
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [showScoreDetails, setShowScoreDetails] = useState(false);
  const [showSkillsDetails, setShowSkillsDetails] = useState(false);

  const toggleStudentDetails = () => setShowStudentDetails(!showStudentDetails);
  const toggleCourseDetails = () => setShowCourseDetails(!showCourseDetails);
  const toggleScoreDetails = () => setShowScoreDetails(!showScoreDetails);
  const toggleSkillsDetails = () => setShowSkillsDetails(!showSkillsDetails);

  const { student, skillsDescription, registrationDate, subject, choicePriority, enrolledInIndustry4_0, doesNotMeetRequirements, firstMeetingDate, semester, studentRegistrationScore, studentSkills } = semesterData;

  return (
    <DetailsContainer>
      <Table>
        <tbody>
          <tr><th><span><strong>Nome do Aluno:</strong> {student.name}</span></th></tr>
          <tr>
            <Th>
              <ToggleButton onClick={toggleStudentDetails}>
                <span>{showStudentDetails ? '▼' : '►'}</span>
                <span>Detalhes do Aluno</span>
              </ToggleButton>
            </Th>
          </tr>
          {showStudentDetails && (
            <tr>
              <Td colSpan="2">
                <p><strong>Nome do Aluno:</strong> {student.name}</p>
                <p><strong>RA:</strong> {student.ra}</p>
                <p><strong>CPF:</strong> {student.cpf}</p>
                <p><strong>RG:</strong> {student.rg}</p>
                <p><strong>Telefone:</strong> {student.cellphone}</p>
                <p><strong>E-mail:</strong> {student.user.email}</p>
              </Td>
            </tr>
          )}

          <tr>
            <Th>
              <ToggleButton onClick={toggleCourseDetails}>
                <span>{showCourseDetails ? '▼' : '►'}</span>
                <span>Detalhes do Curso Atual</span>
              </ToggleButton>
            </Th>
          </tr>
          {showCourseDetails && (
            <tr>
              <Td colSpan="2">
                <p><strong>Curso Atual:</strong> {student.currentCourse.description}</p>
                <p><strong>Modo do Curso:</strong> {student.currentCourse.mode}</p>
                <p><strong>Período do Curso:</strong> {student.currentCourse.period}</p>
                <p><strong>Campus:</strong> {student.currentCourse.campus}</p>
              </Td>
            </tr>
          )}

          <tr>
            <Th>
              <ToggleButton onClick={toggleScoreDetails}>
                <span>{showScoreDetails ? '▼' : '►'}</span>
                <span>Pontuação do Aluno</span>
              </ToggleButton>
            </Th>
          </tr>
          {showScoreDetails && (
  <tr>
    <Td colSpan="2">
      <p><strong>Pontuação do Registro do Aluno:</strong> {studentRegistrationScore.performanceCoefficient}</p>
      <p><strong>Pontuação do Programa de Iniciação Científica:</strong> {studentRegistrationScore.scientificInitiationProgramScore}</p>
      <p><strong>Pontuação do Programa de Monitoramento Institucional:</strong> {studentRegistrationScore.institutionalMonitoringProgramScore}</p>
      <p><strong>Pontuação da Experiência em Empresa Júnior:</strong> {studentRegistrationScore.juniorEnterpriseExperienceScore}</p>
      <p><strong>Pontuação de Projetos no Hotel Tecnológico:</strong> {studentRegistrationScore.projectInTechnologicalHotelScore}</p>
      <p><strong>Pontuação de Voluntariado:</strong> {studentRegistrationScore.volunteeringScore}</p>
      <p><strong>Pontuação de Disciplinas de Alto Desempenho:</strong> {studentRegistrationScore.highGradeDisciplineScore}</p>
      <p><strong>Pontuação de Cursos de Certificação:</strong> {studentRegistrationScore.certificationCoursesScore}</p>
      <p><strong>Pontuação de Disciplinas de Alto Desempenho:</strong> {studentRegistrationScore.highGradeCoursesScore}</p>
      <p><strong>Pontuação de Projetos de IA:</strong> {studentRegistrationScore.aiProjectsScore}</p>
      <p><strong>Pontuação de Estágio/Emprego:</strong> {studentRegistrationScore.internshipEmploymentScore}</p>
      <p><strong>Pontuação de Certificação em Tecnologia:</strong> {studentRegistrationScore.technologyCertificationScore}</p>
      <p><strong>Pontuação de Tecnologia de Baixo Nível:</strong> {studentRegistrationScore.lowLevelTechScore}</p>
      <p><strong>Descrição das Pontuações dos Cursos:</strong> {studentRegistrationScore.scoreCoursesDescription}</p>
    </Td>
  </tr>
)}

          <tr>
            <Th>
              <ToggleButton onClick={toggleSkillsDetails}>
                <span>{showSkillsDetails ? '▼' : '►'}</span>
                <span>Habilidades do Aluno</span>
              </ToggleButton>
            </Th>
          </tr>
          {showSkillsDetails && (
            <tr>
              <Td colSpan="2">
                <p><strong>Descrição das Habilidades:</strong> {skillsDescription}</p>
                {studentSkills.map((skill, index) => (
                  <div key={index}>
                    <p><strong>Habilidade:</strong> {skill.skill.name}</p>
                    <p><strong>Nível:</strong> {skill.level}</p>
                  </div>
                ))}
              </Td>
            </tr>
          )}
        </tbody>
      </Table>
    </DetailsContainer>
  );
};

export default SemesterDetails;