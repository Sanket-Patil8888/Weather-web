import React, { useState, useEffect } from 'react';
import useWeatherData from '../hooks/useWeatherData';
import '../styles/temp-travel-hub.css';
import '../styles/travel-premium.css';
import ItineraryGenerator from '../components/ItineraryGenerator';
import ExpenseCalculator from '../components/ExpenseCalculator';
import TravelRecommendations from '../components/TravelRecommendations';
import ReviewSystem from '../components/ReviewSystem';
import EmergencyToolkit from '../components/EmergencyToolkit';
import TravelQuiz from '../components/TravelQuiz';
import EventsCalendar from '../components/EventsCalendar';

const TemperatureTravelHub = ({ darkMode, toggleDarkMode, language, setLanguage }) => {
  const { weather, isLoading } = useWeatherData();
  const [activeTab, setActiveTab] = useState('recommendations');
  const [savedTrips, setSavedTrips] = useState([]);
  const [temperature, setTemperature] = useState(0);
  const [weatherCondition, setWeatherCondition] = useState('Clear');

  useEffect(() => {
    if (weather) {
      setTemperature(Math.round(weather.main?.temp || 0));
      setWeatherCondition(weather.weather?.[0]?.main || 'Clear');
    }
  }, [weather]);

  useEffect(() => {
    const saved = localStorage.getItem('travelTrips');
    if (saved) setSavedTrips(JSON.parse(saved));
  }, []);

  const saveTrip = (trip) => {
    const updated = [...savedTrips, { ...trip, id: Date.now() }];
    setSavedTrips(updated);
    localStorage.setItem('travelTrips', JSON.stringify(updated));
  };

  // Determine travel category based on temperature
  const getTempCategory = () => {
    if (temperature >= 35) return { category: 'hot', icon: '🔥', title: 'Hot Weather Travel' };
    if (temperature >= 25 && temperature < 35) return { category: 'warm', icon: '☀️', title: 'Warm Weather Travel' };
    if (temperature >= 15 && temperature < 25) return { category: 'cool', icon: '🌤️', title: 'Cool Weather Travel' };
    if (temperature < 15) return { category: 'cold', icon: '❄️', title: 'Cold Weather Travel' };
    return { category: 'warm', icon: '☀️', title: 'Travel Guide' };
  };

  const tempInfo = getTempCategory();

  const translations = {
    en: {
      title: 'Smart Travel Hub',
      subtitle: 'Personalized travel recommendations based on your weather',
      currentTemp: 'Current Temperature',
      itinerary: 'Plan Itinerary',
      expense: 'Track Expenses',
      recommendations: 'Find Destinations',
      reviews: 'Read Reviews',
      emergency: 'Emergency Kit',
      quiz: 'Take Quiz',
      events: 'Events & Blog',
      savedTrips: 'My Trips',
      selectDestination: 'Select a destination to start planning',
      weatherBased: 'Weather-based recommendations'
    },
    hi: {
      title: 'स्मार्ट यात्रा केंद्र',
      subtitle: 'आपके मौसम के आधार पर व्यक्तिगत यात्रा सुझाव',
      currentTemp: 'वर्तमान तापमान',
      itinerary: 'यात्रा योजना',
      expense: 'खर्च ट्रैक',
      recommendations: 'गंतव्य खोजें',
      reviews: 'समीक्षा पढ़ें',
      emergency: 'आपातकाल किट',
      quiz: 'प्रश्नोत्तरी लें',
      events: 'इवेंट्स और ब्लॉग',
      savedTrips: 'मेरी यात्राएं',
      selectDestination: 'योजना शुरू करने के लिए एक गंतव्य चुनें',
      weatherBased: 'मौसम-आधारित सिफारिशें'
    },
    mr: {
      title: 'स्मार्ट ट्रॅव्हल हब',
      subtitle: 'आपल्या हवामानाच्या आधारावर व्यक्तिगत प्रवास सुझाव',
      currentTemp: 'वर्तमान तापमान',
      itinerary: 'प्रवास योजना',
      expense: 'खर्च ट्र्यাक',
      recommendations: 'गंतव्य शोधा',
      reviews: 'पुनरावलोकन वाचा',
      emergency: 'आपातकाल किट',
      quiz: 'क्विज घ्या',
      events: 'इव्हेंट्स आणि ब्लॉग',
      savedTrips: 'माझे प्रवास',
      selectDestination: 'योजना सुरू करण्यासाठी एक गंतव्य निवडा',
      weatherBased: 'हवामान-आधारित सुझाव'
    }
  };

  const t = translations[language] || translations.en;

  const tabs = [
    { id: 'recommendations', label: t.recommendations, icon: '🌍' },
    { id: 'quiz', label: t.quiz, icon: '❓' },
    { id: 'itinerary', label: t.itinerary, icon: '📝' },
    { id: 'expense', label: t.expense, icon: '💰' },
    { id: 'reviews', label: t.reviews, icon: '⭐' },
    { id: 'emergency', label: t.emergency, icon: '🚨' },
    { id: 'events', label: t.events, icon: '📅' },
  ];

  if (isLoading) {
    return (
      <div className="temp-travel-hub">
        <div className="tth-loader">Loading travel recommendations...</div>
      </div>
    );
  }

  return (
    <div className="temp-travel-hub">
      {/* Header with Weather Info */}
      <div className="tth-header">
        <div className="tth-hero">
          <div className="tth-hero-content">
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>
          </div>
          <div className="tth-weather-card">
            <div className="tth-temp-display">
              <div className="tth-temp-icon">{tempInfo.icon}</div>
              <div className="tth-temp-info">
                <div className="tth-temp-value">{temperature}°C</div>
                <div className="tth-temp-condition">{weatherCondition}</div>
                <div className="tth-temp-category">{tempInfo.title}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="tth-controls">
          <div className="tth-language-selector">
            <button 
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <button 
              className={`lang-btn ${language === 'hi' ? 'active' : ''}`}
              onClick={() => setLanguage('hi')}
            >
              HI
            </button>
            <button 
              className={`lang-btn ${language === 'mr' ? 'active' : ''}`}
              onClick={() => setLanguage('mr')}
            >
              MR
            </button>
          </div>
          <button className="tth-dark-mode" onClick={toggleDarkMode}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tth-tabs-container">
        <div className="tth-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tth-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="tth-content">
        {activeTab === 'recommendations' && (
          <div className="travel-feature-card">
            <TravelRecommendations />
          </div>
        )}
        {activeTab === 'quiz' && (
          <div className="travel-feature-card">
            <TravelQuiz />
          </div>
        )}
        {activeTab === 'itinerary' && (
          <div className="travel-feature-card">
            <ItineraryGenerator onSave={saveTrip} />
          </div>
        )}
        {activeTab === 'expense' && (
          <div className="travel-feature-card">
            <ExpenseCalculator />
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="travel-feature-card">
            <ReviewSystem />
          </div>
        )}
        {activeTab === 'emergency' && (
          <div className="travel-feature-card">
            <EmergencyToolkit />
          </div>
        )}
        {activeTab === 'events' && (
          <div className="travel-feature-card">
            <EventsCalendar />
          </div>
        )}
      </div>

      {/* Saved Trips Footer */}
      {savedTrips.length > 0 && (
        <div className="tth-saved-trips">
          <h3>{t.savedTrips} ({savedTrips.length})</h3>
          <div className="trips-list">
            {savedTrips.slice(0, 3).map(trip => (
              <div key={trip.id} className="trip-card">
                <div className="trip-title">{trip.destination}</div>
                <div className="trip-detail">{trip.days} days • ₹{trip.totalBudget}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemperatureTravelHub;
