import React from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 20px;
  border-radius: 24px;
  background: rgba(10, 16, 30, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
`;

const DayCard = styled.article`
  border-radius: 18px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #f5f7fb;
`;

const Temps = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 600;
`;

const ForecastWeek = ({ daily = [], timezone = 0 }) => {
  if (!daily.length) return null;
  const nextDays = daily.slice(1, 8);
  return (
    <Section>
      <strong>7-day outlook</strong>
      <Grid>
        {nextDays.map((day) => {
          const dt = new Date((day.dt + timezone) * 1000);
          return (
            <DayCard key={day.dt}>
              <span style={{ fontSize: "0.9rem", color: "rgba(248,251,255,0.85)" }}>
                {dt.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
              </span>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather?.[0]?.icon || "01d"}@2x.png`}
                alt={day.weather?.[0]?.description}
                width={52}
                height={52}
                style={{ alignSelf: "center" }}
              />
              <Temps>
                <span>{Math.round(day.temp?.max ?? 0)}°</span>
                <span style={{ color: "rgba(248,251,255,0.7)" }}>{Math.round(day.temp?.min ?? 0)}°</span>
              </Temps>
              <span style={{ fontSize: "0.85rem", color: "rgba(248,251,255,0.7)", textTransform: "capitalize" }}>
                {day.weather?.[0]?.description}
              </span>
            </DayCard>
          );
        })}
      </Grid>
    </Section>
  );
};

export default ForecastWeek;

