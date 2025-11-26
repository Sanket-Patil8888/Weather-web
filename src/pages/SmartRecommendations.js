import React, { useState } from 'react';
import '../styles/smart-recommendations.css';
import { ACTIVITY_DATABASE } from '../data/activityDatabase';

// Crop Database with detailed information
const CROP_DATABASE = {
  'Wheat': {
    icon: '🌾',
    idealTemp: '21–27°C',
    soil: 'Well-drained loamy or clay-loam soil',
    water: 'Moderate; irrigation every 12–15 days',
    duration: '100–120 days',
    fertilizers: ['NPK (Nitrogen, Phosphorus, Potassium) in 2 splits', 'Urea for nitrogen boost'],
    diseases: ['Rust', 'Smut', 'Leaf blight'],
    pesticides: ['Mancozeb', 'Carbendazim', 'Propiconazole (for rust)'],
    precautions: ['Avoid waterlogging', 'Maintain proper spacing', 'Use disease-resistant varieties']
  },
  'Rice': {
    icon: '🍚',
    idealTemp: '25–35°C',
    soil: 'Clayey, moisture-retaining soil',
    water: 'High; flooded conditions',
    duration: '120–150 days',
    fertilizers: ['Urea (N)', 'DAP (P)', 'Potash (K)'],
    diseases: ['Blast', 'Brown spot', 'Bacterial leaf blight'],
    pesticides: ['Tricyclazole (for blast)', 'Chlorantraniliprole', 'Hexaconazole'],
    precautions: ['Maintain 2–3 cm water depth', 'Ensure weed control', 'Maintain proper seed treatment']
  },
  'Corn': {
    icon: '🌽',
    idealTemp: '25–35°C',
    soil: 'Sandy-loam to clay soil',
    water: 'Moderate to high',
    duration: '90–110 days',
    fertilizers: ['NPK 120:60:40', 'Additional nitrogen during tasseling'],
    diseases: ['Downy mildew', 'Stem rot', 'Leaf blight'],
    pesticides: ['Metalaxyl (for mildew)', 'Mancozeb', 'Carbendazim'],
    precautions: ['Avoid sowing in very hot afternoons', 'Give irrigation at knee-high and tasseling stages', 'Use hybrid seeds']
  },
  'Maize': {
    icon: '🌽',
    idealTemp: '25–35°C',
    soil: 'Sandy-loam to clay soil',
    water: 'Moderate to high',
    duration: '90–110 days',
    fertilizers: ['NPK 120:60:40', 'Additional nitrogen during tasseling'],
    diseases: ['Downy mildew', 'Stem rot', 'Leaf blight'],
    pesticides: ['Metalaxyl (for mildew)', 'Mancozeb', 'Carbendazim'],
    precautions: ['Avoid sowing in very hot afternoons', 'Give irrigation at knee-high and tasseling stages', 'Use hybrid seeds']
  },
  'Potato': {
    icon: '🥔',
    idealTemp: '16–22°C',
    soil: 'Well-drained sandy-loam',
    water: 'Moderate',
    duration: '70–90 days',
    fertilizers: ['FYM (organic)', 'NPK 120:80:100', 'Potash for tuber formation'],
    diseases: ['Late blight', 'Early blight', 'Black scurf'],
    pesticides: ['Mancozeb', 'Copper oxychloride', 'Chlorothalonil'],
    precautions: ['Avoid waterlogging', 'Maintain cooler soil temperature', 'Harvest before temperatures rise']
  },
  'Cabbage': {
    icon: '🥬',
    idealTemp: '15–25°C',
    soil: 'Fertile loam soil',
    water: 'Moderate',
    duration: '60–90 days',
    fertilizers: ['Nitrogen-rich fertilizers', 'NPK 100:60:80'],
    diseases: ['Downy mildew', 'Leaf spot', 'Black rot'],
    pesticides: ['Copper fungicides', 'Mancozeb', 'Carbendazim'],
    precautions: ['Provide light irrigation', 'Ensure good drainage', 'Use disease-resistant varieties']
  },
  'Lettuce': {
    icon: '🥬',
    idealTemp: '7–20°C',
    soil: 'Fertile loam soil',
    water: 'Low to moderate',
    duration: '40–50 days',
    fertilizers: ['Nitrogen-rich fertilizers (urea)'],
    diseases: ['Downy mildew', 'Leaf spot', 'Tip burn'],
    pesticides: ['Copper fungicides', 'Mancozeb'],
    precautions: ['Provide light irrigation', 'Avoid heavy sunlight', 'Ensure good drainage']
  },
  'Broccoli': {
    icon: '🥦',
    idealTemp: '15–25°C',
    soil: 'Fertile loam soil',
    water: 'Moderate to high',
    duration: '60–90 days',
    fertilizers: ['NPK 100:60:80', 'Boron supplementation'],
    diseases: ['Downy mildew', 'Bacterial spot'],
    pesticides: ['Copper fungicides', 'Mancozeb'],
    precautions: ['Maintain consistent moisture', 'Avoid extreme temperatures', 'Harvest before flowering']
  },
  'Spinach': {
    icon: '🥬',
    idealTemp: '7–20°C',
    soil: 'Fertile loam soil',
    water: 'Low to moderate',
    duration: '40–50 days',
    fertilizers: ['Nitrogen-rich fertilizers (urea)'],
    diseases: ['Downy mildew', 'Leaf spot'],
    pesticides: ['Copper fungicides', 'Mancozeb'],
    precautions: ['Provide light irrigation', 'Avoid heavy sunlight', 'Ensure good drainage']
  },
  'Sunflower': {
    icon: '🌻',
    idealTemp: '20–35°C',
    soil: 'Well-drained loamy soil',
    water: 'Low to moderate',
    duration: '80–100 days',
    fertilizers: ['NPK 60:80:80', 'Additional nitrogen at flowering'],
    diseases: ['Rust', 'Downy mildew'],
    pesticides: ['Metalaxyl', 'Mancozeb'],
    precautions: ['Avoid heavy irrigation', 'Keep spacing wide', 'Protect from birds during seed formation']
  },
  'Peanuts': {
    icon: '🫘',
    idealTemp: '25–35°C',
    soil: 'Well-drained sandy loam',
    water: 'Moderate',
    duration: '120–150 days',
    fertilizers: ['NPK 40:80:80', 'Calcium supplementation'],
    diseases: ['Leaf spot', 'Rust'],
    pesticides: ['Mancozeb', 'Carbendazim'],
    precautions: ['Avoid waterlogging', 'Maintain proper spacing', 'Ensure good drainage']
  },
  'Chili': {
    icon: '🌶️',
    idealTemp: '25–35°C',
    soil: 'Well-drained loamy soil',
    water: 'Moderate',
    duration: '150–180 days',
    fertilizers: ['NPK 80:80:80', 'Calcium for fruit development'],
    diseases: ['Leaf spot', 'Anthracnose', 'Bacterial wilt'],
    pesticides: ['Carbendazim', 'Mancozeb', 'Copper oxychloride'],
    precautions: ['Avoid waterlogging', 'Provide support structures', 'Regular pruning']
  },
  'Cucumber': {
    icon: '🥒',
    idealTemp: '25–35°C',
    soil: 'Well-drained sandy loam',
    water: 'High',
    duration: '50–70 days',
    fertilizers: ['NPK 60:60:60', 'Potash at flowering'],
    diseases: ['Powdery mildew', 'Downy mildew'],
    pesticides: ['Sulfur', 'Mancozeb', 'Hexaconazole'],
    precautions: ['Provide support/trellis', 'Maintain high moisture', 'Ensure good air circulation']
  },
  'Carrot': {
    icon: '🥕',
    idealTemp: '10–20°C',
    soil: 'Well-drained sandy loam',
    water: 'Moderate',
    duration: '70–90 days',
    fertilizers: ['NPK 100:60:80', 'Avoid excess nitrogen'],
    diseases: ['Leaf blight', 'Powdery mildew'],
    pesticides: ['Mancozeb', 'Copper oxychloride'],
    precautions: ['Avoid waterlogging', 'Maintain proper spacing', 'Keep weed-free']
  },
  'Onion': {
    icon: '🧅',
    idealTemp: '10–25°C',
    soil: 'Well-drained loamy soil',
    water: 'Moderate',
    duration: '120–150 days',
    fertilizers: ['NPK 100:80:80', 'Additional nitrogen'],
    diseases: ['Purple blotch', 'Fusarium basal rot'],
    pesticides: ['Mancozeb', 'Copper oxychloride'],
    precautions: ['Avoid waterlogging', 'Ensure proper curing', 'Use disease-resistant varieties']
  },
  'Barley': {
    icon: '🌾',
    idealTemp: '15–25°C',
    soil: 'Well-drained loam',
    water: 'Low to moderate',
    duration: '100–120 days',
    fertilizers: ['NPK 80:60:40', 'Urea for nitrogen boost'],
    diseases: ['Net blotch', 'Scald'],
    pesticides: ['Mancozeb', 'Carbendazim'],
    precautions: ['Avoid waterlogging', 'Maintain proper spacing', 'Harvest at right maturity']
  },
  'Beans': {
    icon: '🫘',
    idealTemp: '15–25°C',
    soil: 'Well-drained loamy soil',
    water: 'Moderate',
    duration: '60–90 days',
    fertilizers: ['NPK 60:80:80', 'Minimal nitrogen (legume)'],
    diseases: ['Leaf spot', 'Bean rust'],
    pesticides: ['Copper fungicides', 'Mancozeb'],
    precautions: ['Avoid waterlogging', 'Provide support', 'Harvest regularly']
  }
};

