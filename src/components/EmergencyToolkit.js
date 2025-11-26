import React, { useState } from 'react';

const EmergencyToolkit = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState('hospitals');

  const emergencyData = {
    hospitals: [
      { name: 'City General Hospital', phone: '100', address: 'Downtown', distance: '2 km' },
      { name: 'Medical Center', phone: '101', address: 'Suburbs', distance: '5 km' },
    ],
    police: [
      { name: 'Police Station', phone: '100', address: 'Main City', distance: '1.5 km' },
      { name: 'Emergency Response', phone: '112', address: '24/7', distance: 'On call' },
    ],
    currency: {
      USD: 83.5,
      EUR: 91.2,
      GBP: 105.8,
      JPY: 0.56,
    },
    checklist: [
      { item: 'Passport & Visa', checked: false },
      { item: 'Travel Insurance', checked: false },
      { item: 'Emergency Contacts', checked: false },
      { item: 'Vaccination Certificates', checked: false },
      { item: 'Hotel Reservations', checked: false },
      { item: 'Flight Tickets', checked: false },
    ],
  };

  const [checklist, setChecklist] = useState(emergencyData.checklist);
  const [amount, setAmount] = useState(1000);

  const toggleChecklist = (idx) => {
    const updated = [...checklist];
    updated[idx].checked = !updated[idx].checked;
    setChecklist(updated);
  };

  return (
    <div className="component-card">
      <h2>🆘 Emergency Travel Toolkit</h2>

      <div className="emergency-tabs">
        {[
          { id: 'hospitals', label: '🏥 Hospitals', icon: '🏥' },
          { id: 'police', label: '🚔 Police', icon: '🚔' },
          { id: 'currency', label: '💱 Currency Converter', icon: '💱' },
          { id: 'checklist', label: '✅ Travel Checklist', icon: '✅' },
        ].map(tab => (
          <button
            key={tab.id}
            className={`emergency-tab ${selectedCategory === tab.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="emergency-content">
        {selectedCategory === 'hospitals' && (
          <div className="emergency-list">
            {emergencyData.hospitals.map((h, i) => (
              <div key={i} className="emergency-item">
                <h4>{h.name}</h4>
                <p>📞 {h.phone}</p>
                <p>📍 {h.address} ({h.distance})</p>
                <button className="btn btn-primary">Call Now</button>
              </div>
            ))}
          </div>
        )}

        {selectedCategory === 'police' && (
          <div className="emergency-list">
            {emergencyData.police.map((p, i) => (
              <div key={i} className="emergency-item">
                <h4>{p.name}</h4>
                <p>📞 {p.phone}</p>
                <p>📍 {p.address}</p>
                <button className="btn btn-danger">Emergency Call</button>
              </div>
            ))}
          </div>
        )}

        {selectedCategory === 'currency' && (
          <div className="currency-converter">
            <h3>Currency Converter</h3>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount in INR"
              className="input-field"
            />
            <div className="currency-rates">
              {Object.entries(emergencyData.currency).map(([curr, rate]) => (
                <div key={curr} className="rate-item">
                  <span>{curr}</span>
                  <strong>₹{amount} = {(amount * rate).toFixed(2)} {curr}</strong>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedCategory === 'checklist' && (
          <div className="checklist">
            <h3>Travel Checklist</h3>
            {checklist.map((item, idx) => (
              <div key={idx} className="checklist-item">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleChecklist(idx)}
                  className="checkbox"
                />
                <label>{item.item}</label>
              </div>
            ))}
            <p className="progress">Progress: {checklist.filter(c => c.checked).length} / {checklist.length}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyToolkit;
