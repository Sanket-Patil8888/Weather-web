import React from 'react';
import styled from 'styled-components';
import { WeatherIcons } from '../App';

const Wrap = styled.div`
  margin-top: 14px;
  animation: fadeIn 0.5s ease-out 0.1s both;
`;

const Track = styled.div`
  display:flex;
  gap:12px;
  overflow-x:auto;
  padding-bottom:6px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 480px) {
    gap: 10px;
    padding-bottom: 8px;
  }
  
  @media (max-width: 360px) {
    gap: 8px;
  }
`;

const Hour = styled.div`
  min-width:72px;
  background: rgba(255,255,255,0.03);
  padding:8px 10px;
  border-radius:12px;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:6px;
  border: 1px solid rgba(255,255,255,0.02);
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.4s ease-out both;
  cursor: pointer;
  
  &:nth-child(1) { animation-delay: 0.05s; }
  &:nth-child(2) { animation-delay: 0.1s; }
  &:nth-child(3) { animation-delay: 0.15s; }
  &:nth-child(4) { animation-delay: 0.2s; }
  &:nth-child(5) { animation-delay: 0.25s; }
  &:nth-child(6) { animation-delay: 0.3s; }
  &:nth-child(7) { animation-delay: 0.35s; }
  &:nth-child(8) { animation-delay: 0.4s; }
  
  &:hover {
    background: rgba(255,255,255,0.08);
    transform: translateY(-4px) scale(1.05);
    border-color: rgba(255,255,255,0.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 480px) {
    min-width: 68px;
    padding: 8px;
    gap: 5px;
  }
  
  @media (max-width: 360px) {
    min-width: 64px;
    padding: 6px 8px;
    border-radius: 10px;
  }
`;

const HourTime = styled.div`
  font-size:0.75rem;
  color: rgba(255,255,255,0.75);
`;

const HourIcon = styled.img`
  width:36px; 
  height:36px;
  
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
  
  @media (max-width: 360px) {
    width: 28px;
    height: 28px;
  }
`;

const HourTemp = styled.div`
  font-weight:700; font-size:0.95rem; color: #fff;
`;

const SmallAnim = styled.div`
  width:28px; height:6px; background: linear-gradient(90deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06)); border-radius:3px;
`;

function formatHour(ts, tzOffset) {
  try {
    // ts is in seconds UTC, tzOffset is seconds difference from UTC
    const d = new Date((ts + (tzOffset||0)) * 1000);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch (e) { return '-:--'; }
}

const HourlyTimeline = ({ hourly = [], timezone_offset = 0 }) => {
  const next24 = Array.isArray(hourly) ? hourly.slice(0, 24) : [];
  return (
    <Wrap>
      <Track aria-hidden={false}>
        {next24.map((h, idx) => (
          <Hour key={h.dt || idx} title={`Hour ${idx}`}>
            <HourTime>{formatHour(h.dt, timezone_offset)}</HourTime>
            <HourIcon src={WeatherIcons[h.weather?.[0]?.icon] || '/react-weather-app/icons/day.svg'} alt={h.weather?.[0]?.description || 'weather'} />
            <HourTemp>{Math.round(h.temp)}°</HourTemp>
            <SmallAnim />
          </Hour>
        ))}
      </Track>
    </Wrap>
  );
};

export default HourlyTimeline;
