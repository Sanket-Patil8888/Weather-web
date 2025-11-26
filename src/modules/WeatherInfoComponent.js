import React from "react";
import styled from "styled-components";
import HourlyTimeline from "./HourlyTimeline";
import ClothingSuggestions from "./ClothingSuggestions";
import ActivitySuggestions from "./ActivitySuggestions";
import FoodRecommendations from "./FoodRecommendations";
import CropRecommendations from "./CropRecommendations";
import TravelPlanner from "./TravelPlanner";

export const WeatherInfoIcons = {
  feels: "/react-weather-app/icons/temp.svg",
  max: "/react-weather-app/icons/temp.svg",
  min: "/react-weather-app/icons/temp.svg",
  humidity: "/react-weather-app/icons/humidity.svg",
  wind: "/react-weather-app/icons/wind.svg",
  pressure: "/react-weather-app/icons/pressure.svg",
  sunrise: "/react-weather-app/icons/temp.svg",
  sunset: "/react-weather-app/icons/temp.svg",
};

// Header Section
const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  margin-bottom: 24px;
  animation: fadeIn 0.5s ease-out 0.1s both;
`;

const LocationRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const LocationInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const Location = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #FFFFFF;
  letter-spacing: -0.5px;
  text-transform: capitalize;
  
  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
  
  @media (max-width: 360px) {
    font-size: 1.125rem;
  }
`;

const DateTime = styled.div`
  font-size: 0.875rem;
  color: #BFD7EA;
  font-weight: 400;
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
  
  @media (max-width: 360px) {
    font-size: 0.7rem;
  }
`;

const BackButton = styled.button`
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.08);
  color: #FFFFFF;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  animation: fadeIn 0.4s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    
    &::before {
      width: 300px;
      height: 300px;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
  
  @media (max-width: 360px) {
    padding: 6px 10px;
    font-size: 0.75rem;
  }
`;

// Main Temperature Card
const TemperatureCard = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06));
  border-radius: 20px;
  padding: 32px 24px;
  margin-bottom: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  }
  
  @media (max-width: 768px) {
    padding: 28px 22px;
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 24px 20px;
    gap: 16px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 360px) {
    padding: 20px 16px;
    gap: 12px;
    flex-direction: column;
    text-align: center;
  }
  
  @media (max-height: 500px) and (orientation: landscape) {
    padding: 16px 12px;
    gap: 12px;
    margin-bottom: 16px;
  }
`;

const TemperatureInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const Temperature = styled.div`
  font-size: 4rem;
  font-weight: 300;
  color: #FFFFFF;
  line-height: 1;
  letter-spacing: -2px;
  animation: fadeInScale 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    font-size: 3.75rem;
  }
  
  @media (max-width: 480px) {
    font-size: 3.5rem;
  }
  
  @media (max-width: 360px) {
    font-size: 3rem;
  }
  
  @media (max-height: 500px) and (orientation: landscape) {
    font-size: 2.5rem;
  }
`;

const Description = styled.div`
  font-size: 1rem;
  color: #BFD7EA;
  text-transform: capitalize;
  font-weight: 400;
  margin-top: 4px;
  animation: fadeIn 0.5s ease-out 0.3s both;
`;

// Mini Cards Section
const MiniCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    gap: 11px;
    margin-bottom: 22px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 360px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-bottom: 16px;
  }
  
  @media (max-height: 500px) and (orientation: landscape) {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 12px;
  }
`;

const MiniCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  animation: fadeInUp 0.5s ease-out both;
  
  &:nth-child(1) { animation-delay: 0.15s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.25s; }
  &:nth-child(4) { animation-delay: 0.3s; }
  &:nth-child(5) { animation-delay: 0.35s; }
  &:nth-child(6) { animation-delay: 0.4s; }
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 480px) {
    padding: 12px;
    gap: 6px;
  }
  
  @media (max-width: 360px) {
    padding: 10px;
    border-radius: 12px;
  }
  
  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }
`;

const MiniCardIcon = styled.img`
  width: 28px;
  height: 28px;
  opacity: 0.9;
`;

const MiniCardValue = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 1.2;
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 360px) {
    font-size: 1rem;
  }
`;

const MiniCardLabel = styled.div`
  font-size: 0.75rem;
  color: #BFD7EA;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
  
  @media (max-width: 360px) {
    font-size: 0.65rem;
    letter-spacing: 0.3px;
  }
`;

// Section Headers
const SectionHeader = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #BFD7EA;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  margin-bottom: 12px;
  margin-top: 8px;
  animation: fadeIn 0.4s ease-out both;
