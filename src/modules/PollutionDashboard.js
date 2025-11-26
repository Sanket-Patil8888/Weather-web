import React, { useMemo } from "react";
import styled from "styled-components";

const PollutionCard = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(14px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const PollutionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const PollutionTitle = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: #FFFFFF;
`;

const AQIBadge = styled.span`
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
  background: ${({ level }) =>
    level === "good"
      ? "rgba(76, 217, 100, 0.2)"
      : level === "fair"
      ? "rgba(255, 149, 0, 0.2)"
      : level === "moderate"
      ? "rgba(255, 204, 0, 0.2)"
      : level === "poor"
      ? "rgba(255, 87, 87, 0.2)"
      : "rgba(139, 0, 139, 0.2)"};
  color: ${({ level }) =>
    level === "good"
      ? "#8AF58F"
      : level === "fair"
      ? "#FFB366"
      : level === "moderate"
      ? "#FFDC7B"
      : level === "poor"
      ? "#FF9A9A"
      : "#E6A8FF"};
  border: 1px solid rgba(255, 255, 255, 0.12);
`;

const PollutionStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
`;

const PollutionStat = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 4px;

  span {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: rgba(255, 255, 255, 0.65);
  }

  strong {
    font-size: 1rem;
    color: #FFFFFF;
  }
`;

const HealthWarning = styled.div`
  background: ${({ severity }) =>
    severity === "high"
      ? "rgba(255, 87, 87, 0.12)"
      : severity === "moderate"
      ? "rgba(255, 204, 0, 0.12)"
      : "rgba(76, 217, 100, 0.12)"};
  border: 1px solid ${({ severity }) =>
    severity === "high"
      ? "rgba(255, 87, 87, 0.3)"
      : severity === "moderate"
      ? "rgba(255, 204, 0, 0.3)"
      : "rgba(76, 217, 100, 0.3)"};
  border-radius: 12px;
  padding: 12px;
  color: ${({ severity }) =>
    severity === "high"
      ? "#FF9A9A"
      : severity === "moderate"
      ? "#FFDC7B"
      : "#8AF58F"};
  font-size: 0.9rem;
  line-height: 1.4;
`;

const MaskRecommendation = styled.div`
  background: rgba(139, 69, 19, 0.15);
  border: 1px solid rgba(210, 105, 30, 0.3);
  border-radius: 12px;
  padding: 12px;
  color: #FFB366;
  font-size: 0.9rem;
  line-height: 1.4;
  display: flex;
  align-items: flex-start;
  gap: 8px;

  &::before {
    content: "🎭";
    flex-shrink: 0;
    font-size: 1.1rem;
  }
`;

const PollutantsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

const Pollutant = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.85);
  padding: 6px 8px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  strong {
    color: #FFB366;
  }
`;

function PollutionDashboard({ pollution = null, temp = null }) {
  const pollutionInfo = useMemo(() => {
    if (!pollution) return null;

    const aqi = pollution.main?.aqi ?? null;
    const pm25 = pollution.components?.pm2_5 ?? null;
    const pm10 = pollution.components?.pm10 ?? null;
    const no2 = pollution.components?.no2 ?? null;
    const o3 = pollution.components?.o3 ?? null;
    const so2 = pollution.components?.so2 ?? null;
    const co = pollution.components?.co ?? null;

    let level = "unknown";
    let levelName = "Unknown";
    let severity = "low";

    // AQI Level mapping (1-5)
    if (aqi === 1) {
      level = "good";
      levelName = "Good";
      severity = "low";
    } else if (aqi === 2) {
      level = "fair";
      levelName = "Fair";
      severity = "low";
    } else if (aqi === 3) {
      level = "moderate";
      levelName = "Moderate";
      severity = "moderate";
    } else if (aqi === 4) {
      level = "poor";
      levelName = "Poor";
      severity = "high";
    } else if (aqi === 5) {
      level = "very_poor";
      levelName = "Very Poor";
      severity = "high";
    }

    let healthAdvice = "";
    let maskNeeded = false;

    if (aqi <= 2) {
      healthAdvice =
        "Air quality is good. Enjoy outdoor activities without restrictions.";
    } else if (aqi === 3) {
      healthAdvice =
        "Air quality is moderate. Sensitive individuals should limit outdoor activities.";
    } else if (aqi === 4) {
      healthAdvice =
        "Air quality is poor. Everyone should reduce outdoor activities. Wear an N95 mask if you must go outside.";
      maskNeeded = true;
    } else if (aqi === 5) {
      healthAdvice =
        "Air quality is very poor. Avoid outdoor activities. Wear an N95 or KN95 mask if outside is unavoidable.";
      maskNeeded = true;
    }

    return {
      aqi,
      level,
      levelName,
      severity,
      pm25,
      pm10,
      no2,
      o3,
      so2,
      co,
      healthAdvice,
      maskNeeded,
    };
  }, [pollution]);

  if (!pollutionInfo) {
    return (
      <PollutionCard>
        <PollutionHeader>
          <PollutionTitle>Air Quality & Pollution</PollutionTitle>
        </PollutionHeader>
        <HealthWarning severity="low">
          Loading air quality data...
        </HealthWarning>
      </PollutionCard>
    );
  }

  return (
    <PollutionCard>
      <PollutionHeader>
        <PollutionTitle>Air Quality & Pollution</PollutionTitle>
        <AQIBadge level={pollutionInfo.level}>
          AQI {pollutionInfo.aqi} - {pollutionInfo.levelName}
        </AQIBadge>
      </PollutionHeader>

      <PollutionStats>
        <PollutionStat>
          <span>PM2.5</span>
          <strong>
            {pollutionInfo.pm25 ? `${Math.round(pollutionInfo.pm25)} µg/m³` : "N/A"}
          </strong>
        </PollutionStat>
        <PollutionStat>
          <span>PM10</span>
          <strong>
            {pollutionInfo.pm10 ? `${Math.round(pollutionInfo.pm10)} µg/m³` : "N/A"}
          </strong>
        </PollutionStat>
        <PollutionStat>
          <span>NO₂</span>
          <strong>
            {pollutionInfo.no2 ? `${Math.round(pollutionInfo.no2)} µg/m³` : "N/A"}
          </strong>
        </PollutionStat>
        <PollutionStat>
          <span>O₃</span>
          <strong>
            {pollutionInfo.o3 ? `${Math.round(pollutionInfo.o3)} µg/m³` : "N/A"}
          </strong>
        </PollutionStat>
      </PollutionStats>

      <HealthWarning severity={pollutionInfo.severity}>
        {pollutionInfo.healthAdvice}
      </HealthWarning>

      {pollutionInfo.maskNeeded && (
        <MaskRecommendation>
          Consider wearing an N95 or KN95 mask for outdoor activities to protect
          against fine particulates.
        </MaskRecommendation>
      )}

      {temp && (
        <PollutantsList>
          <Pollutant>
            <span>Temperature</span>
            <strong>{Math.round(temp)}°C</strong>
          </Pollutant>
          <Pollutant>
            <span>CO Level</span>
            <strong>
              {pollutionInfo.co ? `${Math.round(pollutionInfo.co * 100) / 100} mg/m³` : "N/A"}
            </strong>
          </Pollutant>
          <Pollutant>
            <span>SO₂ Level</span>
            <strong>
              {pollutionInfo.so2 ? `${Math.round(pollutionInfo.so2)} µg/m³` : "N/A"}
            </strong>
          </Pollutant>
        </PollutantsList>
      )}
    </PollutionCard>
  );
}

export default PollutionDashboard;
