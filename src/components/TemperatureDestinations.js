import React, { useState, useEffect } from 'react';

const TemperatureDestinations = ({ temperature, condition }) => {
  const [recommendations, setRecommendations] = useState([]);

  // Temperature-based destination recommendations
  const destinationDatabase = {
    hot: [
      { name: 'Maldives', temp: '28-32°C', description: 'Paradise beaches with crystal clear water', activities: ['Diving', 'Snorkeling', 'Beach resort'], image: '🏝️' },
      { name: 'Dubai', temp: '35-45°C', description: 'Luxury shopping and desert adventures', activities: ['Desert safari', 'Shopping', 'Water sports'], image: '🏜️' },
      { name: 'Goa, India', temp: '30-35°C', description: 'Tropical beaches with Portuguese architecture', activities: ['Beach relaxation', 'Water sports', 'Night life'], image: '🌴' },
      { name: 'Bali, Indonesia', temp: '27-32°C', description: 'Tropical paradise with culture and beaches', activities: ['Surfing', 'Temple tours', 'Rice paddies'], image: '🏖️' },
      { name: 'Thailand', temp: '30-35°C', description: 'Exotic beaches and Buddhist temples', activities: ['Island hopping', 'Muay Thai', 'Food tours'], image: '🌺' },
      { name: 'Caribbean Islands', temp: '26-30°C', description: 'Tropical islands with vibrant culture', activities: ['Water sports', 'Music festivals', 'Beach parties'], image: '🌊' },
    ],
    warm: [
      { name: 'Spain', temp: '20-28°C', description: 'Mediterranean charm with historic cities', activities: ['City tours', 'Beach visits', 'Wine tasting'], image: '🇪🇸' },
      { name: 'Greece', temp: '22-28°C', description: 'Ancient ruins and white-washed islands', activities: ['Island hopping', 'Mythology tours', 'Sunset views'], image: '🏛️' },
      { name: 'Portugal', temp: '18-25°C', description: 'Coastal beauty and vintage culture', activities: ['Beach walks', 'Wine tours', 'City exploration'], image: '🌅' },
      { name: 'India - Kerala', temp: '25-32°C', description: 'Backwaters and tropical plantations', activities: ['Houseboat tours', 'Spice gardens', 'Yoga retreats'], image: '🛥️' },
      { name: 'Italy', temp: '20-28°C', description: 'Renaissance art and Mediterranean coast', activities: ['Museum tours', 'Food tours', 'Beach relaxation'], image: '🍝' },
      { name: 'Morocco', temp: '25-35°C', description: 'Desert oases and coastal charm', activities: ['Desert trekking', 'Medina exploration', 'Camel rides'], image: '🐪' },
    ],
    cool: [
      { name: 'Japan - Tokyo/Kyoto', temp: '10-20°C', description: 'Cherry blossoms and traditional temples', activities: ['Temple visits', 'Gardens', 'Street food'], image: '🗾' },
      { name: 'Switzerland', temp: '8-18°C', description: 'Alpine mountains and pristine lakes', activities: ['Hiking', 'Mountain biking', 'Lake cruises'], image: '⛰️' },
      { name: 'Germany', temp: '10-20°C', description: 'Historic castles and Christmas markets', activities: ['Castle tours', 'Beer festivals', 'Forest walks'], image: '🏰' },
      { name: 'UK - Scotland', temp: '8-15°C', description: 'Dramatic landscapes and historic cities', activities: ['Hiking', 'Whisky tours', 'Castle exploration'], image: '🥃' },
      { name: 'New Zealand', temp: '10-20°C', description: 'Adventure capital with stunning nature', activities: ['Hiking', 'Bungee jumping', 'Wine tours'], image: '🏔️' },
      { name: 'Canada - Mountains', temp: '5-15°C', description: 'Rocky mountains and national parks', activities: ['Hiking', 'Wildlife watching', 'Lake activities'], image: '🍁' },
    ],
    cold: [
      { name: 'Norway - Northern Lights', temp: '-5-5°C', description: 'Aurora borealis and snowy landscapes', activities: ['Northern lights hunting', 'Dog sledding', 'Ice fishing'], image: '❄️' },
      { name: 'Iceland', temp: '-2-5°C', description: 'Geysers, waterfalls and glaciers', activities: ['Glacier hiking', 'Blue lagoon', 'Waterfall tours'], image: '🧊' },
      { name: 'Switzerland - Winter', temp: '-5-5°C', description: 'Ski resorts and snowy peaks', activities: ['Skiing', 'Ice skating', 'Alpine hiking'], image: '⛷️' },
      { name: 'Finland', temp: '-10-0°C', description: 'Snow activities and sauna culture', activities: ['Snowmobiling', 'Sauna', 'Ice hotel'], image: '🏂' },
      { name: 'Canada - Winter', temp: '-10-5°C', description: 'Snowy landscapes and winter sports', activities: ['Skiing', 'Snowshoeing', 'Ice skating'], image: '⛄' },
      { name: 'Russia - Winter', temp: '-15-5°C', description: 'Historic cities and winter wonderland', activities: ['Ice sculpting', 'Winter festivals', 'Trans-Siberian journey'], image: '❄️' },
    ],
    rainy: [
      { name: 'India - Monsoon', temp: '25-30°C', description: 'Lush green landscapes after rains', activities: ['Waterfall tours', 'Trekking', 'Tea gardens'], image: '🌧️' },
      { name: 'Thailand - Jungle', temp: '26-32°C', description: 'Green jungle adventures', activities: ['Jungle trekking', 'Waterfall hunting', 'Elephant sanctuaries'], image: '🐘' },
      { name: 'Costa Rica', temp: '20-28°C', description: 'Rainforests and biodiversity', activities: ['Zip-lining', 'Wildlife tours', 'Waterfall hikes'], image: '🌴' },
      { name: 'Philippines - Rainy Season', temp: '24-30°C', description: 'Lush landscapes and fewer tourists', activities: ['Waterfall trekking', 'Island tours', 'Diving'], image: '🌊' },
      { name: 'Ireland', temp: '10-15°C', description: 'Green countryside and cozy towns', activities: ['Countryside walks', 'Pub culture', 'Cliff tours'], image: '🍀' },
      { name: 'Scotland - Highlands', temp: '8-15°C', description: 'Misty mountains and lochs', activities: ['Highland hiking', 'Loch cruises', 'Village exploration'], image: '⛰️' },
    ],
  };

  useEffect(() => {
    let category = 'warm';
    
    // Categorize based on temperature
    if (temperature >= 35) {
      category = 'hot';
    } else if (temperature >= 25 && temperature < 35) {
      category = 'warm';
    } else if (temperature >= 15 && temperature < 25) {
      category = 'cool';
    } else if (temperature < 15) {
      category = 'cold';
    }

    // Add rainy destinations if it's raining
    if (condition && (condition.includes('Rain') || condition.includes('rain'))) {
      category = 'rainy';
    }

    setRecommendations(destinationDatabase[category] || destinationDatabase.warm);
  }, [temperature, condition]);

  return (
    <div className="temp-dest-container">
      <div className="temp-dest-header">
        <h3>🌍 Perfect Destinations for Current Weather</h3>
        <p className="temp-dest-subtitle">
          Based on {temperature}°C and {condition || 'current conditions'}
        </p>
      </div>

      <div className="temp-dest-grid">
        {recommendations.map((dest, index) => (
          <div key={index} className="temp-dest-card">
            <div className="dest-image">{dest.image}</div>
            <div className="dest-content">
              <h4>{dest.name}</h4>
              <p className="dest-temp">🌡️ {dest.temp}</p>
              <p className="dest-description">{dest.description}</p>
              <div className="dest-activities">
                {dest.activities.map((activity, idx) => (
                  <span key={idx} className="activity-tag">{activity}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemperatureDestinations;
