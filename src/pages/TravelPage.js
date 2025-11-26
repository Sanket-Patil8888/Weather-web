import React, { useState, useEffect } from 'react';
import '../styles/travel-enhanced.css';
import ItineraryGenerator from '../components/ItineraryGenerator';
import ExpenseCalculator from '../components/ExpenseCalculator';
import TravelRecommendations from '../components/TravelRecommendations';
import ReviewSystem from '../components/ReviewSystem';
import EmergencyToolkit from '../components/EmergencyToolkit';
import TravelQuiz from '../components/TravelQuiz';
import EventsCalendar from '../components/EventsCalendar';

const TravelPage = ({ darkMode, toggleDarkMode, language, setLanguage }) => {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [savedTrips, setSavedTrips] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('travelTrips');
    if (saved) setSavedTrips(JSON.parse(saved));
  }, []);

  const saveTrip = (trip) => {
    const updated = [...savedTrips, { ...trip, id: Date.now() }];
    setSavedTrips(updated);
    localStorage.setItem('travelTrips', JSON.stringify(updated));
  };

  const translations = {
    en: {
      itinerary: 'Itinerary',
      expense: 'Expense',
      recommendations: 'Recommendations',
      reviews: 'Reviews',
      emergency: 'Emergency',
      quiz: 'Quiz',
      events: 'Events',
      savedTrips: 'Saved Trips'
    },
    hi: {
      itinerary: 'यात्रा योजना',
      expense: 'खर्च',
      recommendations: 'सिफारिशें',
      reviews: 'समीक्षा',
      emergency: 'आपातकाल',
      quiz: 'प्रश्नोत्तरी',
      events: 'इवेंट्स',
      savedTrips: 'सहेजी गई यात्राएं'
    },
    mr: {
      itinerary: 'यात्रा योजना',
      expense: 'खर्च',
      recommendations: 'शिफारसी',
      reviews: 'पुनरावलोकन',
      emergency: 'आपातकाल',
      quiz: 'क्विज',
      events: 'इव्हेंट्स',
      savedTrips: 'जतन केलेली यात्रा'
    }
  };

  const t = translations[language] || translations.en;

  return (
    <div className={`travel-page ${darkMode ? 'dark' : 'light'}`}>
      <header className="travel-header">
        <h1>🌍 Travel & Tourism Hub</h1>
        <div className="header-controls">
          <button onClick={toggleDarkMode} className="theme-toggle">
            {darkMode ? '☀️' : '🌙'}
          </button>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="lang-select">
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="mr">मराठी</option>
          </select>
        </div>
      </header>

      <nav className="travel-nav">
        {[
          { id: 'itinerary', label: t.itinerary, icon: '📋' },
          { id: 'expense', label: t.expense, icon: '💰' },
          { id: 'recommendations', label: t.recommendations, icon: '🗺️' },
          { id: 'reviews', label: t.reviews, icon: '⭐' },
          { id: 'emergency', label: t.emergency, icon: '🆘' },
          { id: 'quiz', label: t.quiz, icon: '❓' },
          { id: 'events', label: t.events, icon: '📅' },
        ].map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </nav>

      <main className="travel-content">
        {activeTab === 'itinerary' && <ItineraryGenerator language={language} onSaveTrip={saveTrip} />}
        {activeTab === 'expense' && <ExpenseCalculator language={language} />}
        {activeTab === 'recommendations' && <TravelRecommendations language={language} />}
        {activeTab === 'reviews' && <ReviewSystem language={language} />}
        {activeTab === 'emergency' && <EmergencyToolkit language={language} />}
        {activeTab === 'quiz' && <TravelQuiz language={language} />}
        {activeTab === 'events' && <EventsCalendar language={language} />}
      </main>

      {savedTrips.length > 0 && (
        <section className="saved-trips-section">
          <h2>{t.savedTrips}</h2>
          <div className="trips-grid">
            {savedTrips.map(trip => (
              <div key={trip.id} className="trip-card">
                <h3>{trip.destination}</h3>
                <p>Duration: {trip.days} days</p>
                <p>Budget: ₹{trip.budget}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default TravelPage;
