import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import useWeatherData from "../hooks/useWeatherData";
import useCropPlanner from "../hooks/useCropPlanner";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import MetricGrid from "../components/MetricGrid";
import ForecastStrip from "../components/ForecastStrip";
import ForecastWeek from "../components/ForecastWeek";
import SunriseSunset from "../components/SunriseSunset";
import AirQualityCard from "../components/AirQualityCard";
import ActivityPlanner from "../components/ActivityPlanner";
import ClothingGuide from "../components/ClothingGuide";
import CropPlanner from "../components/CropPlanner";
import NotificationCenter from "../components/NotificationCenter";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const Shell = styled.main`
  min-height: 100vh;
  padding: 32px 18px; /* keep some horizontal breathing room */
  background: radial-gradient(120% 120% at 50% 0%, #7dd3ff 0%, #1b2f66 45%, #050c18 100%);
  color: #f5f7fb;
`;

const Content = styled.div`
  width: 100%;
  max-width: none;
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 2vw, 28px);
`;

const Hero = styled.section`
  width: 100%;
  padding: clamp(20px, 2.5vw, 36px);
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(8, 14, 28, 0.9), rgba(24, 45, 80, 0.78));
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 10px 30px rgba(5, 10, 20, 0.45);
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const HeroTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.8rem);
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: rgba(247, 251, 255, 0.85);
`;

const Panels = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;

  @media (min-width: 720px) {
    grid-template-columns: 2fr 1fr;
    align-items: start;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 3fr 1.2fr;
    gap: 24px;
  }
`;

const ColumnStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;

  /* Force child cards/components to stretch full width of the column */
  & > * {
    width: 100%;
    max-width: 100%;
  }
`;

const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
  color: #f7fbff;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: transform 160ms ease, box-shadow 160ms ease;
  box-shadow: 0 6px 18px rgba(3, 8, 20, 0.45);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(3, 8, 20, 0.5);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const WeatherDashboard = () => {
  const {
    weather,
    hourly,
    daily,
    airQuality,
    isLoading,
    error,
    loadByCity,
    detectLocation,
    isDetectingLocation,
    resolvedCity,
    refresh,
  } = useWeatherData();

  const [query, setQuery] = useState("");
  const cropStore = useCropPlanner();

  useEffect(() => {
    if (resolvedCity) {
      setQuery(resolvedCity.split(",")[0]);
    }
  }, [resolvedCity]);

  useEffect(() => {
    if (!weather) {
      document.documentElement.removeAttribute("data-theme");
      document.body.classList.remove("theme-applied");
      return;
    }
    const theme = mapTemperatureToTheme(weather);
    document.documentElement.setAttribute("data-theme", theme);
    document.body.classList.add("theme-applied");
  }, [weather]);

  const heroSubtitle = useMemo(() => {
    if (!weather) return "Search any city to see live conditions, forecasts, AQI and more.";
    return `Live insights for ${resolvedCity || "your area"} · Updated in real-time`;
  }, [resolvedCity, weather]);

  const handleSearch = () => {
    loadByCity(query);
  };

  const timezone = weather?.timezone || 0;
  const crops = cropStore.crops;

  return (
    <Shell>
      <Content>
        <Hero>
          <HeroTitle>
            <Title>AgriWeather command center</Title>
            <Subtitle>{heroSubtitle}</Subtitle>
          </HeroTitle>
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={handleSearch}
            onUseLocation={detectLocation}
            isLoading={isLoading}
            isLocating={isDetectingLocation}
          />
          <ActionsRow>
            <ActionButton onClick={refresh} disabled={isLoading}>
              🔃 Refresh
            </ActionButton>
            <ActionButton onClick={detectLocation} disabled={isDetectingLocation}>
              📍 Use GPS
            </ActionButton>
          </ActionsRow>
          <ErrorMessage message={error} />
        </Hero>

        {isLoading && !weather ? (
          <Loader />
        ) : (
          weather && (
            <>
              <NotificationCenter
                weather={weather}
                hourly={hourly}
                daily={daily}
                airQuality={airQuality}
                crops={crops}
              />
              <WeatherCard weather={weather} />
              <Panels>
                <ColumnStack>
                  <MetricGrid weather={weather} />
                  <SunriseSunset weather={weather} />
                  <ForecastStrip hourly={hourly} timezone={timezone} />
                  <ActivityPlanner weather={weather} hourly={hourly} />
                </ColumnStack>
                <ColumnStack>
                  <AirQualityCard airQuality={airQuality} />
                  <ForecastWeek daily={daily} timezone={timezone} />
                  <ClothingGuide weather={weather} />
                  <CropPlanner daily={daily} timezone={timezone} store={cropStore} />
                </ColumnStack>
              </Panels>
            </>
          )
        )}
      </Content>
    </Shell>
  );
};

function mapTemperatureToTheme(data) {
  const temp = data?.main?.temp;
  const condition = (data?.weather?.[0]?.main || "").toLowerCase();
  if (typeof temp === "number" && !Number.isNaN(temp)) {
    if (temp <= 0) return "temp-freezing";
    if (temp <= 8) return "temp-cold";
    if (temp <= 18) return "temp-cool";
    if (temp <= 26) return "temp-mild";
    if (temp <= 33) return "temp-warm";
    return "temp-hot";
  }
  if (condition.includes("snow")) return "snow";
  if (condition.includes("storm") || condition.includes("thunder")) return "storm";
  if (condition.includes("rain") || condition.includes("drizzle")) return "rainy";
  if (condition.includes("cloud") || condition.includes("overcast")) return "cloudy";
  return "sunny";
}

export default WeatherDashboard;

