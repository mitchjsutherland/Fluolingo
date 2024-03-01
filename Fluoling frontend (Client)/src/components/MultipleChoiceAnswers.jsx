import React from 'react';

const MultipleChoiceAnswers = ({ answers, handleAnswerClick }) => {
  return (
    <div>
      {answers.map((answer, index) => (
        <button key={index} onClick={() => handleAnswerClick(answer)}>
          {answer}
        </button>
      ))}
    </div>
  );
};

export default MultipleChoiceAnswers;
