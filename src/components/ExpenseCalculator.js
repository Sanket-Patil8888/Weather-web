import React, { useState } from 'react';

const ExpenseCalculator = ({ language }) => {
  const [expenses, setExpenses] = useState({
    accommodation: 0,
    food: 0,
    transport: 0,
    activities: 0,
    shopping: 0,
    other: 0,
  });

  const [showChart, setShowChart] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenses(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const total = Object.values(expenses).reduce((a, b) => a + b, 0);

  const categories = [
    { name: 'accommodation', label: '🏨 Accommodation', color: '#FF6B6B' },
    { name: 'food', label: '🍽️ Food', color: '#4ECDC4' },
    { name: 'transport', label: '🚗 Transport', color: '#45B7D1' },
    { name: 'activities', label: '🎯 Activities', color: '#FFA07A' },
    { name: 'shopping', label: '🛍️ Shopping', color: '#FFD93D' },
    { name: 'other', label: '💳 Other', color: '#A8DADC' },
  ];

  return (
    <div className="component-card">
      <h2>💰 Travel Expense Calculator</h2>

      <div className="expense-form">
        {categories.map(cat => (
          <div key={cat.name} className="expense-input">
            <label>{cat.label}</label>
            <input
              type="number"
              name={cat.name}
              value={expenses[cat.name]}
              onChange={handleChange}
              placeholder="Amount in ₹"
              className="input-field"
            />
          </div>
        ))}
      </div>

      <div className="total-summary">
        <h3>Total Expense: <span>₹{total.toFixed(2)}</span></h3>
      </div>

      <button onClick={() => setShowChart(!showChart)} className="btn btn-primary">
        {showChart ? 'Hide Chart' : 'Show Chart'}
      </button>

      {showChart && (
        <div className="chart-container">
          <h3>Expense Breakdown</h3>
          <div className="bar-chart">
            {categories.map(cat => (
              <div key={cat.name} className="chart-item">
                <div className="chart-label">{cat.label}</div>
                <div className="chart-bar-wrapper">
                  <div
                    className="chart-bar"
                    style={{
                      width: total > 0 ? `${(expenses[cat.name] / total) * 100}%` : '0',
                      backgroundColor: cat.color,
                    }}
                  >
                    <span className="bar-value">₹{expenses[cat.name]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pie-chart-simple">
            {categories.map((cat, i) => (
              total > 0 && (
                <div
                  key={cat.name}
                  className="pie-segment"
                  style={{
                    backgroundColor: cat.color,
                    width: `${(expenses[cat.name] / total) * 100}%`,
                  }}
                  title={`${cat.label}: ₹${expenses[cat.name]}`}
                />
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseCalculator;
