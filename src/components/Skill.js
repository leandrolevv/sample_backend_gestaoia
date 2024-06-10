import React from 'react';
import styled from 'styled-components';

const SkillContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const SkillName = styled.h3`
  margin-top: 0;
`;

const SkillTag = styled.p`
  margin: 5px 0;
`;

const Skill = ({ skill }) => {
  return (
    <SkillContainer>
      <SkillName>{skill.name}</SkillName>
      <SkillTag><strong>Tag:</strong> {skill.tag}</SkillTag>
      <SkillTag><strong>Soft Skill:</strong> {skill.isSoftSkill ? 'Sim' : 'Não'}</SkillTag>
    </SkillContainer>
  );
};

export default Skill;