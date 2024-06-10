import React, { useState } from 'react';
import StarRating from './StarRating';

const Skill = ({ skill }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <div>
      <p>{skill.name}</p>
      <StarRating value={rating} onRatingChange={handleRatingChange} />
    </div>
  );
};

export default Skill;