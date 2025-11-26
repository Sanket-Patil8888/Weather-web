import React from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 20px;
  border-radius: 24px;
  background: rgba(10, 18, 33, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(247, 251, 255, 0.8);
`;

const Track = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(90px, 1fr);
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 6px;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 999px;
  }
`;

const HourCard = styled.div`
  padding: 12px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #f8fbff;
`;

const Temperature = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
`;

const ForecastStrip = ({ hourly = [], timezone = 0 }) => {
  if (!hourly.length) return null;
  const nextHours = hourly.slice(0, 12);
  return (
    <Section>
      <TitleRow>
        <strong>Next 12 hours</strong>
        <span>Updated just now</span>
      </TitleRow>
      <Track>
        {nextHours.map((hour) => {
          const dt = new Date((hour.dt + timezone) * 1000);
          return (
            <HourCard key={hour.dt}>
              <span style={{ fontSize: "0.85rem", color: "rgba(248,251,255,0.8)" }}>
                {dt.toLocaleTimeString([], { hour: "numeric" })}
              </span>
              <img
                src={`https://openweathermap.org/img/wn/${hour.weather?.[0]?.icon || "01d"}@2x.png`}
                alt={hour.weather?.[0]?.description}
                width={48}
                height={48}
                style={{ margin: "0 auto" }}
              />
              <Temperature>{Math.round(hour.temp)}°</Temperature>
              <span style={{ fontSize: "0.85rem", color: "rgba(248,251,255,0.7)" }}>
                {Math.round(hour.pop * 100)}% rain
              </span>
            </HourCard>
          );
        })}
      </Track>
    </Section>
  );
};

export default ForecastStrip;

