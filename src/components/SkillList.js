import React from 'react';
import styled from 'styled-components';
import Skill from './Skill';

const StyledSkillsList = styled.div`
  margin-top: 20px;
`;

const SkillsList = ({ skills }) => {
  return (
    <StyledSkillsList>
      {skills.map((skill, index) => (
        <Skill key={index} skill={skill} />
      ))}
    </StyledSkillsList>
  );
};

export default SkillsList;