`;

// Alerts
const AlertList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

const AlertItem = styled.div`
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 0.875rem;
  line-height: 1.5;
  border: 1px solid;
  animation: slideInRight 0.4s ease-out both;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.15s; }
  &:nth-child(3) { animation-delay: 0.2s; }
  &:nth-child(4) { animation-delay: 0.25s; }
  
  &:hover {
    transform: translateX(4px);
  }
  
  &.info {
    background: rgba(26, 115, 232, 0.15);
    color: #BFD7EA;
    border-color: rgba(26, 115, 232, 0.3);
  }
  
  &.warning {
    background: rgba(255, 200, 87, 0.15);
    color: #FFE5B4;
    border-color: rgba(255, 200, 87, 0.3);
  }
  
  &.danger {
    background: rgba(255, 87, 87, 0.15);
    color: #FFB3B3;
    border-color: rgba(255, 87, 87, 0.3);
  }
`;

// Travel planner styles now live in TravelPlanner module for reuse

const WeatherComponent = ({ weather, onReset, healthAlerts = [], hourly = [], daily = [] }) => {
  const isDay = weather?.weather?.[0]?.icon?.includes("d");
  const formatTime = (timestamp) =>
    new Date(timestamp * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const temp = Math.round(weather?.main?.temp ?? 0);
  const feels = Math.round(weather?.main?.feels_like ?? 0);
  const currentDate = new Date(weather?.dt * 1000);
  const dateString = currentDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const timeString = currentDate.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <>
      <Header>
        <LocationRow>
          <LocationInfo>
            <Location>{`${weather?.name}, ${weather?.sys?.country}`}</Location>
            <DateTime>{dateString} · {timeString}</DateTime>
          </LocationInfo>
          <BackButton type="button" onClick={onReset} aria-label="Back to search">
            ← Back
          </BackButton>
        </LocationRow>
      </Header>

      <TemperatureCard>
        <TemperatureInfo>
          <Temperature>{temp}°</Temperature>
          <Description>{weather?.weather?.[0]?.description}</Description>
        </TemperatureInfo>
      </TemperatureCard>

      {healthAlerts && healthAlerts.length > 0 && (
        <AlertList>
          {healthAlerts.map((a) => (
            <AlertItem key={a.id} className={a.level}>{a.message}</AlertItem>
          ))}
        </AlertList>
      )}

      <SectionHeader>Weather Details</SectionHeader>
      <MiniCardsGrid>
        <MiniCard>
          <MiniCardIcon src={WeatherInfoIcons.feels} alt="Feels like" />
          <MiniCardValue>{feels}°</MiniCardValue>
          <MiniCardLabel>Feels Like</MiniCardLabel>
        </MiniCard>
        <MiniCard>
          <MiniCardIcon src={WeatherInfoIcons.humidity} alt="Humidity" />
          <MiniCardValue>{weather?.main?.humidity ?? 0}%</MiniCardValue>
          <MiniCardLabel>Humidity</MiniCardLabel>
        </MiniCard>
        <MiniCard>
          <MiniCardIcon src={WeatherInfoIcons.wind} alt="Wind" />
          <MiniCardValue>{weather?.wind?.speed ?? 0} m/s</MiniCardValue>
          <MiniCardLabel>Wind Speed</MiniCardLabel>
        </MiniCard>
        <MiniCard>
          <MiniCardIcon src={WeatherInfoIcons.pressure} alt="Pressure" />
          <MiniCardValue>{weather?.main?.pressure ?? 0}</MiniCardValue>
          <MiniCardLabel>Pressure (hPa)</MiniCardLabel>
        </MiniCard>
        <MiniCard>
          <MiniCardIcon src={WeatherInfoIcons.max} alt="Max temperature" />
          <MiniCardValue>{Math.round(weather?.main?.temp_max ?? 0)}°</MiniCardValue>
          <MiniCardLabel>High</MiniCardLabel>
        </MiniCard>
        <MiniCard>
          <MiniCardIcon src={WeatherInfoIcons.min} alt="Min temperature" />
          <MiniCardValue>{Math.round(weather?.main?.temp_min ?? 0)}°</MiniCardValue>
          <MiniCardLabel>Low</MiniCardLabel>
        </MiniCard>
      </MiniCardsGrid>

      {Array.isArray(hourly) && hourly.length > 0 && (
        <>
          <SectionHeader>24-Hour Forecast</SectionHeader>
          <HourlyTimeline hourly={hourly} timezone_offset={weather?.timezone} />
        </>
      )}

      <TravelPlanner weather={weather} daily={daily} />

      <ActivitySuggestions weather={weather} />
      <CropRecommendations weather={weather} />
      <FoodRecommendations weather={weather} />
      <ClothingSuggestions weather={weather} />
    </>
  );
};

export default WeatherComponent;
