import React from 'react';
import useWeatherData from '../hooks/useWeatherData';
import '../styles/redesign.css';
import '../styles/temperature-destinations.css';
import { SunIcon, CloudIcon, RainIcon, SnowIcon } from '../components/WeatherIcons';
import TemperatureDestinations from '../components/TemperatureDestinations';

const formatTime = (unix, tzOffset = 0) => {
  if (!unix) return '--:--';
  const d = new Date((unix + tzOffset) * 1000);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const RedesignedDashboard = ({ darkMode }) => {
  const { weather, hourly, daily, airQuality, isLoading, error, loadByCity, detectLocation, isDetectingLocation, resolvedCity, refresh } = useWeatherData();

  const cityLabel = resolvedCity || weather?.name || 'Unknown location';

  return (
    <div className="rd-app">
      <header className="rd-topbar">
        <div className="rd-brand">
          <div className="rd-logo" />
          <div>
            <div className="rd-brand-name">AgriWeather</div>
            <div className="small">Command Center</div>
          </div>
        </div>

        <div className="rd-searchwrap">
          <form className="rd-search" onSubmit={(e) => { e.preventDefault(); const q = e.target.querySelector('input')?.value; loadByCity(q); }}>
            <input name="q" placeholder="Search city or ZIP" />
            <button className="rd-btn rd-btn-primary">Search</button>
          </form>
          <div className="rd-actions">
            <button className="rd-btn" onClick={() => detectLocation()}>{isDetectingLocation ? 'Locating…' : 'Use GPS'}</button>
            <button className="rd-btn" onClick={() => refresh()}>Refresh</button>
          </div>
        </div>
      </header>

      <section className="rd-hero">
        <div className="rd-card rd-tempcard">
          <div className="rd-temp-left">
            <div className="rd-icon">
              {isLoading ? (
                '⌛'
              ) : (
                (() => {
                  const main = (weather?.weather?.[0]?.main || '').toLowerCase();
                  if (main.includes('rain') || main.includes('drizzle')) return <RainIcon />;
                  if (main.includes('cloud')) return <CloudIcon />;
                  if (main.includes('snow')) return <SnowIcon />;
                  return <SunIcon />;
                })()
              )}
            </div>
            <div>
              <div className={`rd-temp ${isLoading ? 'rd-skeleton' : ''}`}>{weather ? Math.round(weather.main.temp) + '°C' : '--'}</div>
              <div className={`rd-cond ${isLoading ? 'rd-skeleton' : ''}`}>{weather ? weather.weather[0].description : 'Loading...'}</div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div className="rd-meta"><strong>{cityLabel}</strong></div>
            <div className="rd-meta small">Updated {new Date().toLocaleTimeString()}</div>
          </div>
        </div>

        <div className="rd-inforow">
          <div className="rd-card rd-info">
            <div className="rd-info-title">Humidity</div>
            <div className={`rd-info-val ${isLoading ? 'rd-skeleton' : ''}`}>{weather ? weather.main.humidity + ' %' : '--'}</div>
          </div>
          <div className="rd-card rd-info">
            <div className="rd-info-title">Wind</div>
            <div className={`rd-info-val ${isLoading ? 'rd-skeleton' : ''}`}>{weather ? weather.wind.speed + ' m/s' : '--'}</div>
          </div>
          <div className="rd-card rd-info">
            <div className="rd-info-title">Sunrise</div>
            <div className={`rd-info-val ${isLoading ? 'rd-skeleton' : ''}`}>{weather ? formatTime(weather.sys.sunrise, weather.timezone) : '--:--'}</div>
          </div>
          <div className="rd-card rd-info">
            <div className="rd-info-title">Sunset</div>
            <div className={`rd-info-val ${isLoading ? 'rd-skeleton' : ''}`}>{weather ? formatTime(weather.sys.sunset, weather.timezone) : '--:--'}</div>
          </div>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14, marginTop: 12 }}>
        <div className="rd-card">
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 700 }}>Hourly</div>
              <div className="rd-hourly">
                {isLoading && Array.from({ length: 5 }).map((_, i) => <div key={i} className="rd-hour rd-skeleton" />)}
                {!isLoading && hourly && hourly.slice(0, 12).map((h, idx) => (
                  <div key={idx} className="rd-hour">
                    <div className="small">{new Date(h.dt * 1000).toLocaleTimeString([], { hour: '2-digit' })}</div>
                    <div style={{ fontSize: '1.1rem' }}>{Math.round(h.temp)}°</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ width: 180 }}>
              <div className="rd-aqi">
                <div className="small">Air Quality Index</div>
                <div className={`rd-aqi-val ${isLoading ? 'rd-skeleton' : ''}`}>{airQuality ? airQuality.aqi || airQuality.main?.aqi || (airQuality.index || '--') : '--'}</div>
                <div className="small">{airQuality ? (airQuality.aqi === 1 ? 'Good' : airQuality.aqi === 2 ? 'Fair' : 'Moderate') : 'Loading'}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rd-card rd-week">
          <div style={{ fontWeight: 700, marginBottom: 8 }}>7-Day Forecast</div>
          <div className="rd-week-list">
            {isLoading && Array.from({ length: 7 }).map((_, i) => <div key={i} className="rd-day rd-skeleton" />)}
            {!isLoading && daily && daily.slice(0, 7).map((d, i) => (
              <div key={i} className="rd-day">
                <div style={{ fontWeight: 700 }}>{new Date(d.dt * 1000).toLocaleDateString([], { weekday: 'short' })}</div>
                <div style={{ fontSize: 20 }}>{d.weather?.[0]?.main || '—'}</div>
                <div className="small">{Math.round(d.temp.max)}° / {Math.round(d.temp.min)}°</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {!isLoading && weather && (
        <TemperatureDestinations 
          temperature={Math.round(weather.main?.temp || 0)} 
          condition={weather.weather?.[0]?.main || 'Clear'}
        />
      )}

      <div className="rd-footer">Redesigned UI integrated. Use the search and GPS buttons to fetch data.</div>
    </div>
  );
};

export default RedesignedDashboard;