const SmartRecommendations = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [selectedCrop, setSelectedCrop] = useState(null);
    const [selectedActivity, setSelectedActivity] = useState(null);

  // Using free Open-Meteo API (no API key required) with geocoding
  // Fetch weather data
  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      console.log('Fetching weather for:', cityName);
      
      // First, get coordinates from city name using geocoding API
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
      console.log('Geocoding URL:', geoUrl);
      
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();
      
      console.log('Geocoding data:', geoData);
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`City "${cityName}" not found. Please try another city.`);
      }
      
      const location = geoData.results[0];
      const { latitude, longitude, name, country } = location;
      
      // Now fetch weather data using coordinates
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature&temperature_unit=celsius&timezone=auto`;
      console.log('Weather URL:', weatherUrl);
      
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();
      
      console.log('Weather data received:', weatherData);
      
      // Transform data to match our existing format
      const current = weatherData.current;
      const transformedData = {
        name: name,
        sys: { country: country },
        main: {
          temp: current.temperature_2m,
          humidity: current.relative_humidity_2m,
          feels_like: current.apparent_temperature
        },
        wind: {
          speed: current.wind_speed_10m
        },
        weather: [{
          main: getWeatherDescription(current.weather_code)
        }]
      };
      
      setWeather(transformedData);
      setCity(`${name}, ${country}`);
      setSearchInput('');
      setError('');
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Failed to fetch weather data. Please try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Helper: find a matching key in a database case-insensitively
  const findKeyInDatabase = (db, name) => {
    if (!db || !name) return null;
    const norm = name.toString().trim().toLowerCase();
    // Exact match
    const exact = Object.keys(db).find((k) => k.toLowerCase() === norm);
    if (exact) return exact;
    // Try includes both ways
    const includes = Object.keys(db).find((k) => k.toLowerCase().includes(norm) || norm.includes(k.toLowerCase()));
    return includes || null;
  };

  // Synonyms for common variations (lowercase keys)
  const ACTIVITY_SYNONYMS = {
    'running': 'Running',
    'run': 'Running',
    'jog': 'Running',
    'jogging': 'Running',
    'hiking': 'Short Hiking',
    'trek': 'Trekking',
    'trekking': 'Trekking',
    'sports': 'Outdoor Sports',
    'outdoorsports': 'Outdoor Sports',
    'videogames': 'Play Video Games',
    'video games': 'Play Video Games',
    'games': 'Indoor Games',
    'swim': 'Swimming',
    'swimming': 'Swimming',
    'longwalk': 'Long Walks',
    'long walk': 'Long Walks'
  };

  // Enhanced lookup that also checks synonyms
  const findKeyWithSynonyms = (db, name) => {
    const key = findKeyInDatabase(db, name);
    if (key) return key;
    const norm = name.toString().trim().toLowerCase();
    if (ACTIVITY_SYNONYMS[norm] && db[ACTIVITY_SYNONYMS[norm]]) {
      return ACTIVITY_SYNONYMS[norm];
    }
    // fallback: try removing spaces
    const nospace = norm.replace(/\s+/g, '');
    if (ACTIVITY_SYNONYMS[nospace] && db[ACTIVITY_SYNONYMS[nospace]]) {
      return ACTIVITY_SYNONYMS[nospace];
    }
    return null;
  };

  // Convert WMO weather codes to descriptions
  const getWeatherDescription = (code) => {
    const weatherCodes = {
      0: 'Clear',
      1: 'Mainly Clear',
      2: 'Partly Cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Foggy',
      51: 'Light Drizzle',
      53: 'Moderate Drizzle',
      55: 'Dense Drizzle',
      61: 'Slight Rain',
      63: 'Moderate Rain',
      65: 'Heavy Rain',
      71: 'Slight Snow',
      73: 'Moderate Snow',
      75: 'Heavy Snow',
      77: 'Snow Grains',
      80: 'Slight Rain Showers',
      81: 'Moderate Rain Showers',
      82: 'Violent Rain Showers',
      85: 'Slight Snow Showers',
      86: 'Heavy Snow Showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with Slight Hail',
      99: 'Thunderstorm with Heavy Hail'
    };
    return weatherCodes[code] || 'Unknown';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchWeather(searchInput);
    } else {
      setError('Please enter a city name');
    }
  };

  // Get recommendations based on temperature and weather
  const getRecommendations = () => {
    if (!weather) return null;

    const temp = Math.round(weather.main?.temp || 0);
    const weatherType = weather.weather?.[0]?.main?.toLowerCase() || '';
    // eslint-disable-next-line no-unused-vars
    const humidity = weather.main?.humidity || 0;

    // Crop recommendations
    let crops = [];
    if (temp >= 25 && temp < 35) {
      crops = ['🌾 Rice', '🌽 Corn', '🥔 Potato', '🥬 Cabbage'];
    } else if (temp >= 15 && temp < 25) {
      crops = ['🌾 Wheat', '🥬 Lettuce', '🥦 Broccoli', '🌽 Barley'];
    } else if (temp >= 35) {
      crops = ['🫘 Peanuts', '🌻 Sunflower', '🌶️ Chili', '🥒 Cucumber'];
    } else {
      crops = ['🥕 Carrot', '🧅 Onion', '🥬 Spinach', '🫘 Beans'];
    }

    // Cloth recommendations
    let clothes = [];
    if (temp >= 30) {
      clothes = ['👕 Light T-shirt', '🩳 Shorts', '👒 Hat', '😎 Sunglasses'];
    } else if (temp >= 20 && temp < 30) {
      clothes = ['👔 Casual Shirt', '👖 Jeans', '👟 Sneakers', '🧢 Cap'];
    } else if (temp >= 10 && temp < 20) {
      clothes = ['🧥 Light Jacket', '👖 Pants', '👞 Shoes', '🧣 Scarf'];
    } else {
      clothes = ['🧥 Heavy Coat', '🧤 Gloves', '🧣 Scarf', '🎩 Hat'];
    }

    // Food recommendations
    let foods = [];
    if (weatherType.includes('rain')) {
      foods = ['🍲 Warm Soup', '☕ Hot Tea', '🥘 Stew', '🍛 Curry'];
    } else if (temp >= 30) {
      foods = ['🍉 Watermelon', '🧊 Ice Cream', '🍓 Berries', '🥤 Cold Juice'];
    } else if (temp >= 20 && temp < 30) {
      foods = ['🥗 Fresh Salad', '🍗 Grilled Chicken', '🍝 Pasta', '🥙 Sandwich'];
    } else {
      foods = ['🍖 Roasted Meat', '🥘 Hot Stew', '🍜 Noodles', '🍲 Soup'];
    }

    // Activity recommendations
    let activities = [];
    if (weatherType.includes('rain')) {
      activities = ['📚 Read a Book', '🎮 Play Video Games', '🎬 Watch Movie', '🧩 Puzzle Time'];
    } else if (temp >= 30) {
      activities = ['🏊 Swimming', '🌴 Beach Time', '🧊 Indoor Games', '🎭 Cinema'];
    } else if (temp >= 15 && temp < 30) {
      activities = ['🚴 Cycling', '⛰️ Hiking', '🏃 Running', '⚽ Sports'];
    } else {
      activities = ['☃️ Winter Sports', '🎿 Skiing', '❄️ Ice Skating', '🏔️ Trekking'];
    }

    return { crops, clothes, foods, activities, temp, weatherType };
  };

  const recommendations = getRecommendations();

  return (
    <div className={`smart-rec-wrapper ${darkMode ? 'dark' : 'light'}`}>
      {/* Header */}
      <header className="sr-header">
        <div className="sr-header-content">
          <h1>🌍 Smart Weather Advisor</h1>
          <p>Get personalized recommendations based on local weather</p>
        </div>
        <button 
          className="sr-theme-toggle" 
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? 'Light Mode' : 'Dark Mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      {/* Search Section */}
      <div className="sr-search-section">
        <form onSubmit={handleSearch} className="sr-search-form">
          <div className="sr-input-group">
            <input
              type="text"
              placeholder="Enter city name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="sr-input"
              disabled={loading}
            />
            <button 
              type="submit" 
              className="sr-btn sr-btn-primary"
              disabled={loading}
            >
              {loading ? '⏳ Searching...' : '🔍 Search'}
            </button>
          </div>
        </form>
        {error && <div className="sr-error">{error}</div>}
      </div>

      {/* Weather Display & Recommendations */}
      {weather && recommendations && (
        <div className="sr-container">
          {/* Weather Card */}
          <div className="sr-weather-card">
            <div className="weather-header">
              <h2>{city}</h2>
              <p className="weather-condition">{weather.weather?.[0]?.main}</p>
            </div>
            
            <div className="weather-main">
              <div className="temp-display">
                <span className="temp-value">{recommendations.temp}°C</span>
                <span className="weather-emoji">
                  {recommendations.temp >= 30 ? '🔥' : 
                   recommendations.temp >= 20 ? '☀️' : 
                   recommendations.temp >= 10 ? '🌤️' : '❄️'}
                </span>
              </div>

              <div className="weather-details">
                <div className="detail-item">
                  <span className="detail-icon">💧</span>
                  <span className="detail-text">Humidity: {weather.main?.humidity}%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">💨</span>
                  <span className="detail-text">Wind: {weather.wind?.speed} m/s</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">🌡️</span>
                  <span className="detail-text">Feels Like: {Math.round(weather.main?.feels_like || 0)}°C</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations Grid */}
          <div className="sr-recommendations-grid">
            {/* Crop Recommendations */}
            <div className="sr-recommendation-card crop-card">
              <div className="card-header">
                <h3>🌾 Recommended Crops</h3>
              </div>
              <div className="card-content">
                {recommendations.crops.map((crop, idx) => {
                  const cropName = crop.replace(/[^a-zA-Z\s]/g, '').trim();
                  return (
                    <div 
                      key={idx} 
                      className="rec-item rec-item-clickable"
                      onClick={() => {
                        const key = findKeyInDatabase(CROP_DATABASE, cropName);
                        console.log('Clicked crop:', cropName, '-> matched key:', key);
                        if (key) {
                          setSelectedCrop(key);
                          setError('');
                        } else {
                          setError(`No detailed info available for "${cropName}"`);
                          setSelectedCrop(null);
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <span>{crop}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cloth Recommendations */}
            <div className="sr-recommendation-card cloth-card">
              <div className="card-header">
                <h3>👕 Recommended Clothes</h3>
              </div>
              <div className="card-content">
                {recommendations.clothes.map((cloth, idx) => (
                  <div key={idx} className="rec-item">
                    <span>{cloth}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Food Recommendations */}
            <div className="sr-recommendation-card food-card">
              <div className="card-header">
                <h3>🍽️ Recommended Food</h3>
              </div>
              <div className="card-content">
                {recommendations.foods.map((food, idx) => (
                  <div key={idx} className="rec-item">
                    <span>{food}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Recommendations */}
            <div className="sr-recommendation-card activity-card">
              <div className="card-header">
                <h3>🎯 Recommended Activities</h3>
              </div>
              <div className="card-content">
                {recommendations.activities.map((activity, idx) => {
                  const activityName = activity.replace(/[^a-zA-Z\s]/g, '').trim();
                  return (
                    <div
                      key={idx}
                      className="rec-item rec-item-clickable"
                      onClick={() => {
                        const key = findKeyWithSynonyms(ACTIVITY_DATABASE, activityName);
                        console.log('Clicked activity:', activityName, '-> matched key:', key);
                        if (key) {
                          setSelectedActivity(key);
                          setError('');
                        } else {
                          setError(`No detailed info available for "${activityName}"`);
                          setSelectedActivity(null);
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <span>{activity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!weather && !loading && (
        <div className="sr-empty-state">
          <div className="empty-icon">🌏</div>
          <h2>Enter a city name to get started</h2>
          <p>Discover personalized recommendations based on local weather conditions</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="sr-loading">
          <div className="spinner"></div>
          <p>Fetching weather data...</p>
        </div>
      )}

      {/* Crop Detail Modal */}
      {selectedCrop && CROP_DATABASE[selectedCrop] && (
        <div className="sr-modal-overlay" onClick={() => setSelectedCrop(null)}>
          <div className="sr-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="sr-modal-close" 
              onClick={() => setSelectedCrop(null)}
            >
              ✕
            </button>
            
            <div className="sr-modal-header">
              <h2>{CROP_DATABASE[selectedCrop].icon} {selectedCrop}</h2>
            </div>

            <div className="sr-modal-body">
              {/* Temperature */}
              <div className="sr-modal-section">
                <h4>🌡️ Ideal Temperature</h4>
                <p>{CROP_DATABASE[selectedCrop].idealTemp}</p>
              </div>

              {/* Soil */}
              <div className="sr-modal-section">
                <h4>🌱 Soil Required</h4>
                <p>{CROP_DATABASE[selectedCrop].soil}</p>
              </div>

              {/* Water */}
              <div className="sr-modal-section">
                <h4>💧 Water Requirement</h4>
                <p>{CROP_DATABASE[selectedCrop].water}</p>
              </div>

              {/* Duration */}
              <div className="sr-modal-section">
                <h4>⏱️ Growing Duration</h4>
                <p>{CROP_DATABASE[selectedCrop].duration}</p>
              </div>

              {/* Fertilizers */}
              <div className="sr-modal-section">
                <h4>🌿 Fertilizers</h4>
                <ul className="sr-list">
                  {CROP_DATABASE[selectedCrop].fertilizers.map((fert, idx) => (
                    <li key={idx}>{fert}</li>
                  ))}
                </ul>
              </div>

              {/* Diseases */}
              <div className="sr-modal-section">
                <h4>🦠 Common Diseases</h4>
                <ul className="sr-list">
                  {CROP_DATABASE[selectedCrop].diseases.map((disease, idx) => (
                    <li key={idx}>{disease}</li>
                  ))}
                </ul>
              </div>

              {/* Pesticides */}
              <div className="sr-modal-section">
                <h4>🧪 Pesticides</h4>
                <ul className="sr-list">
                  {CROP_DATABASE[selectedCrop].pesticides.map((pesticide, idx) => (
                    <li key={idx}>{pesticide}</li>
                  ))}
                </ul>
              </div>

              {/* Precautions */}
              <div className="sr-modal-section">
                <h4>⚠️ Precautions</h4>
                <ul className="sr-list">
                  {CROP_DATABASE[selectedCrop].precautions.map((precaution, idx) => (
                    <li key={idx}>{precaution}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

        {/* Activity Detail Modal */}
        {selectedActivity && ACTIVITY_DATABASE[selectedActivity] && (
          <div className="sr-modal-overlay" onClick={() => setSelectedActivity(null)}>
            <div className="sr-modal-content" onClick={(e) => e.stopPropagation()}>
              <button 
                className="sr-modal-close" 
                onClick={() => setSelectedActivity(null)}
              >
                ✕
              </button>
            
              <div className="sr-modal-header">
                <h2>{ACTIVITY_DATABASE[selectedActivity].icon} {selectedActivity}</h2>
              </div>

              <div className="sr-modal-body">
                {/* Temperature Range */}
                <div className="sr-modal-section">
                  <h4>🌡️ Weather Condition</h4>
                  <p>{ACTIVITY_DATABASE[selectedActivity].tempRange}</p>
                </div>

                {/* Calories Burned */}
                <div className="sr-modal-section">
                  <h4>🔥 Calories Burned</h4>
                  <p>{ACTIVITY_DATABASE[selectedActivity].caloriesBurned}</p>
                </div>

                {/* Body Effects */}
                <div className="sr-modal-section">
                  <h4>💪 Body Effects</h4>
                  <ul className="sr-list">
                    {ACTIVITY_DATABASE[selectedActivity].bodyEffects.map((effect, idx) => (
                      <li key={idx}>{effect}</li>
                    ))}
                  </ul>
                </div>

                {/* Best Time */}
                <div className="sr-modal-section">
                  <h4>⏰ Best Time</h4>
                  <p>{ACTIVITY_DATABASE[selectedActivity].bestTime}</p>
                </div>

                {/* Duration */}
                <div className="sr-modal-section">
                  <h4>⏱️ Duration</h4>
                  <p>{ACTIVITY_DATABASE[selectedActivity].duration}</p>
                </div>

                {/* Difficulty */}
                <div className="sr-modal-section">
                  <h4>📊 Difficulty Level</h4>
                  <p>{ACTIVITY_DATABASE[selectedActivity].difficulty}</p>
                </div>

                {/* Health Benefits */}
                <div className="sr-modal-section">
                  <h4>❤️ Health Benefits</h4>
                  <div className="sr-benefits-tags">
                    {ACTIVITY_DATABASE[selectedActivity].benefits.map((benefit, idx) => (
                      <span key={idx} className="sr-benefit-tag">{benefit}</span>
                    ))}
                  </div>
                </div>

                {/* Precautions */}
                <div className="sr-modal-section">
                  <h4>⚠️ Precautions</h4>
                  <ul className="sr-list">
                    {ACTIVITY_DATABASE[selectedActivity].precautions.map((precaution, idx) => (
                      <li key={idx}>{precaution}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default SmartRecommendations;
