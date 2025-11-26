import React, { useState } from 'react';

const TravelQuiz = ({ language }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      q: 'What is your travel style?',
      options: ['Adventure', 'Cultural', 'Relaxation', 'Food & Wine'],
      destination: ['Himachal Pradesh', 'Rajasthan', 'Goa', 'Kerala'],
    },
    {
      q: 'Preferred climate?',
      options: ['Cold & Snowy', 'Warm & Tropical', 'Mild & Pleasant', 'Hot & Dry'],
      destination: ['Kashmir', 'Kerala', 'Himalayan Hills', 'Rajasthan'],
    },
    {
      q: 'Best time to travel?',
      options: ['Winter', 'Summer', 'Monsoon', 'Year-round'],
      destination: ['December-February', 'May-June', 'July-September', 'October-November'],
    },
    {
      q: 'Budget preference?',
      options: ['Budget', 'Moderate', 'Luxury', 'No limit'],
      destination: ['Goa', 'Himachal', 'Kerala Backwaters', 'Luxury Resorts'],
    },
    {
      q: 'Ideal duration?',
      options: ['Weekend', '1 week', '2 weeks', '1 month+'],
      destination: ['Nearby Hill Station', 'Regional Tour', 'State Tour', 'Cross-Country'],
    },
  ];

  const recommendations = {
    high: ['Maldives', 'Thailand', 'Japan'],
    medium: ['Kerala', 'Rajasthan', 'Goa'],
    low: ['Himachal Pradesh', 'Uttarakhand', 'Kashmir'],
  };

  const handleAnswer = (idx) => {
    setScore(score + idx);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const getRecommendation = () => {
    const avgScore = score / questions.length;
    if (avgScore > 2.5) return recommendations.high;
    if (avgScore > 1.5) return recommendations.medium;
    return recommendations.low;
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="component-card">
      <h2>❓ Travel Destination Quiz</h2>

      {!showResult ? (
        <div className="quiz-container">
          <div className="quiz-progress">
            Question {currentQ + 1} of {questions.length}
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
          </div>

          <h3>{questions[currentQ].q}</h3>

          <div className="quiz-options">
            {questions[currentQ].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="quiz-option"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="quiz-result">
          <h3>🎉 Your Travel Recommendations!</h3>
          <div className="result-destinations">
            {getRecommendation().map((dest, i) => (
              <div key={i} className="result-card">
                <h4>{dest}</h4>
                <p>Based on your preferences!</p>
              </div>
            ))}
          </div>
          <button onClick={resetQuiz} className="btn btn-primary">Retake Quiz</button>
        </div>
      )}
    </div>
  );
};

export default TravelQuiz;
