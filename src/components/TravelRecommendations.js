import React, { useState, useEffect } from 'react';

const TravelRecommendations = ({ language }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
    budget: 'all',
    season: 'all',
    activity: 'all',
  });

  const destinations = [
    { name: 'Goa', type: 'beach', budget: 'budget', season: 'winter', activity: 'adventure', rating: 4.5, description: 'Sun, sand, and sea' },
    { name: 'Kerala', type: 'nature', budget: 'moderate', season: 'year-round', activity: 'nature', rating: 4.7, description: 'Backwaters and beaches' },
    { name: 'Rajasthan', type: 'culture', budget: 'budget', season: 'winter', activity: 'culture', rating: 4.4, description: 'Palaces and forts' },
    { name: 'Himachal Pradesh', type: 'adventure', budget: 'moderate', season: 'summer', activity: 'adventure', rating: 4.6, description: 'Mountains and trekking' },
    { name: 'Varanasi', type: 'culture', budget: 'budget', season: 'winter', activity: 'culture', rating: 4.3, description: 'Spiritual and historic' },
    { name: 'Manali', type: 'adventure', budget: 'moderate', season: 'summer', activity: 'adventure', rating: 4.5, description: 'Hill station and adventure' },
  ];

  useEffect(() => {
    let filtered = destinations;
    if (filters.type !== 'all') filtered = filtered.filter(d => d.type === filters.type);
    if (filters.budget !== 'all') filtered = filtered.filter(d => d.budget === filters.budget);
    if (filters.season !== 'all') filtered = filtered.filter(d => d.season.includes(filters.season));
    if (filters.activity !== 'all') filtered = filtered.filter(d => d.activity === filters.activity);
    setRecommendations(filtered);
  }, [filters]);

  return (
    <div className="component-card">
      <h2>🗺️ Travel Recommendations</h2>

      <div className="filters-section">
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="filter-select"
        >
          <option value="all">All Types</option>
          <option value="beach">Beach</option>
          <option value="nature">Nature</option>
          <option value="culture">Culture</option>
          <option value="adventure">Adventure</option>
        </select>

        <select
          value={filters.budget}
          onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
          className="filter-select"
        >
          <option value="all">All Budgets</option>
          <option value="budget">Budget</option>
          <option value="moderate">Moderate</option>
          <option value="luxury">Luxury</option>
        </select>

        <select
          value={filters.season}
          onChange={(e) => setFilters({ ...filters, season: e.target.value })}
          className="filter-select"
        >
          <option value="all">All Seasons</option>
          <option value="summer">Summer</option>
          <option value="winter">Winter</option>
          <option value="monsoon">Monsoon</option>
        </select>

        <select
          value={filters.activity}
          onChange={(e) => setFilters({ ...filters, activity: e.target.value })}
          className="filter-select"
        >
          <option value="all">All Activities</option>
          <option value="adventure">Adventure</option>
          <option value="culture">Culture</option>
          <option value="nature">Nature</option>
        </select>
      </div>

      <div className="recommendations-grid">
        {recommendations.length > 0 ? (
          recommendations.map(dest => (
            <div key={dest.name} className="recommendation-card">
              <h3>{dest.name}</h3>
              <p>{dest.description}</p>
              <div className="dest-meta">
                <span>⭐ {dest.rating}</span>
                <span>💰 {dest.budget}</span>
                <span>🌍 {dest.type}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No destinations match your filters</p>
        )}
      </div>
    </div>
  );
};

export default TravelRecommendations;
