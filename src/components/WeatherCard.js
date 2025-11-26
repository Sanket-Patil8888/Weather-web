import React from "react";
import styled from "styled-components";

const Card = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  padding: clamp(20px, 3vw, 28px);
  border-radius: 28px;
  background: rgba(11, 18, 32, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 24px 60px rgba(3, 8, 16, 0.45);
  color: inherit;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const CityBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const City = styled.h2`
  margin: 0;
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 700;
`;

const DateInfo = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: rgba(247, 251, 255, 0.75);
`;

const Temperature = styled.div`
  font-size: clamp(3.5rem, 5vw, 4.5rem);
  font-weight: 200;
  line-height: 1;
  color: #ffffff;
`;

const Details = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 0.95rem;
  color: rgba(247, 251, 255, 0.75);
`;

const IconWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  text-align: right;
  gap: 8px;

  @media (max-width: 720px) {
    align-items: flex-start;
    text-align: left;
  }
`;

const Description = styled.span`
  font-size: 1.1rem;
  text-transform: capitalize;
`;

const WeatherCard = ({ weather }) => {
  if (!weather) return null;
  const temperature = Math.round(weather?.main?.temp ?? 0);
  const feels = Math.round(weather?.main?.feels_like ?? 0);
  const min = Math.round(weather?.main?.temp_min ?? 0);
  const max = Math.round(weather?.main?.temp_max ?? 0);
  const icon = weather?.weather?.[0]?.icon;
  const description = weather?.weather?.[0]?.description;
  const timezone = weather?.timezone || 0;
  const localDate = new Date((weather?.dt + timezone) * 1000);

  return (
    <Card>
      <CityBlock>
        <City>
          {[weather.name, weather.sys?.country].filter(Boolean).join(", ")}
        </City>
        <DateInfo>
          {localDate.toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}{" "}
          ·{" "}
          {localDate.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </DateInfo>
        <Temperature>{temperature}°</Temperature>
        <Details>
          <span>Feels like {feels}°</span>
          <span>Low {min}°</span>
          <span>High {max}°</span>
          <span>Humidity {weather.main?.humidity ?? 0}%</span>
        </Details>
      </CityBlock>

      <IconWrap>
        {icon ? (
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            style={{ width: 96, height: 96 }}
          />
        ) : null}
        <Description>{description}</Description>
      </IconWrap>
    </Card>
  );
};

export default WeatherCard;

