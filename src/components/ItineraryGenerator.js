import React, { useState } from 'react';

const ItineraryGenerator = ({ language, onSaveTrip }) => {
  const [formData, setFormData] = useState({
    destination: '',
    days: 3,
    budget: 10000,
    interests: [],
  });

  const [itinerary, setItinerary] = useState(null);

  const interests = ['Adventure', 'Culture', 'Food', 'Shopping', 'Nature', 'Beach', 'History'];

  const generateItinerary = () => {
    const activities = {
      Adventure: ['Trekking', 'Rock Climbing', 'Paragliding', 'Zip-lining'],
      Culture: ['Museum', 'Heritage Site', 'Local Market', 'Temple Visit'],
      Food: ['Food Tour', 'Cooking Class', 'Street Food', 'Restaurant Visit'],
      Shopping: ['Local Bazaar', 'Mall', 'Boutique', 'Art Gallery'],
      Nature: ['Hiking', 'Bird Watching', 'Garden Visit', 'Wildlife Safari'],
      Beach: ['Swimming', 'Beach Walk', 'Surfing', 'Sunset View'],
      History: ['Historical Tour', 'Museum', 'Monument', 'Archive Visit'],
    };

    const dayPlan = [];
    for (let i = 1; i <= formData.days; i++) {
      const activities_list = [];
      formData.interests.forEach(interest => {
        if (activities[interest]) {
          activities_list.push(activities[interest][Math.floor(Math.random() * activities[interest].length)]);
        }
      });
      dayPlan.push({ day: i, activities: activities_list || ['Rest Day'] });
    }

    setItinerary({
      destination: formData.destination,
      days: formData.days,
      budget: formData.budget,
      dailyPlan: dayPlan,
      budgetBreakdown: {
        accommodation: (formData.budget * 0.4).toFixed(0),
        food: (formData.budget * 0.35).toFixed(0),
        activities: (formData.budget * 0.15).toFixed(0),
        miscellaneous: (formData.budget * 0.1).toFixed(0),
      },
    });
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="component-card">
      <h2>✈️ Smart Itinerary Generator</h2>
      
      <div className="form-group">
        <label>Destination</label>
        <input
          type="text"
          placeholder="Enter destination"
          value={formData.destination}
          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          className="input-field"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Days</label>
          <input
            type="number"
            min="1"
            max="30"
            value={formData.days}
            onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Budget (₹)</label>
          <input
            type="number"
            min="1000"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
            className="input-field"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Interests</label>
        <div className="interest-tags">
          {interests.map(interest => (
            <button
              key={interest}
              className={`tag ${formData.interests.includes(interest) ? 'active' : ''}`}
              onClick={() => handleInterestToggle(interest)}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      <button onClick={generateItinerary} className="btn btn-primary">
        Generate Itinerary
      </button>

      {itinerary && (
        <div className="itinerary-result">
          <h3>Your {itinerary.days}-Day Trip to {itinerary.destination}</h3>
          
          <div className="budget-breakdown">
            <h4>Budget Breakdown</h4>
            <div className="breakdown-grid">
              <div className="breakdown-item">
                <span>🏨 Accommodation</span>
                <strong>₹{itinerary.budgetBreakdown.accommodation}</strong>
              </div>
              <div className="breakdown-item">
                <span>🍽️ Food</span>
                <strong>₹{itinerary.budgetBreakdown.food}</strong>
              </div>
              <div className="breakdown-item">
                <span>🎯 Activities</span>
                <strong>₹{itinerary.budgetBreakdown.activities}</strong>
              </div>
              <div className="breakdown-item">
                <span>🛍️ Miscellaneous</span>
                <strong>₹{itinerary.budgetBreakdown.miscellaneous}</strong>
              </div>
            </div>
          </div>

          <div className="daily-plan">
            <h4>Daily Plan</h4>
            {itinerary.dailyPlan.map(day => (
              <div key={day.day} className="day-plan-card">
                <h5>Day {day.day}</h5>
                <ul>
                  {day.activities.map((activity, idx) => (
                    <li key={idx}>📍 {activity}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <button onClick={() => onSaveTrip(itinerary)} className="btn btn-secondary">
            💾 Save Trip
          </button>
        </div>
      )}
    </div>
  );
};

export default ItineraryGenerator;
